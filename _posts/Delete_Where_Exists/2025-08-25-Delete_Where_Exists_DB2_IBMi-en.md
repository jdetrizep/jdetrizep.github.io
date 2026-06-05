---
lang: en
layout: post
title: DELETE WHERE EXISTS in Db2 for i
date: 2025-08-15 08:00
modified: 2025-08-15 08:00
description: DELETE WHERE EXISTS in Db2 for i - Precautions, safe patterns, and lessons learned
permalink: /Delete_Where_Exists_DB2_IBMi/
tag:
  - IBM i
  - DB2
  - SQLRPGLE
  - SQL
image: /Delete_Where_Exists/Delete_Where_Exists_Portada.png
---

# DELETE WHERE EXISTS in Db2 for i: precautions, safe patterns, and lessons learned

When we use `DELETE … WHERE EXISTS` in Db2 for i, the classic risk is **forgetting the correlation between the subquery and the table we are deleting from**. If the subquery is not related to the current row, `EXISTS` can evaluate to true for **all** rows… and goodbye data. How many of us have deleted more than we wanted without understanding why or how we could have avoided it. It is essential to understand how `EXISTS` works and how to apply it correctly. Here is a practical guide to do it right and avoid surprises.

## 1. What does `EXISTS` really do?
`EXISTS` returns **TRUE if the subquery returns at least one row**. That is why the subquery must be **correlated** with the row of the target table (usually by the key). If there is no correlation, `EXISTS` can be true for all rows of the target table, which leads to an unintended mass deletion.

**Correct pattern (with correlation):**
```sql
DELETE FROM LIB.TARGET t
WHERE EXISTS (
  SELECT 1
  FROM LIB.SOURCE s
  WHERE s.ID = t.ID            -- ← mandatory correlation
    AND s.STATUS = 'INACTIVE'  -- ← additional filters
);
```

**Dangerous pattern (without correlation):**
```sql
-- DO NOT DO THIS!
DELETE FROM LIB.TARGET t
WHERE EXISTS (
  SELECT 1
  FROM LIB.SOURCE s
  WHERE s.STATUS = 'INACTIVE'
);
-- If SOURCE has at least 1 INACTIVE row, it deletes ALL of TARGET.
```


## 2. "Mass-deletion-proof" checklist
Before executing the `DELETE`:

1. **Write the equivalent SELECT first**  
   Change `DELETE` to `SELECT COUNT(*)` to see how many rows result:
```sql
SELECT COUNT(*)
FROM LIB.TARGET t
WHERE EXISTS (
  SELECT 1 FROM LIB.SOURCE s
  WHERE s.ID = t.ID
    AND s.STATUS = 'INACTIVE'
);
```

2. **Validate the correlation**  
   Make sure there is **at least one condition** relating `t` to the subquery (`s.col = t.col`). Without it, danger.
```sql
DELETE FROM LIB.TARGET t
WHERE EXISTS (
  SELECT 1
  FROM LIB.SOURCE s
  WHERE s.ID = t.ID
    AND s.STATUS = 'INACTIVE'
);
```

3. **Test with a temporary filter**  
   Add an `AND 1=2` in the subquery to confirm that **nothing is deleted** when you decide so:
```sql
SELECT COUNT(*)
FROM LIB.TARGET t
WHERE EXISTS (
  SELECT 1 FROM LIB.SOURCE s
  WHERE s.ID = t.ID
    AND 1 = 2
);
```

4. **Review indexes and keys**  
   `EXISTS` flies when the column used to correlate (`s.ID`) is indexed. You avoid table scans and performance surprises.
```sql
CREATE INDEX IDX_SOURCE_ID ON LIB.SOURCE (ID);
```

5. **Run under transactional control**  
   Use commitment control with active journaling. In ACS (Run SQL Scripts), disable auto-commit or start a transaction:

```sql
-- Example flow
-- SET TRANSACTION ISOLATION LEVEL READ COMMITTED;   -- optional, according to your standard
-- COMMIT;                                           -- make sure you start "clean"

-- 1. Preview
SELECT COUNT(*) ... ;

-- 2. Recommended quick backups (see §3)

-- 3. Execute the DELETE
DELETE FROM LIB.TARGET t
WHERE EXISTS (...);

-- 4. Verify and COMMIT or ROLLBACK
-- COMMIT;
-- ROLLBACK;  -- if something looks wrong
```

## 3. Two "safety net" strategies (highly recommended)

### A. **Backup table before deletion**
Save exactly what you are going to delete, in case you need to restore it:
```sql
CREATE TABLE LIB.BK_TARGET_20250814 AS (
  SELECT * FROM LIB.TARGET t
  WHERE EXISTS (
    SELECT 1 FROM LIB.SOURCE s
    WHERE s.ID = t.ID
      AND s.STATUS = 'INACTIVE'
  )
) WITH DATA;

-- Then yes:
DELETE FROM LIB.TARGET t
WHERE EXISTS (SELECT 1 FROM LIB.SOURCE s WHERE s.ID = t.ID AND s.STATUS = 'INACTIVE');
```

### B. **Candidate CTE + deletion by key**
First you compute the IDs (auditable and verifiable), then you delete only those:
```sql
WITH candidatos AS (
  SELECT DISTINCT t.ID
  FROM LIB.TARGET t
  JOIN LIB.SOURCE s ON s.ID = t.ID
  WHERE s.STATUS = 'INACTIVE'
)
-- Prior audit
SELECT COUNT(*) AS filas_a_borrar FROM candidatos;

-- Safe deletion by key
DELETE FROM LIB.TARGET
WHERE ID IN (SELECT ID FROM candidatos);
```


