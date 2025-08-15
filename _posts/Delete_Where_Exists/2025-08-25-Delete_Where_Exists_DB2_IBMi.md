---
layout: post
title: DELETE WHERE EXISTS en Db2 for i
date: 2025-08-15 08:00
modified: 2025-08-15 08:00
description: DELETE WHERE EXISTS en Db2 for i - Cuidados, patrones seguros y lecciones aprendidas
tag:
  - IBM i
  - DB2
  - SQLRPGLE
  - SQL
image: /Delete_Where_Exists/Delete_Where_Exists_Portada.png
---

# DELETE WHERE EXISTS en Db2 for i: cuidados, patrones seguros y lecciones aprendidas

Cuando usamos `DELETE … WHERE EXISTS` en Db2 for i, el riesgo clásico es **olvidar la correlación entre la subconsulta y la tabla que borramos**. Si la subconsulta no se relaciona con la fila actual, `EXISTS` puede evaluar a verdadero para **todas** las filas… y adiós datos. A cuantos nos ha pasado que hemos borrado más de lo que queríamos y sin entender el por qué o cómo lo pudimos evitar. Es fundamental entender cómo funciona `EXISTS` y cómo aplicarlo correctamente. Aquí va una guía práctica para hacerlo bien y evitar sorpresas.

## 1. ¿Qué hace realmente `EXISTS`?
`EXISTS` devuelve **TRUE si la subconsulta devuelve al menos una fila**. Por eso, la subconsulta debe estar **correlacionada** con la fila de la tabla objetivo (normalmente por la clave). Si no hay correlación, `EXISTS` puede ser verdadero para todas las filas de la tabla objetivo, lo que lleva a un borrado masivo no intencionado.

**Patrón correcto (con correlación):**
```sql
DELETE FROM LIB.TARGET t
WHERE EXISTS (
  SELECT 1
  FROM LIB.SOURCE s
  WHERE s.ID = t.ID            -- ← correlación obligatoria
    AND s.STATUS = 'INACTIVE'  -- ← filtros adicionales
);
```

**Patrón peligroso (sin correlación):**
```sql
-- ¡NO HAGAS ESTO!
DELETE FROM LIB.TARGET t
WHERE EXISTS (
  SELECT 1
  FROM LIB.SOURCE s
  WHERE s.STATUS = 'INACTIVE'
);
-- Si SOURCE tiene al menos 1 fila INACTIVE, borra TODA TARGET.
```


## 2. Checklist “a prueba de borrados masivos”
Antes de ejecutar el `DELETE`:

1. **Escribe primero el SELECT equivalente**  
   Cambia `DELETE` por `SELECT COUNT(*)` para ver cuántas filas resultan:
```sql
SELECT COUNT(*)
FROM LIB.TARGET t
WHERE EXISTS (
  SELECT 1 FROM LIB.SOURCE s
  WHERE s.ID = t.ID
    AND s.STATUS = 'INACTIVE'
);
```

2. **Valida la correlación**  
   Asegúrate de que haya **al menos una condición** que relacione `t` con la subconsulta (`s.col = t.col`). Sin eso, peligro.
```sql
DELETE FROM LIB.TARGET t
WHERE EXISTS (
  SELECT 1
  FROM LIB.SOURCE s
  WHERE s.ID = t.ID
    AND s.STATUS = 'INACTIVE'
);
```

3. **Prueba con un filtro temporal**  
   Añade un `AND 1=2` en la subconsulta para confirmar que **no se borra nada** cuando tú lo decides:
```sql
SELECT COUNT(*)
FROM LIB.TARGET t
WHERE EXISTS (
  SELECT 1 FROM LIB.SOURCE s
  WHERE s.ID = t.ID
    AND 1 = 2
);
```

4. **Revisa índices y claves**  
   `EXISTS` vuela cuando la columna usada para correlacionar (`s.ID`) está indexada. Evitas table scans y sorpresas de rendimiento.
```sql
CREATE INDEX IDX_SOURCE_ID ON LIB.SOURCE (ID);
```

