---
lang: en
layout: post
title: Working with JSON in DB2
date: 2025-03-15 15:00
modified: 2025-03-15 15:00
description: Working with JSON in DB2 - Storage and Queries with CLOB
permalink: /manejo_json_db2/
tag:
  - IBM i
  - DB2/400
  - JSON
image: /manejo_json_db2/JSON_DB2.png
---

# Working with JSON in DB2/400: Storage and Queries with CLOB

The JSON format has become a standard for transferring and storing data in modern applications. In IBM DB2 for IBM i (formerly known as DB2/400), there is no specific data type for JSON, but IBM recommends using `CLOB` (Character Large Object) because of its compatibility with large text structures, which makes it ideal for storing JSON documents.

In this article, we will explore how to store, query, and manipulate JSON data in DB2/400 using `CLOB` and native JSON functions.

<figure>
<img src="./Developer_JSON_DB2.png" alt="Representation of JSON in DB2/400">
<figcaption>Fig 1. Representation of JSON in DB2/400.</figcaption>
</figure>

## 📌 Why use CLOB for JSON in DB2/400?

The `CLOB` data type is an excellent option for storing JSON documents in DB2/400 for several reasons:

- **Compatibility**: `CLOB` is a character-based data type, which makes it easy to manipulate and read JSON-formatted data without needing binary conversion.
- **Readability**: Storing JSON as `CLOB` allows you to inspect and modify its content with standard SQL tools without relying on special functions for binary decoding.
- **Native JSON support**: IBM DB2's functions for working with JSON operate seamlessly with `CLOB`, making it easy to extract and manipulate data.

### 🔹 Creating a Table for JSON

To store JSON in DB2/400, we define a column of type `CLOB`:

```sql
CREATE TABLE clientes (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    datos CLOB(1M)
);
```

Using `CLOB(1M)` allows storing up to 1MB of JSON data in each record.

To insert JSON documents into `CLOB`, we can do it as follows:

```sql
INSERT INTO clientes (datos)
VALUES ('{"nombre": "Juan Pérez", "email": "juan.perez@email.com", "edad": 30, "direccion": {"calle": "Av. Principal", "ciudad": "Madrid"}}');
```


## 🔎 Queries with JSON in DB2/400

DB2 for IBM i provides specific functions for working with JSON stored in `CLOB`. Below, we explore the most important ones:

### 🔹 `JSON_VALUE()`: Extract specific values

The `JSON_VALUE()` function allows us to obtain individual values from a JSON document:

```sql
SELECT JSON_VALUE(datos, '$.nombre') AS nombre_cliente
FROM clientes;
```

This returns the value of the `nombre` key within the JSON.

### 🔹 `JSON_OBJECT()`: Generate JSON objects

`JSON_OBJECT()` allows you to build JSON objects from data stored in the database:

```sql
SELECT JSON_OBJECT(
    'nombre' VALUE JSON_VALUE(datos, '$.nombre'),
    'email' VALUE JSON_VALUE(datos, '$.email')
) AS cliente_json
FROM clientes;
```

This query generates a JSON object by combining values extracted from existing records.

### 🔹 `JSON_ARRAY()`: Create JSON arrays

`JSON_ARRAY()` allows us to build an array of values:

```sql
SELECT JSON_ARRAY(
    JSON_VALUE(datos, '$.nombre'),
    JSON_VALUE(datos, '$.email'),
    JSON_VALUE(datos, '$.edad')
) AS cliente_array
FROM clientes;
```

This returns a JSON array with the selected values.

### 🔹 `JSON_ARRAYAGG()`: Generate dynamic arrays from multiple records

Unlike `JSON_ARRAY()`, which generates a static array from individual values, `JSON_ARRAYAGG()` allows you to build dynamic arrays by aggregating multiple records into a single array:

```sql
SELECT JSON_ARRAYAGG(JSON_OBJECT(
    'nombre' VALUE JSON_VALUE(datos, '$.nombre'),
    'email' VALUE JSON_VALUE(datos, '$.email')
)) AS clientes_json
FROM clientes;
```

**Key difference between `JSON_ARRAY()` and `JSON_ARRAYAGG()`**:

- `JSON_ARRAY()`: Builds an array with values explicitly selected in the same row.
- `JSON_ARRAYAGG()`: Groups multiple rows into a single array, generating a dynamic JSON set.

### 🔹 `JSON_QUERY()`: Extract complete JSON objects

Unlike `JSON_VALUE()`, which extracts individual values, `JSON_QUERY()` allows us to obtain complete JSON objects from a document:

```sql
SELECT JSON_QUERY(datos, '$.direccion') AS direccion_cliente
FROM clientes;
```

This returns the complete JSON object stored in the `direccion` key, without converting it into a simple text value.

Example of the result:

```json
{"calle": "Av. Principal", "ciudad": "Madrid"}
```

**Key difference between `JSON_VALUE()` and `JSON_QUERY()`**:

- `JSON_VALUE()`: Extracts an individual value from a JSON document.
- `JSON_QUERY()`: Extracts a complete JSON object within a document, keeping its original structure.
 
## 🔥 Conclusion

Using `CLOB` in DB2/400 allows storing JSON efficiently and compatibly with DB2's native functions. With tools such as `JSON_VALUE()`, `JSON_OBJECT()`, `JSON_ARRAY()`, `JSON_ARRAYAGG()`, and `JSON_QUERY()`, we can extract, structure, and manipulate JSON data without needing additional conversion.

Have you worked with JSON in DB2/400? Share your experience in the comments. 🚀