## 4. Common mistakes (and how to avoid them)

- **Lack of correlation (`t` ↔ `s`)**  
  Cause #1 of "I deleted everything". Solution: **always** join by the key.
- **Filters in the wrong place**  
  Placing `t` conditions inside the subquery or vice versa can change the logic. Keep it **clear** what filters `t` and what filters `s`.
- **Confusing `EXISTS` with `IN`**  
  `EXISTS` validates existence, `IN` compares values. With composite keys or potential duplicates, `EXISTS` is usually clearer and more efficient.
- **No index on correlation columns**  
  It may work, but it will be slow and risky (timeout, locks). Index `s.ID` and the key in `t` (and any highly filtering column).
- **Deleting without a transaction or backup**  
  The worst case. Enable journaling, use commit/rollback, and create temporary backups when the scope is not trivial.


## 5. Performance and best practices

- **Prefer `EXISTS` for existence** and correlate by key.  
- **Index** join and filter columns (`s.ID`, `s.STATUS`).  
- **Review the plan** with Visual Explain and Index Advisor in ACS to confirm you are using index probes and not table scans.  
- **Avoid functions over columns** in the correlation (e.g., `UPPER(s.ID) = t.ID`), they usually invalidate index usage.  
- **Reduce the set** with selective filters in the subquery: the sooner you discriminate, the better.

<figure>
<img src="./Analisis_Delete_Where_Exists.png" alt="Analysis of DELETE WHERE EXISTS in Db2 for i">
<figcaption>Fig 1. Analysis of DELETE WHERE EXISTS in Db2 for i.</figcaption>
</figure>

## 6. Practical examples

### 6.1 Delete orders in `ORDERS` that are already cancelled in `ORDER_STATUS`
```sql
-- Preview
SELECT COUNT(*)
FROM ERP.ORDERS o
WHERE EXISTS (
  SELECT 1
  FROM ERP.ORDER_STATUS st
  WHERE st.ORDER_ID = o.ORDER_ID
    AND st.STATE = 'CANCELLED'
    AND st.LAST_UPDATE >= CURRENT_DATE - 30 DAYS
);

-- Deletion
DELETE FROM ERP.ORDERS o
WHERE EXISTS (
  SELECT 1
  FROM ERP.ORDER_STATUS st
  WHERE st.ORDER_ID = o.ORDER_ID
    AND st.STATE = 'CANCELLED'
    AND st.LAST_UPDATE >= CURRENT_DATE - 30 DAYS
);
```

### 6.2 With an auditable CTE
```sql
WITH candidatos AS (
  SELECT o.ORDER_ID
  FROM ERP.ORDERS o
  JOIN ERP.ORDER_STATUS st ON st.ORDER_ID = o.ORDER_ID
  WHERE st.STATE = 'CANCELLED'
)
SELECT COUNT(*) FROM candidatos;   -- validate

DELETE FROM ERP.ORDERS
WHERE ORDER_ID IN (SELECT ORDER_ID FROM candidatos);
```


## 7. Recommended operating procedure (step by step)

1. Write the equivalent `SELECT COUNT(*)`.  
2. Check that there is **correlation** (key t ↔ s).  
3. Verify indexes on correlation/filter columns.  
4. Run under a **transaction** (journaling + commit/rollback).  
5. Create a **backup** of candidates (table or export).  
6. Execute the `DELETE` and validate affected rows.  
7. `COMMIT` only if the verification is correct (otherwise `ROLLBACK`).  


## 8. TL;DR
- **The fatal error**: subquery without correlation → `EXISTS` is TRUE for all rows → total deletion.  
- **Antidote**: correlate by key + validate with `SELECT COUNT(*)` + transaction + prior backup.  
- **Bonus**: candidate CTE to audit and delete by key; indexes for performance; Visual Explain to confirm.


## Conclusion
Using `DELETE … WHERE EXISTS` in Db2 for i is a tool of great precision when its operation is well understood, but it can also become a dull scalpel if the proper correlations are omitted. The most common problem is not the statement itself, but **the lack of prior validations and a safe procedure before executing it**.  

Experience shows that serious incidents —such as the total deletion of a table— occur when:  
- There is no correlation between the target table and the subquery.  
- The number of rows to be affected is not validated before deleting.  
- There is no transactional control or prior backup.  

The key to avoiding it lies in **combining good technical practices with operational discipline**:  
1. **Clear correlation**: every `EXISTS` must be explicitly linked to the row being evaluated.  
2. **Prior validation**: replace the `DELETE` with a `SELECT COUNT(*)` to confirm the real scope.  
3. **Safe environment**: use transactions with commit/rollback, temporary backups, and, if possible, test environments before production.  
4. **Auditing and transparency**: with CTEs or candidate tables to have traceability of what will be deleted.  
5. **Performance and stability**: review indexes and execution plans so the process is efficient and does not affect operations.  

When you apply these steps, `DELETE … WHERE EXISTS` stops being a risk and becomes one of the most efficient ways to clean up related data across different tables. The difference between a successful operation and a data disaster is not in the statement, but in **the preparation and control with which it is executed**.  

In summary:  
> A well-thought-out `DELETE` with `WHERE EXISTS` is precise surgery; an improvised one is an accident waiting to happen.  