5. **Ejecuta bajo control transaccional**  
   Usa compromiso (**commitment control**) con journaling activo. En ACS (Run SQL Scripts), desactiva auto-commit o inicia transacción:

```sql
-- Ejemplo de flujo
-- SET TRANSACTION ISOLATION LEVEL READ COMMITTED;   -- opcional, según tu estándar
-- COMMIT;                                           -- asegúrate de empezar “limpio”

-- 1. Previsualiza
SELECT COUNT(*) ... ;

-- 2. Respaldos rápidos recomendados (ver §3)

-- 3. Ejecuta el DELETE
DELETE FROM LIB.TARGET t
WHERE EXISTS (...);

-- 4. Verifica y COMMIT o ROLLBACK
-- COMMIT;
-- ROLLBACK;  -- si algo luce mal
```

## 3. Dos estrategias de “red de seguridad” (muy recomendadas)

### A. **Tabla respaldo previa al borrado**
Guarda exactamente lo que vas a borrar, por si necesitas restaurar:
```sql
CREATE TABLE LIB.BK_TARGET_20250814 AS (
  SELECT * FROM LIB.TARGET t
  WHERE EXISTS (
    SELECT 1 FROM LIB.SOURCE s
    WHERE s.ID = t.ID
      AND s.STATUS = 'INACTIVE'
  )
) WITH DATA;

-- Luego sí:
DELETE FROM LIB.TARGET t
WHERE EXISTS (SELECT 1 FROM LIB.SOURCE s WHERE s.ID = t.ID AND s.STATUS = 'INACTIVE');
```

### B. **CTE de candidatos + borrado por clave**
Primero calculas los IDs (auditable y verificable), luego borras solo esos:
```sql
WITH candidatos AS (
  SELECT DISTINCT t.ID
  FROM LIB.TARGET t
  JOIN LIB.SOURCE s ON s.ID = t.ID
  WHERE s.STATUS = 'INACTIVE'
)
-- Auditoría previa
SELECT COUNT(*) AS filas_a_borrar FROM candidatos;

-- Borrado seguro por clave
DELETE FROM LIB.TARGET
WHERE ID IN (SELECT ID FROM candidatos);
```


## 4. Errores comunes (y cómo evitarlos)

- **Falta de correlación (`t` ↔ `s`)**  
  Causa #1 de “borré todo”. Solución: **siempre** une por la clave.
- **Filtros en el lugar incorrecto**  
  Poner condiciones de `t` dentro de la subconsulta o viceversa puede cambiar la lógica. Mantén **claro** qué filtra a `t` y qué filtra a `s`.
- **Confundir `EXISTS` con `IN`**  
  `EXISTS` valida la existencia, `IN` compara valores. Con claves compuestas o potenciales duplicados, `EXISTS` suele ser más claro y eficiente.
- **Sin índice en columnas de correlación**  
  Puede funcionar, pero será lento y riesgoso (timeout, locks). Indexa `s.ID` y la clave en `t` (y cualquier columna muy filtrante).
- **Borrar sin transacción ni respaldo**  
  El peor caso. Activa journaling, usa commit/rollback y crea respaldos temporales cuando el alcance no es trivial.


## 5. Rendimiento y buenas prácticas

- **Prefiere `EXISTS` para existencia** y correlación por clave.  
- **Indexa** columnas de unión y filtros (`s.ID`, `s.STATUS`).  
- **Revisa el plan** con Visual Explain e Index Advisor en ACS para confirmar que usas index probes y no table scans.  
- **Evita funciones sobre columnas** en la correlación (ej. `UPPER(s.ID) = t.ID`), suelen invalidar el uso de índices.  
- **Reduce el set** con filtros selectivos en la subconsulta: mientras más pronto discrimines, mejor.

<figure>
<img src="./Analisis_Delete_Where_Exists.png" alt="Análisis de DELETE WHERE EXISTS en Db2 for i">
<figcaption>Fig 1. Análisis de DELETE WHERE EXISTS en Db2 for i.</figcaption>
</figure>

## 6. Ejemplos prácticos

