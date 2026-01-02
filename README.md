# 📝 Blog Técnico - jdetrizep.dev

[![Jekyll](https://img.shields.io/badge/Jekyll-4.1.0-red.svg)](https://jekyllrb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Hosted-GitHub%20Pages-success.svg)](https://jdetrizep.github.io)

Blog técnico personal enfocado en desarrollo de software, DevOps, IBM i, inteligencia artificial y mejores prácticas de programación.

## 👨‍💻 Sobre el Autor

**Jorge De Trinidad Zepeda**  
Expert Coach con +16 años de experiencia en desarrollo de sistemas bancarios

### 🏆 Certificaciones y Reconocimientos
- 🌟 **IBM Influencer 2025**
- 🌟 **IBM Advocate 2025**
- 🌟 **IBM Contributor 2025**
- 💼 Microsoft Certified Professional
- ☁️ Oracle Cloud Certified AI
- 🔒 Cybersecurity Awareness Professional
- 📊 Lean Six Sigma White Belt
- 🎯 Certified Scrum Master
- 💡 IBM Enterprise Design Thinking

### 🛠️ Especialidades
- **Backend**: Java, C#, .NET, RPGLE, SQLRPGLE
- **Mobile**: Kotlin, Swift, Objective-C
- **Cloud**: Azure, AWS, IBM Cloud
- **DevOps**: CI/CD, Azure DevOps, Jenkins
- **Databases**: DB2 for i, SQL Server, Oracle
- **AI/ML**: Azure AI, OpenAI, OCI AI

---

## 📚 Contenido del Blog

### Categorías Principales

#### 🖥️ IBM i & AS400
- Modernización de aplicaciones legacy
- Mejores prácticas en RPGLE y DB2
- Integración con tecnologías modernas
- DevOps para IBM i

#### 🔄 DevOps & CI/CD
- Pipelines de integración continua
- Automatización de despliegues
- Infraestructura como código
- Monitoreo y observabilidad

#### 💻 Desarrollo Backend
- Arquitecturas escalables
- Patrones de diseño
- Optimización de rendimiento
- Seguridad en aplicaciones

#### ☁️ Cloud Computing
- Arquitecturas en Azure y AWS
- Servicios serverless
- Contenedores y orquestación
- Migración a la nube

#### 🤖 Inteligencia Artificial
- IA aplicada al desarrollo
- Herramientas de código asistido
- Ética en IA
- Machine Learning en producción

---

## 🚀 Características del Blog

### ✨ Funcionalidades Implementadas

#### 1. **Sistema de Calificación de Estrellas**
- ⭐ Calificación de 1 a 5 estrellas por artículo
- 📊 Promedio de calificaciones en tiempo real
- 💾 Almacenamiento local (localStorage)
- 🎨 Diseño compacto y minimalista
- 🌙 Compatible con modo oscuro
- 📱 Totalmente responsive

#### 2. **Diseño Responsive**
- 📱 Optimizado para móviles, tablets y desktop
- 🎨 Interfaz limpia y moderna
- ⚡ Carga rápida y optimizada
- 🌓 Modo claro/oscuro

#### 3. **SEO Optimizado**
- 🔍 Meta tags optimizados
- 🗺️ Sitemap automático
- 📡 RSS Feed
- 🔗 URLs amigables

#### 4. **Búsqueda Integrada**
- 🔎 Búsqueda en tiempo real
- 📑 Indexación de todos los posts
- ⚡ Resultados instantáneos

#### 5. **Compartir en Redes Sociales**
- 📤 Botones de compartir integrados
- 🖼️ Open Graph tags
- 🐦 Twitter Cards

---

## 🏗️ Arquitectura del Proyecto

```
jekyll-klise/
├── _config.yml              # Configuración principal de Jekyll
├── _data/                   # Datos estructurados
│   └── menus.yml           # Menús de navegación
├── _includes/              # Componentes reutilizables
│   ├── footer.html         # Pie de página
│   ├── rating.html         # Sistema de calificación
│   ├── share-buttons.html  # Botones de compartir
│   └── ...
├── _layouts/               # Plantillas de página
│   ├── default.html        # Layout base
│   ├── post.html          # Layout para posts
│   ├── home.html          # Página principal
│   └── ...
├── _posts/                 # Artículos del blog
│   ├── Categoria1/
│   ├── Categoria2/
│   └── ...
├── _sass/                  # Estilos SCSS
│   ├── klise/
│   │   ├── _rating.scss   # Estilos del sistema de calificación
│   │   └── ...
│   └── main.scss          # Archivo principal de estilos
├── assets/                 # Recursos estáticos
│   ├── css/               # CSS compilado
│   ├── js/                # JavaScript
│   │   ├── main.js        # Script principal
│   │   └── rating.js      # Sistema de calificación
│   ├── img/               # Imágenes
│   └── favicons/          # Iconos del sitio
├── Gemfile                 # Dependencias Ruby
├── README.md              # Este archivo
└── RATING_SYSTEM.md       # Documentación del sistema de calificación
```

---

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Ruby >= 2.7.0
- RubyGems
- GCC y Make
- Jekyll 4.1.0

### Instalación Local

1. **Clonar el repositorio**
```bash
git clone https://github.com/jdetrizep/jdetrizep.dev.git
cd jdetrizep.dev/jekyll-klise
```

2. **Instalar dependencias**
```bash
bundle install
```

3. **Ejecutar el servidor local**
```bash
bundle exec jekyll serve
```

4. **Abrir en el navegador**
```
http://localhost:4000
```

### Configuración Inicial

Edita `_config.yml` para personalizar:

```yaml
# Información del sitio
title: Tu Título
description: Tu descripción
lang: es-CR
timezone: America/Costa_Rica

# Información del autor
author:
  name: Tu Nombre
  bio: Tu biografía
  email: tu@email.com
  github: tu-usuario
  linkedin: tu-perfil

# URL del sitio
url: "https://tu-usuario.github.io"
baseurl: ""

# Google Analytics (opcional)
google_analytics: TU-ID-DE-GA
```

---

## 📝 Crear un Nuevo Post

### Usando Jekyll Compose

```bash
bundle exec jekyll post "Título del Post"
```

### Manualmente

Crea un archivo en `_posts/` con el formato:

```
YYYY-MM-DD-titulo-del-post.md
```

### Front Matter Recomendado

```yaml
---
layout: post
title: "Título del Post"
date: 2026-01-02 10:00:00 -0600
modified: 2026-01-02 10:00:00 -0600
tags: [tag1, tag2, tag3]
description: "Descripción breve del post"
image: /ruta/a/imagen.webp
---
```

### Estructura de Carpetas para Posts

```
_posts/
└── Nombre_Del_Post/
    ├── YYYY-MM-DD-nombre-del-post.md
    ├── imagen1.png
    ├── imagen1.webp
    ├── imagen2.png
    └── imagen2.webp
```

---

## 🎨 Personalización

### Cambiar Colores

Edita `_sass/klise/_variables.scss`:

```scss
$primary-color: #007bff;
$secondary-color: #6c757d;
$text-color: #333;
$bg-color: #fff;
```

### Modificar el Sistema de Calificación

Ver documentación detallada en [RATING_SYSTEM.md](RATING_SYSTEM.md)

### Agregar Nuevas Páginas

1. Crea un archivo `.md` en la raíz
2. Agrega el front matter:

```yaml
---
layout: page
title: Título de la Página
permalink: /ruta-de-la-pagina/
---
```

---

## 🔧 Componentes Principales

### Sistema de Calificación

**Archivos:**
- `_includes/rating.html` - Componente HTML
- `_sass/klise/_rating.scss` - Estilos
- `assets/js/rating.js` - Lógica JavaScript

**Características:**
- Calificación de 1-5 estrellas
- Almacenamiento en localStorage
- Cálculo de promedio automático
- Una calificación por usuario
- Animaciones suaves
- Modo oscuro integrado

**Uso:**
```liquid
{% include rating.html %}
```

### Footer Personalizado

**Archivo:** `_includes/footer.html`

**Características:**
- Logo personalizado
- Copyright dinámico
- Enlaces a redes sociales
- Google Analytics integrado
- Scripts de búsqueda

### Compartir en Redes Sociales

**Archivo:** `_includes/share-buttons.html`

Botones para compartir en:
- Twitter
- Facebook
- LinkedIn
- WhatsApp
- Telegram

---

## 📊 Analytics y SEO

### Google Analytics

Configurado en `_config.yml`:
```yaml
google_analytics: G-KQCBK0PDYH
```

El código se carga automáticamente en el footer usando `globalThis` para mejor compatibilidad.

### SEO

- ✅ Meta tags optimizados
- ✅ Open Graph para redes sociales
- ✅ Twitter Cards
- ✅ Sitemap XML automático
- ✅ RSS Feed
- ✅ URLs semánticas

---

## 🚀 Despliegue

### GitHub Pages

1. **Push al repositorio**
```bash
git add .
git commit -m "Update blog"
git push origin main
```

2. **Configurar GitHub Pages**
- Ve a Settings > Pages
- Source: Deploy from a branch
- Branch: main / root
- Save

3. **Acceder al sitio**
```
https://tu-usuario.github.io
```

### Dominio Personalizado

1. Crea un archivo `CNAME` en la raíz:
```
tudominio.com
```

2. Configura los DNS en tu proveedor:
```
A Record: 185.199.108.153
A Record: 185.199.109.153
A Record: 185.199.110.153
A Record: 185.199.111.153
```

---

## 🧪 Testing y Desarrollo

### Modo Desarrollo

```bash
bundle exec jekyll serve --drafts --livereload
```

### Limpiar Cache

```bash
bundle exec jekyll clean
```

### Verificar Build

```bash
bundle exec jekyll build
```

### Limpiar Calificaciones (Desarrollo)

En la consola del navegador:
```javascript
// Limpiar todas las calificaciones
clearPostRatings();

// Limpiar calificación específica
clearPostRatings('post-id');
```

---

## 📦 Dependencias

### Ruby Gems

```ruby
gem "jekyll", "~> 4.1.0"
gem "jekyll-feed", "~> 0.13"
gem "jekyll-sitemap", "~> 1.4"
gem "jekyll-compose", "~> 0.12.0"
gem "jekyll-postfiles", "~> 3.1"
gem "webrick", "~> 1.7"
```

### JavaScript

- Vanilla JavaScript (sin dependencias externas)
- Compatible con ES6+

---

## 🐛 Solución de Problemas

### El sitio no se genera

```bash
bundle update
bundle exec jekyll clean
bundle exec jekyll build
```

### Errores de permisos

```bash
bundle install --path vendor/bundle
bundle exec jekyll serve
```

### Las imágenes no cargan

Verifica que las rutas sean relativas a la raíz:
```markdown
![Alt text](/assets/img/imagen.webp)
```

### El sistema de calificación no funciona

1. Verifica que `rating.js` se cargue correctamente
2. Revisa la consola del navegador
3. Asegúrate de que localStorage esté habilitado

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 📞 Contacto

**Jorge De Trinidad Zepeda**

- 🌐 Website: [jdetrizep.github.io](https://jdetrizep.github.io)
- 💼 LinkedIn: [jorge-de-trinidad-zepeda](https://www.linkedin.com/in/jorge-de-trinidad-zepeda-13a4a454/)
- 🐙 GitHub: [@jdetrizep](https://github.com/jdetrizep)
- 📧 Email: jorgedetrinidad@outlook.com

---

## 🙏 Agradecimientos

- [Jekyll](https://jekyllrb.com/) - Generador de sitios estáticos
- [Klise Theme](https://github.com/piharpi/jekyll-klise) - Tema base
- [GitHub Pages](https://pages.github.com/) - Hosting gratuito
- Comunidad de desarrolladores IBM i

---

## 📈 Roadmap

### Próximas Mejoras

- [ ] Sistema de comentarios con Disqus/Utterances
- [ ] Backend para calificaciones globales
- [ ] Newsletter integrado
- [ ] Búsqueda avanzada con filtros
- [ ] Modo de lectura nocturna mejorado
- [ ] PWA (Progressive Web App)
- [ ] Internacionalización (i18n)

---

## 📚 Documentación Adicional

- [RATING_SYSTEM.md](RATING_SYSTEM.md) - Sistema de calificación detallado
- [MEJORAS_FASE1.md](MEJORAS_FASE1.md) - Mejoras implementadas fase 1
- [MEJORAS_FASE2.md](MEJORAS_FASE2.md) - Mejoras implementadas fase 2

---

<div align="center">

**⭐ Si te gusta este proyecto, dale una estrella en GitHub ⭐**

Hecho con ❤️ por [Jorge De Trinidad Zepeda](https://github.com/jdetrizep)

</div>
