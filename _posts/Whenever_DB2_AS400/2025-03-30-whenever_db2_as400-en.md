---
lang: en
layout: post
title: Structured error handling in embedded SQL with the WHENEVER clause
date: 2025-03-30 15:00
modified: 2025-03-30 15:00
permalink: /whenever_db2_as400/
description: How to handle errors and warnings in RPG embedded SQL with WHENEVER
tag:
  - IBM i
  - Full Free
  - AS400
  - SQLRPGLE
  - DB2
image: /Whenever_DB2_AS400/Whenever_DB2.png
coautor: " | Ramiro García Leandro"
---

# Structured error handling in embedded SQL with the `WHENEVER` clause and the use of `DO` in DB2 for i (AS/400)

When working with embedded SQL in applications on IBM i (AS/400), it is essential to properly handle the errors that may arise at runtime. For this, DB2 provides the `WHENEVER` clause, a tool that lets you catch errors in a controlled way and react appropriately to the application's context.

`WHENEVER` lets you define automatic actions for conditions such as errors (`SQLERROR`), warnings (`SQLWARNING`) or the absence of data (`NOT FOUND`), without having to explicitly check `SQLCODE` after every SQL statement. Although many legacy systems still use `GOTO` in these scenarios, a more modern and maintainable practice is to use `DO`, which lets you invoke procedures or control the flow in a structured way.


<figure>
<img src="./Developer_RPGLE.png" alt="SQLRPGLE developer working on embedded SQL code">
<figcaption>Fig 1. SQLRPGLE developer working with WHENEVER.</figcaption>
</figure>

## 1. What is `WHENEVER` in embedded SQL?

`WHENEVER` is a clause used in embedded SQL to define what to do when a given condition occurs at runtime:

- **`SQLERROR`**: Errors during SQL execution, such as constraint violations or connection problems.
- **`SQLWARNING`**: SQL engine warnings, such as data truncation.
- **`NOT FOUND`**: Triggered when no rows are affected or returned by an SQL operation.

Using it greatly reduces the need to manually check `SQLCODE`, allowing for clearer, more centralized control logic.


## 2. Modern syntax with `DO`

Instead of redirecting the flow with `GOTO`, the modern syntax lets you use `DO`, which can directly invoke a subroutine or control the flow through structured commands:

```sql
EXEC SQL
   WHENEVER [SQLERROR | SQLWARNING | NOT FOUND]
   DO [procedure() | CONTINUE | BREAK];
```

- **`DO procedure()`**: Invokes a routine defined in the host language (e.g. `dcl-proc` in RPG).
- **`DO CONTINUE`**: Ignores the condition and continues execution.
- **`DO BREAK`**: Breaks out of the current block (for example, exiting a loop).


## 3. Practical example in SQLRPGLE using `DO procedure()`

```rpgle
Dcl-S IDEmp Int(10);
Dcl-S NombreEmp Varchar(50);

exec sql
   WHENEVER SQLERROR DO ManejarError();
exec sql
   WHENEVER NOT FOUND DO ManejarNoDatos();

exec sql
   SELECT nombre INTO :NombreEmp
   FROM empleados
   WHERE id = :IDEmp;

*INLR = *ON;
return;

dcl-proc ManejarError;
   Dsply 'An SQL error occurred';
   // Rollback, logging, resource cleanup, etc.
   *INLR = *ON;
   return;
end-proc;

dcl-proc ManejarNoDatos;
   Dsply 'Employee not found';
   return;
end-proc;
```

This approach avoids `GOTO`-style flow jumps, improves error traceability and clearly separates business logic from error handling.


## 4. Using `DO CONTINUE` and `DO BREAK`

### DO CONTINUE:

Lets the program continue execution without doing anything special when the condition occurs. It is useful, for example, to ignore expected warnings:

```sql
EXEC SQL WHENEVER SQLWARNING DO CONTINUE;
```

### DO BREAK:

Interrupts the current execution block, and is normally used inside repetitive structures (cursor loops):

```sql
EXEC SQL WHENEVER NOT FOUND DO BREAK;
```

This is particularly useful when you are doing a `FETCH` inside a loop and want to exit as soon as there is no more data.


## 5. Advantages of the structured approach with `DO`

- **Avoids the use of `GOTO`**, improving code clarity.
- **Encapsulates error-handling logic** in reusable procedures.
- **Improves maintainability and readability** of embedded SQL code.
- **Encourages good practices**, especially in critical applications where robustness is key.
- Aligns with a more modern development style on IBM i.

It is worth mentioning that procedures invoked with `DO procedure()` do not accept parameters, so any data they need must live in variables accessible from the program's context (for example, shared `DCL-S` variables).


Using `WHENEVER` in embedded SQL on DB2 for AS/400 with `DO` instead of `GOTO` is a modern and effective way to handle errors without polluting the program flow. By delegating actions to procedures, you get clearer and more centralized exception control, improving code maintainability and promoting a more professional style aligned with current standards in enterprise IBM i environments.