### 6.1 Borrar pedidos en `ORDERS` que ya están cancelados en `ORDER_STATUS`
```sql
-- Previa
SELECT COUNT(*)
FROM ERP.ORDERS o
WHERE EXISTS (
  SELECT 1
  FROM ERP.ORDER_STATUS st
  WHERE st.ORDER_ID = o.ORDER_ID
    AND st.STATE = 'CANCELLED'
    AND st.LAST_UPDATE >= CURRENT_DATE - 30 DAYS
);

-- Borrado
DELETE FROM ERP.ORDERS o
WHERE EXISTS (
  SELECT 1
  FROM ERP.ORDER_STATUS st
  WHERE st.ORDER_ID = o.ORDER_ID
    AND st.STATE = 'CANCELLED'
    AND st.LAST_UPDATE >= CURRENT_DATE - 30 DAYS
);
```

### 6.2 Con CTE auditable
```sql
WITH candidatos AS (
  SELECT o.ORDER_ID
  FROM ERP.ORDERS o
  JOIN ERP.ORDER_STATUS st ON st.ORDER_ID = o.ORDER_ID
  WHERE st.STATE = 'CANCELLED'
)
SELECT COUNT(*) FROM candidatos;   -- validar

DELETE FROM ERP.ORDERS
WHERE ORDER_ID IN (SELECT ORDER_ID FROM candidatos);
```


## 7. Procedimiento operativo recomendado (paso a paso)

1. Escribe el `SELECT COUNT(*)` equivalente.  
2. Revisa que haya **correlación** (clave t ↔ s).  
3. Verifica índices en columnas de correlación/filtros.  
4. Ejecuta bajo **transacción** (journaling + commit/rollback).  
5. Crea **respaldo** de candidatos (tabla o export).  
6. Ejecuta el `DELETE` y valida filas afectadas.  
7. `COMMIT` solo si la verificación es correcta (sino `ROLLBACK`).  


## 8. TL;DR
- **El error fatal**: subconsulta sin correlación → `EXISTS` es TRUE para todas las filas → borrado total.  
- **Antídoto**: correlaciona por clave + valida con `SELECT COUNT(*)` + transacción + respaldo previo.  
- **Bonus**: CTE de candidatos para auditar y borrar por clave; índices para rendimiento; Visual Explain para confirmar.


## Conclusión
Usar `DELETE … WHERE EXISTS` en Db2 for i es una herramienta de gran precisión cuando se entiende bien su funcionamiento, pero también puede convertirse en un bisturí sin filo si se omiten las correlaciones adecuadas. El problema más común no es la sentencia en sí, sino **la falta de validaciones previas y de un procedimiento seguro antes de ejecutarla**.  

La experiencia demuestra que los incidentes graves —como el borrado total de una tabla— ocurren cuando:  
- No existe correlación entre la tabla objetivo y la subconsulta.  
- No se valida la cantidad de filas a afectar antes de borrar.  
- No hay control transaccional ni respaldo previo.  

La clave para evitarlo está en **combinar buenas prácticas técnicas con disciplina operativa**:  
1. **Correlación clara**: cada `EXISTS` debe vincularse explícitamente con la fila que se evalúa.  
2. **Validación previa**: sustituir el `DELETE` por un `SELECT COUNT(*)` para confirmar el alcance real.  
3. **Entorno seguro**: usar transacciones con commit/rollback, respaldos temporales y, de ser posible, entornos de prueba antes de producción.  
4. **Auditoría y transparencia**: con CTEs o tablas de candidatos para tener trazabilidad de lo que se borrará.  
5. **Rendimiento y estabilidad**: revisar índices y planes de ejecución para que el proceso sea eficiente y no afecte la operación.  

Cuando aplicas estos pasos, el `DELETE … WHERE EXISTS` deja de ser un riesgo y se convierte en una de las formas más eficientes de limpiar datos relacionados en diferentes tablas. La diferencia entre una operación exitosa y un desastre de datos no está en la sentencia, sino en **la preparación y el control con el que se ejecuta**.  

En resumen:  
> Un `DELETE` con `WHERE EXISTS` bien pensado es cirugía precisa; uno improvisado es un accidente anunciado.  
