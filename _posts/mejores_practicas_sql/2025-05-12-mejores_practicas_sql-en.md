---
lang: en
layout: post
title: Write high-quality SQL on IBM i
date: 2025-06-10 08:00
modified: 2025-06-10 08:00
description: Write high-quality SQL on IBM i - Best practices that improve performance
permalink: /mejores_practicas_sql/
tag:
  - IBM i
  - SQL
  - DB2
  - Optimización
  - Rendimiento
image: /mejores_practicas_sql/Buenas_Practicas.png
---

# Write high-quality SQL on IBM i: Best practices that improve performance

Not all well-written SQL is efficient SQL. In IBM i environments, where performance is key, applying good writing practices can make a big difference.
The quality of SQL is not only measured by its correctness, but also by its efficiency. Well-optimized SQL can reduce response times and system load, which is crucial in production environments.
In this article, we will explore the best practices for writing high-quality SQL on IBM i, focusing on how to optimize queries and avoid common mistakes that can affect performance.

<figure>
<img src="./Optimizar_consultas.png" alt="Optimizing SQL queries on IBM i">
<figcaption>Fig 1. Optimizing SQL queries on IBM i.</figcaption>
</figure>

## Why is SQL quality important?
SQL quality is fundamental for several reasons:
- **Performance**: Well-optimized SQL can significantly reduce query execution time, which reduces the load on the system.
- **Maintainability**: Clear, well-structured SQL code is easier to understand and maintain, which reduces the risk of errors in the future.
- **Scalability**: As databases grow, efficient SQL can handle larger data volumes without degrading performance.
- **Costs**: Optimized SQL can reduce resource usage, which in turn can lower the operational costs associated with data processing.
- **User experience**: Efficient SQL can improve the user experience by reducing wait times for results.
- **Lock prevention**: Well-designed SQL can minimize the risk of locks and contention in the database, which improves system availability.

## What to do: Best practices

### 1. Use CTEs (Common Table Expressions)

CTEs are an effective way to structure complex queries and improve code readability. They allow you to break a query into more manageable and reusable parts.

```sql
WITH ClientesActivos AS (
  SELECT * FROM CLIENTES WHERE ESTADO = 'ACTIVO'
)
SELECT * FROM ClientesActivos WHERE CIUDAD = 'SAN JOSÉ';
```

### 2. Filter as early as possible
Avoid using `HAVING` instead of `WHERE` when possible. This can reduce the amount of data processed and improve performance.

### 3. Use composite indexes intelligently
Consider the order of columns to maximize efficiency. For example, if you have an index on `(CIUDAD, ESTADO)`, and you query by `CIUDAD` and `ESTADO`, make sure the column order in the index matches the order in the query.

```sql
SELECT * FROM CLIENTES WHERE CIUDAD = 'SAN JOSÉ' AND ESTADO = 'ACTIVO';
```

### 4. Prefer `EXISTS` over `IN` in large subqueries
When working with large subqueries, `EXISTS` is usually more efficient than `IN`, since it stops the search as soon as it finds a match.

```sql
SELECT * FROM PEDIDOS P
WHERE EXISTS (
  SELECT 1 FROM CLIENTES C WHERE C.ID = P.CLIENTE_ID AND C.ESTADO = 'ACTIVO'
);
```

### 5. Use `JOIN` instead of subqueries
Joins (`JOIN`) are usually more efficient than subqueries, especially when dealing with large data sets. Use `INNER JOIN`, `LEFT JOIN`, etc., as needed.

```sql
SELECT C.NOMBRE, P.FECHA
FROM CLIENTES C
JOIN PEDIDOS P ON C.ID = P.CLIENTE_ID
WHERE C.ESTADO = 'ACTIVO';
```

### 6. Use `LIMIT` for pagination
When working with large data sets, use `LIMIT` to paginate the results. This reduces the amount of data processed and improves performance.

```sql
SELECT * FROM CLIENTES
ORDER BY NOMBRE
LIMIT 10 OFFSET 20; -- Pagination: shows 10 records starting from the 21st
```
### 7. Use `CASE` for complex conditions
Using `CASE` can simplify complex queries and improve code readability.

