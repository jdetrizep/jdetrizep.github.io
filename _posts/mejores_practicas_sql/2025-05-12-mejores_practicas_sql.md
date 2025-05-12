---
layout: post
title: Escribe SQL de alta calidad en IBM i
date: 2025-06-10 08:00
modified: 2025-06-10 08:00
description: Escribe SQL de alta calidad en IBM i - Buenas prácticas que mejoran el rendimiento
tag:
  - IBM i
  - SQL
  - DB2
  - Optimización
  - Rendimiento
image: /mejores_practicas_sql/Buenas_Practicas.png
---

# Escribe SQL de alta calidad en IBM i: Buenas prácticas que mejoran el rendimiento

No todo SQL bien escrito es SQL eficiente. En entornos IBM i, donde el rendimiento es clave, aplicar buenas prácticas de escritura puede marcar una gran diferencia.
La calidad del SQL no solo se mide por su corrección, sino también por su eficiencia. Un SQL bien optimizado puede reducir tiempos de respuesta y carga del sistema, lo que es crucial en entornos de producción.
En este artículo, exploraremos las mejores prácticas para escribir SQL de alta calidad en IBM i, centrándonos en cómo optimizar consultas y evitar errores comunes que pueden afectar el rendimiento.

<figure>
<img src="./Optimizar_consultas.png" alt="Optimización de consultas SQL en IBM i">
<figcaption>Fig 1. Optimización de consultas SQL en IBM i.</figcaption>
</figure>

## ¿Por qué es importante la calidad del SQL?
La calidad del SQL es fundamental por varias razones:
- **Rendimiento**: Un SQL bien optimizado puede reducir significativamente el tiempo de ejecución de las consultas, lo que reduce la carga en el sistema.
- **Mantenibilidad**: Un código SQL claro y bien estructurado es más fácil de entender y mantener, lo que reduce el riesgo de errores en el futuro.
- **Escalabilidad**: A medida que las bases de datos crecen, un SQL eficiente puede manejar volúmenes de datos más grandes sin degradar el rendimiento.
- **Costos**: Un SQL optimizado puede reducir el uso de recursos, lo que a su vez puede disminuir los costos operativos asociados con el procesamiento de datos.
- **Experiencia del usuario**: Un SQL eficiente puede mejorar la experiencia del usuario al reducir los tiempos de espera para obtener resultados.
- **Prevención de bloqueos**: Un SQL bien diseñado puede minimizar el riesgo de bloqueos y contention en la base de datos, lo que mejora la disponibilidad del sistema.

## Lo que sí: Buenas prácticas

### 1. Usa CTEs (Common Table Expressions)

Las CTEs son una forma efectiva de estructurar consultas complejas y mejorar la legibilidad del código. Permiten dividir una consulta en partes más manejables y reutilizables.

```sql
WITH ClientesActivos AS (
  SELECT * FROM CLIENTES WHERE ESTADO = 'ACTIVO'
)
SELECT * FROM ClientesActivos WHERE CIUDAD = 'SAN JOSÉ';
```

### 2. Filtra lo más pronto posible
Evita usar `HAVING` en lugar de `WHERE` cuando sea posible. Esto puede reducir la cantidad de datos procesados y mejorar el rendimiento.

### 3. Usa índices compuestos inteligentemente
Considera el orden de las columnas para maximizar eficiencia. Por ejemplo, si tienes un índice en `(CIUDAD, ESTADO)`, y consultas por `CIUDAD` y `ESTADO`, asegúrate de que el orden de las columnas en el índice sea el mismo que el de la consulta.

```sql
SELECT * FROM CLIENTES WHERE CIUDAD = 'SAN JOSÉ' AND ESTADO = 'ACTIVO';
```

### 4. Prefiere `EXISTS` sobre `IN` en subconsultas grandes
Cuando trabajes con subconsultas grandes, `EXISTS` suele ser más eficiente que `IN`, ya que detiene la búsqueda tan pronto como encuentra una coincidencia.

```sql
SELECT * FROM PEDIDOS P
WHERE EXISTS (
  SELECT 1 FROM CLIENTES C WHERE C.ID = P.CLIENTE_ID AND C.ESTADO = 'ACTIVO'
);
```

### 5. Usa `JOIN` en lugar de subconsultas
Las uniones (`JOIN`) suelen ser más eficientes que las subconsultas, especialmente cuando se trata de grandes conjuntos de datos. Utiliza `INNER JOIN`, `LEFT JOIN`, etc., según sea necesario.

```sql
SELECT C.NOMBRE, P.FECHA
FROM CLIENTES C
JOIN PEDIDOS P ON C.ID = P.CLIENTE_ID
WHERE C.ESTADO = 'ACTIVO';
```

### 6. Usa `LIMIT` para paginación
Cuando trabajes con grandes conjuntos de datos, usa `LIMIT` para paginar los resultados. Esto reduce la cantidad de datos procesados y mejora el rendimiento.

