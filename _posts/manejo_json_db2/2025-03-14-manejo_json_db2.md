---
lang: es
layout: post
title: Manejo de JSON con DB2
date: 2025-03-15 15:00
modified: 2025-03-15 15:00
description: Manejo de JSON con DB2 - Almacenamiento y Consultas con CLOB
tag:
  - IBM i
  - DB2/400
  - JSON
image: /manejo_json_db2/JSON_DB2.png
---

# Manejo de JSON con DB2/400: Almacenamiento y Consultas con CLOB

El formato JSON se ha convertido en un estándar en la transferencia y almacenamiento de datos en aplicaciones modernas. En IBM DB2 para IBM i (antes conocido como DB2/400), no existe un tipo de dato específico para JSON, pero IBM recomienda el uso de `CLOB` (Character Large Object) debido a su compatibilidad con estructuras de texto de gran tamaño, lo que lo hace ideal para almacenar documentos JSON.

En este artículo, exploraremos cómo almacenar, consultar y manipular datos JSON en DB2/400 utilizando `CLOB` y funciones nativas de JSON.

<figure>
<img src="./Developer_JSON_DB2.png" alt="Representación de JSON en DB2/400">
<figcaption>Fig 1. Representación de JSON en DB2/400.</figcaption>
</figure>

## 📌 ¿Por qué usar CLOB para JSON en DB2/400?

El tipo de dato `CLOB` es una excelente opción para almacenar documentos JSON en DB2/400 por varias razones:

- **Compatibilidad**: `CLOB` es un tipo de dato basado en caracteres, lo que facilita la manipulación y lectura de datos en formato JSON sin necesidad de conversión binaria.
- **Legibilidad**: Almacenar JSON como `CLOB` permite inspeccionar y modificar su contenido con herramientas estándar de SQL sin depender de funciones especiales para decodificación binaria.
- **Soporte nativo de JSON**: Las funciones de IBM DB2 para trabajar con JSON operan sin problemas con `CLOB`, facilitando la extracción y manipulación de datos.

### 🔹 Creación de una Tabla para JSON

Para almacenar JSON en DB2/400, definimos una columna de tipo `CLOB`:

```sql
CREATE TABLE clientes (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    datos CLOB(1M)
);
```

El uso de `CLOB(1M)` permite almacenar hasta 1MB de datos JSON en cada registro.

Para insertar documentos JSON en `CLOB`, podemos hacerlo de la siguiente manera:

```sql
INSERT INTO clientes (datos)
VALUES ('{"nombre": "Juan Pérez", "email": "juan.perez@email.com", "edad": 30, "direccion": {"calle": "Av. Principal", "ciudad": "Madrid"}}');
```


## 🔎 Consultas con JSON en DB2/400

DB2 para IBM i proporciona funciones específicas para trabajar con JSON almacenado en `CLOB`. A continuación, exploramos las más importantes:

### 🔹 `JSON_VALUE()`: Extraer valores específicos

La función `JSON_VALUE()` nos permite obtener valores individuales de un documento JSON:

```sql
SELECT JSON_VALUE(datos, '$.nombre') AS nombre_cliente
FROM clientes;
```

Esto devuelve el valor de la clave `nombre` dentro del JSON.

### 🔹 `JSON_OBJECT()`: Generar objetos JSON

`JSON_OBJECT()` permite construir objetos JSON a partir de datos almacenados en la base de datos:

```sql
SELECT JSON_OBJECT(
    'nombre' VALUE JSON_VALUE(datos, '$.nombre'),
    'email' VALUE JSON_VALUE(datos, '$.email')
) AS cliente_json
FROM clientes;
```

Este query genera un objeto JSON combinando valores extraídos de los registros existentes.

### 🔹 `JSON_ARRAY()`: Crear arrays JSON

`JSON_ARRAY()` nos permite construir un array de valores:

```sql
SELECT JSON_ARRAY(
    JSON_VALUE(datos, '$.nombre'),
    JSON_VALUE(datos, '$.email'),
    JSON_VALUE(datos, '$.edad')
) AS cliente_array
FROM clientes;
```

Esto devuelve un array JSON con los valores seleccionados.

### 🔹 `JSON_ARRAYAGG()`: Generar arrays dinámicos desde múltiples registros

A diferencia de `JSON_ARRAY()`, que genera un array estático a partir de valores individuales, `JSON_ARRAYAGG()` permite construir arrays dinámicos agregando múltiples registros en un solo array:

```sql
SELECT JSON_ARRAYAGG(JSON_OBJECT(
    'nombre' VALUE JSON_VALUE(datos, '$.nombre'),
    'email' VALUE JSON_VALUE(datos, '$.email')
)) AS clientes_json
FROM clientes;
```

**Diferencia clave entre `JSON_ARRAY()` y `JSON_ARRAYAGG()`**:

- `JSON_ARRAY()`: Construye un array con valores explícitamente seleccionados en una misma fila.
- `JSON_ARRAYAGG()`: Agrupa múltiples filas en un solo array, generando un conjunto JSON dinámico.

### 🔹 `JSON_QUERY()`: Extraer objetos JSON completos

A diferencia de `JSON_VALUE()`, que extrae valores individuales, `JSON_QUERY()` nos permite obtener objetos JSON completos de un documento:

```sql
SELECT JSON_QUERY(datos, '$.direccion') AS direccion_cliente
FROM clientes;
```

Esto devuelve el objeto JSON completo almacenado en la clave `direccion`, sin convertirlo en un simple valor de texto.

Ejemplo del resultado:

```json
{"calle": "Av. Principal", "ciudad": "Madrid"}
```

**Diferencia clave entre `JSON_VALUE()` y `JSON_QUERY()`**:

- `JSON_VALUE()`: Extrae un valor individual de un documento JSON.
- `JSON_QUERY()`: Extrae un objeto JSON completo dentro de un documento, manteniendo su estructura original.
 
## 🔥 Conclusión

El uso de `CLOB` en DB2/400 permite almacenar JSON de forma eficiente y compatible con las funciones nativas de DB2. Con herramientas como `JSON_VALUE()`, `JSON_OBJECT()`, `JSON_ARRAY()`, `JSON_ARRAYAGG()` y `JSON_QUERY()`, podemos extraer, estructurar y manipular datos JSON sin necesidad de conversión adicional.

¿Has trabajado con JSON en DB2/400? Comparte tu experiencia en los comentarios. 🚀