```sql
SELECT NOMBRE,
       CASE
           WHEN ESTADO = 'ACTIVO' THEN 'Cliente Activo'
           WHEN ESTADO = 'INACTIVO' THEN 'Cliente Inactivo'
           ELSE 'Estado Desconocido'
       END AS ESTADO_CLIENTE
FROM CLIENTES;
```

### 8. Use `COALESCE` to handle null values
Using `COALESCE` can help you handle null values more efficiently and readably.

```sql
SELECT NOMBRE, COALESCE(TELEFONO, 'No disponible') AS TELEFONO
FROM CLIENTES;
```

## What not to do: Bad practices

### 1. Avoid `SELECT *`
Using `SELECT *` can bring back more data than necessary, which affects performance and code readability. It is better to specify only the columns you actually need.

```sql
-- Bad
SELECT * FROM CLIENTES;

-- Good
SELECT NOMBRE, CIUDAD FROM CLIENTES;
```

### 2. Correlated subqueries
Avoid them if you can use `JOIN` or `EXISTS`. Correlated subqueries can be inefficient, since they are executed for each row of the outer query.

```sql
-- Bad
SELECT * FROM CLIENTES C
WHERE C.ID IN (
  SELECT P.CLIENTE_ID FROM PEDIDOS P WHERE P.FECHA > '2024-01-01'
);
-- Good
SELECT C.* FROM CLIENTES C
JOIN PEDIDOS P ON C.ID = P.CLIENTE_ID
WHERE P.FECHA > '2024-01-01';
```

### 3. Functions on indexed columns
Avoid applying functions to indexed columns in the `WHERE` clause, since this can disable the use of the index.
Avoid this:

```sql
-- Bad
SELECT * FROM CLIENTES WHERE UPPER(CIUDAD) = 'SAN JOSÉ';
```

Use this:

```sql
-- Good
SELECT * FROM CLIENTES WHERE CIUDAD = 'SAN JOSÉ';
```

### 4. Unnecessary use of `UNION`
Prefer `UNION ALL` if you don't need to remove duplicates. `UNION` involves an additional cost to remove duplicates, whereas `UNION ALL` does not.

```sql
-- Bad
SELECT NOMBRE FROM CLIENTES
UNION
SELECT NOMBRE FROM PROVEEDORES;
-- Good
SELECT NOMBRE FROM CLIENTES
UNION ALL
SELECT NOMBRE FROM PROVEEDORES;
```

### 5. Avoid using functions in join conditions
Avoid using functions in join conditions, since this can affect performance. Instead, use direct conditions.

```sql
-- Bad
SELECT * FROM CLIENTES C
JOIN PEDIDOS P ON C.ID = P.CLIENTE_ID
WHERE YEAR(P.FECHA) = 2024;
-- Good
SELECT * FROM CLIENTES C
JOIN PEDIDOS P ON C.ID = P.CLIENTE_ID
WHERE P.FECHA BETWEEN '2024-01-01' AND '2024-12-31';
```

## Before and after example
Example of how a query can be optimized:

```sql
-- Bad
SELECT * FROM VENTAS WHERE YEAR(FECHA) = 2024;

-- Good
SELECT numeroVenta, detalleVenta FROM VENTAS
WHERE FECHA BETWEEN '2024-01-01' AND '2024-12-31';
```
As you can see, using `BETWEEN` is clearer and more efficient than using `YEAR()`, since it avoids using functions in the `WHERE` clause, which allows the use of indexes. And it also specifies the columns you actually need, which improves readability and performance.

## Recommended tools

- Visual Explain
- Index Advisor
- `QSYS2.PLAN_CACHE_EVENT`

## Conclusion

SQL efficiency depends not only on being error-free, but on being optimized for the environment. Apply these practices and you will notice the difference in response times and system load.
Remember that SQL optimization is a continuous process. Always look to improve and tune your queries according to the changing needs of your environment and your data, and don't hesitate to use tools like Visual Explain to analyze and optimize your queries.
