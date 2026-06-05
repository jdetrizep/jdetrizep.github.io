# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> El proyecto, su documentación, commits y posts están en español. Mantén ese idioma al escribir contenido, mensajes de commit y comentarios.

## Qué es

Blog técnico personal (jdetrizep.github.io) construido con **Jekyll 4.3** sobre el tema **klise**. El contenido es estático, pero comentarios y calificaciones de cada post se guardan en una **Firebase Realtime Database** desde el navegador (sin backend propio). El frontend interactivo es **vanilla JS con módulos ES6** (sin framework, sin bundler).

## Comandos

```bash
bundle install                              # instalar dependencias Ruby
bundle exec jekyll serve                    # servidor local en http://localhost:4000
bundle exec jekyll serve --drafts --livereload
bundle exec jekyll build                    # build a _site/ (lo mismo que hace CI)
bundle exec jekyll clean                    # limpiar _site/ y caches

bundle exec jekyll post "Título del Post"   # nuevo post (jekyll-compose)
./optimize-images.sh                        # genera .webp (calidad 85) junto a cada .png de _posts/
```

No hay suite de tests ni linter: **`bundle exec jekyll build` es la verificación**. Si compila sin error, está bien. Para validar JS o reglas de Firebase hay que probar en el navegador.

## Despliegue

El sitio **NO** usa el despliegue "branch" de GitHub Pages. Usa el workflow [.github/workflows/jekyll.yml](.github/workflows/jekyll.yml): cada push a `main` hace `jekyll build` con `JEKYLL_ENV=production` y publica `_site/`. Hay además un **cron semanal (lunes 12:00 UTC)** cuyo único propósito es publicar posts con **fecha futura** (Jekyll no los incluye hasta que su `date` ha pasado). Por eso es normal tener posts fechados en el futuro en `_posts/`.

## Arquitectura de contenido

- **Posts co-localizados**: cada post vive en su propia carpeta `_posts/Nombre_Del_Post/` junto con sus imágenes. El plugin **`jekyll-postfiles`** copia esas imágenes al output, por lo que en el front matter y el markdown las rutas de imagen son **relativas a la raíz del sitio empezando por el nombre de la carpeta**, p. ej. `image: /Nombre_Del_Post/portada.png` (no `/_posts/...` ni `/assets/...`).
- **Imágenes**: se commitea el `.png` y su `.webp` generado por `optimize-images.sh`. El include [_includes/picture.html](_includes/picture.html) emite un `<picture>` con `<source>` WebP y fallback PNG/JPG.
- **Front matter típico**: `layout: post`, `title`, `date`, `modified`, `description`, `tag:` (lista — nótese `tag`, singular, en los posts) e `image`.
- El layout principal de artículo es [_layouts/post.html](_layouts/post.html), que ensambla TOC, rating, share-buttons y comentarios vía includes.

## Arquitectura JS / Firebase

Punto único de configuración: [assets/js/firebase-config.js](assets/js/firebase-config.js) exporta `initializeFirebase()` / `getFirebaseDatabase()` (reutiliza la app si ya existe). Importa Firebase 10.7.1 por CDN como módulo ES.

**Scripts realmente activos** (cargados en `post.html` y `footer.html`):
- `rating-firebase.js` — sistema de estrellas contra Firebase.
- `comments-modular.js` — entrada del sistema de comentarios; orquesta los módulos de `assets/js/comments/` (`controller`, `storage`, `validator`, `sanitizer`, `formatter`, `notification`, `ui`). Cada responsabilidad está separada en su propio archivo; al tocar comentarios, edita el módulo correspondiente, no un monolito.
- `main.js`, `toc.js`, `share-buttons.js`, `scroll-to-top.js`, `search.min.js`.

**Archivos legacy / deuda técnica** — existen versiones antiguas duplicadas que NO son la implementación vigente: `comments.js`, `comments-refactored.js`, `comments-firebase.js`, `rating.js`, `rating-refactored.js`. Antes de modificar lógica de comentarios o rating, confirma qué archivo está referenciado en el layout/include en lugar de editar el que aparezca primero por nombre. (Ver los `ANALISIS_DEUDA_TECNICA*.md` y `REFACTORIZACION_*.md` en la raíz para el contexto de esa migración.)

El `postId` que enlaza un post con sus datos en Firebase es `{{ page.id | slugify }}` (ver `data-post-id` en [_includes/comments.html](_includes/comments.html) y [_includes/rating.html](_includes/rating.html)).

## Reglas de Firebase (seguridad)

[database.rules.json](database.rules.json) es la fuente de verdad de las reglas de la Realtime Database e impone la validación del lado servidor:
- **Ratings**: un usuario solo puede escribir su voto una vez (`!data.exists()`), valor entero 1–5; `stats` (promedio/conteo) es de solo lectura para clientes.
- **Comments**: `name` 2–50 chars, `comment` 10–500 chars, campos obligatorios `name/comment/timestamp/date/userId`.

Si cambias la forma de los datos en el JS (campos, longitudes, límites de estrellas), **debes** actualizar estas reglas en paralelo o las escrituras serán rechazadas. Despliegue y verificación documentados en `DESPLEGAR_REGLAS_FIREBASE.md`, `FIREBASE_SECURITY.md` y `VERIFICAR_SEGURIDAD_FIREBASE.md`.

## Gotcha: nombres de archivo con acentos (macOS + Git)

Varios assets de posts tienen tildes (p. ej. `Evolución_...png`). macOS guarda los nombres en Unicode **NFD** (descompuesto) mientras que Git/GitHub suelen usar **NFC** (precompuesto). Subir o renombrar imágenes desde la **interfaz web de GitHub** puede crear una entrada duplicada del mismo archivo bajo ambas normalizaciones, lo que rompe `pull`/`rebase`/`merge` en macOS con *"untracked working tree files would be overwritten"*. **Sube y renombra las imágenes desde el Git local**, no desde la web, para evitarlo.