```sql
SELECT * FROM CLIENTES
ORDER BY NOMBRE
LIMIT 10 OFFSET 20; -- Paginación: muestra 10 registros a partir del 21
```
### 7. Usa `CASE` para condiciones complejas
El uso de `CASE` puede simplificar consultas complejas y mejorar la legibilidad del código.

```sql
SELECT NOMBRE,
       CASE
           WHEN ESTADO = 'ACTIVO' THEN 'Cliente Activo'
           WHEN ESTADO = 'INACTIVO' THEN 'Cliente Inactivo'
           ELSE 'Estado Desconocido'
       END AS ESTADO_CLIENTE
FROM CLIENTES;
```

### 8. Usa `COALESCE` para manejar valores nulos
El uso de `COALESCE` puede ayudarte a manejar valores nulos de manera más eficiente y legible.

```sql
SELECT NOMBRE, COALESCE(TELEFONO, 'No disponible') AS TELEFONO
FROM CLIENTES;
```

## Lo que no: Malas prácticas

### 1. Evita el `SELECT *`
El uso de `SELECT *` puede traer más datos de los necesarios, lo que afecta el rendimiento y la legibilidad del código. Es mejor especificar solo las columnas que realmente necesitas.

```sql
-- Mal
SELECT * FROM CLIENTES;

-- Bien
SELECT NOMBRE, CIUDAD FROM CLIENTES;
```

### 2. Subconsultas correlacionadas
Evítalas si puedes usar `JOIN` o `EXISTS`. Las subconsultas correlacionadas pueden ser ineficientes, ya que se ejecutan para cada fila de la consulta externa.

```sql
-- Mal
SELECT * FROM CLIENTES C
WHERE C.ID IN (
  SELECT P.CLIENTE_ID FROM PEDIDOS P WHERE P.FECHA > '2024-01-01'
);
-- Bien
SELECT C.* FROM CLIENTES C
JOIN PEDIDOS P ON C.ID = P.CLIENTE_ID
WHERE P.FECHA > '2024-01-01';
```

### 3. Funciones sobre columnas indexadas
Evita aplicar funciones a columnas indexadas en la cláusula `WHERE`, ya que esto puede desactivar el uso del índice.
Evita esto:

```sql
-- Mal
SELECT * FROM CLIENTES WHERE UPPER(CIUDAD) = 'SAN JOSÉ';
```

Usa esto:

```sql
-- Bien
SELECT * FROM CLIENTES WHERE CIUDAD = 'SAN JOSÉ';
```

### 4. Uso innecesario de `UNION`
Prefiere `UNION ALL` si no necesitas eliminar duplicados. `UNION` implica un costo adicional para eliminar duplicados, mientras que `UNION ALL` no lo hace.

```sql
-- Mal
SELECT NOMBRE FROM CLIENTES
UNION
SELECT NOMBRE FROM PROVEEDORES;
-- Bien
SELECT NOMBRE FROM CLIENTES
UNION ALL
SELECT NOMBRE FROM PROVEEDORES;
```

### 5. Evita el uso de funciones en condiciones de unión
Evita usar funciones en condiciones de unión, ya que esto puede afectar el rendimiento. En su lugar, usa condiciones directas.

```sql
-- Mal
SELECT * FROM CLIENTES C
JOIN PEDIDOS P ON C.ID = P.CLIENTE_ID
WHERE YEAR(P.FECHA) = 2024;
-- Bien
SELECT * FROM CLIENTES C
JOIN PEDIDOS P ON C.ID = P.CLIENTE_ID
WHERE P.FECHA BETWEEN '2024-01-01' AND '2024-12-31';
```

## Ejemplo antes y después
Ejemplo de cómo una consulta puede ser optimizada:

```sql
-- Mal
SELECT * FROM VENTAS WHERE YEAR(FECHA) = 2024;

-- Bien
SELECT numeroVenta, detalleVenta FROM VENTAS
WHERE FECHA BETWEEN '2024-01-01' AND '2024-12-31';
```
Como puedes ver, el uso de `BETWEEN` es más claro y eficiente que usar `YEAR()`, ya que evita el uso de funciones en la cláusula `WHERE`, lo que permite el uso de índices. Y además, especifica las columnas que realmente necesitas, lo que mejora la legibilidad y el rendimiento.

## Herramientas recomendadas

- Visual Explain
- Index Advisor
- `QSYS2.PLAN_CACHE_EVENT`

## Conclusión

La eficiencia del SQL no depende solo de que no haya errores, sino de que esté optimizado para el entorno. Aplica estas prácticas y notarás la diferencia en tiempos de respuesta y carga del sistema.
Recuerda que la optimización del SQL es un proceso continuo. Siempre busca mejorar y ajustar tus consultas según las necesidades cambiantes de tu entorno y tus datos, y no dudes en utilizar herramientas como Visual Explain para analizar y optimizar tus consultas.
