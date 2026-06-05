---
lang: en
layout: post
title: Protecting sensitive data on IBM i
permalink: /Encrypt_AES256_IBMi/
date: 2025-11-18 08:00
modified: 2025-11-18 08:00
description: Protecting sensitive data on IBM i with ENCRYPT_AES256 and DECRYPT_CHAR
tag:
  - IBM i
  - DB2
  - Ciberseguridad
  - Datos sensibles
  - Cifrado AES256
  - SQL
  - Seguridad de datos
  - Cumplimiento normativo
  - Protección de datos
  - Privacidad
image: /Encrypt_AES256_IBMi/Portada_Encrypting.png
---

# 🛡️ Protecting sensitive data on IBM i with ENCRYPT_AES256 and DECRYPT_CHAR
### A practical, technical guide to using AES-256 encryption directly in Db2 for i

In many mission-critical systems (banking, insurance, government, retail, healthcare), **IBM i** is still the heart of the business. That means that extremely sensitive data lives in **Db2 for i**: identification numbers, bank accounts, tokens, integration passwords, among others.

Protecting that information is no longer "nice to have": it is mandatory, both because of **real risk** and because of **regulatory compliance** (PCI-DSS, GDPR, data-protection laws, etc.). Security breaches can lead to multimillion-dollar fines, loss of reputation and trust, and serious legal consequences.

Within this context, Db2 for i offers a couple of very powerful functions:

- `ENCRYPT_AES256` → encrypts data with **256-bit AES**.
- `DECRYPT_CHAR` → lets you recover the cleartext value, using the same password or the session **ENCRYPTION PASSWORD**.

With them you can build robust security schemes **without leaving SQL** and without relying on external libraries in RPG, Java, or .NET.

<figure>
<img src="./Portada2_Encrypting.png" alt="Representation of AES-256 encryption on IBM i" />
<figcaption>Fig 1. Representation of AES-256 encryption on IBM i.</figcaption>
</figure>

## 1. What is ENCRYPT_AES256 in Db2 for i?

`ENCRYPT_AES256` is a **scalar function** of Db2 for i that returns an encrypted value from an input string (`data-string`), using the AES algorithm with a 256-bit key. It is a symmetric encryption algorithm, which means that the same key is used both to encrypt and to decrypt the data; it is widely recognized for its security and efficiency. Data encrypted with AES-256 is highly resistant to brute-force attacks and is suitable for protecting sensitive information in enterprise environments. Most importantly, this function is integrated directly into Db2 for i, which makes it easy to use without the need for additional components.

### 1.1. Function signature

```sql
ENCRYPT_AES256 ( data-string , password-string , hint-string )
```

- **data-string**: String to encrypt.
- **password-string**: Password of 6 to 127 bytes. Optional.
- **hint-string**: Optional hint of up to 32 bytes.

### 1.2. Output data type

The result type depends on the original type of the data:

| data-string                           | Result                |
|---------------------------------------|------------------------|
| BINARY / VARBINARY                    | VARBINARY             |
| CHAR / VARCHAR / GRAPHIC / VARGRAPHIC | VARCHAR FOR BIT DATA  |
| BLOB / CLOB / DBCLOB                  | BLOB                  |

The encrypted value is always **longer** than the original because of padding and overhead. Take this into account when defining the columns in which you will store encrypted data.


## 2. What exactly does DECRYPT_CHAR do?

`DECRYPT_CHAR` recovers the original text from the encrypted data generated with `ENCRYPT_AES256`. The `DECRYPT_CHAR` function is essential for reversing the encryption process and obtaining the data in its original form. By using the same password that was used during encryption, this function decrypts the encrypted data and returns the cleartext value. It is important to make sure that the password provided exactly matches the one used in the encryption process to guarantee successful recovery of the data.

Signature:

```sql
DECRYPT_CHAR ( encrypted-data , password-string DEFAULT , integer )
```

- **encrypted-data**: encrypted data.
- **password-string**: password used during encryption.
- **integer**: CCSID of the result.


## 3. Schema design: how to define columns for encrypted data

The columns must be defined as:

- `CHAR FOR BIT DATA`
- `VARCHAR FOR BIT DATA`
- `BINARY` / `VARBINARY`
- `BLOB`

The size must take into account:

- padding,
- 24 or 56 bytes of overhead,
- multiples of 16.

### Example:

```sql
CREATE TABLE CLIENTES_SENSIBLES (
    ID_CLIENTE      INT GENERATED ALWAYS AS IDENTITY,
    NOMBRE          VARCHAR(100),
    DOC_ENC         VARCHAR(80) FOR BIT DATA,
    FECHA_ALTA      DATE,
    CONSTRAINT PK_CLIENTES_SENSIBLES PRIMARY KEY (ID_CLIENTE)
);
```

## 4. Practical examples

### 4.1. Encrypt using the session ENCRYPTION PASSWORD

```sql
SET ENCRYPTION PASSWORD = 'Pwd_SuperSegura_2025';

INSERT INTO CLIENTES_SENSIBLES (NOMBRE, DOC_ENC, FECHA_ALTA)
VALUES (
    'Pedro Picapiedra',
    ENCRYPT_AES256('1-2345-6789'),
    CURRENT_DATE
);
```

### 4.2. Decrypt

```sql
SET ENCRYPTION PASSWORD = 'Pwd_SuperSegura_2025';

SELECT 
    ID_CLIENTE,
    NOMBRE,
    DECRYPT_CHAR(DOC_ENC) AS DOCUMENTO
FROM CLIENTES_SENSIBLES
WHERE ID_CLIENTE = 1;
```

### 4.3. Encrypt with an explicit password

```sql
INSERT INTO CLIENTES_SENSIBLES (NOMBRE, DOC_ENC, FECHA_ALTA)
VALUES (
    'Cliente Prueba',
    ENCRYPT_AES256('9999-8888-7777', 'cl4ve_Pr0d!'),
    CURRENT_DATE
);
```

### 4.4. Use a hint-string

```sql
INSERT INTO CLIENTES_SENSIBLES (NOMBRE, DOC_ENC, FECHA_ALTA)
VALUES (
    'Cliente VIP',
    ENCRYPT_AES256('3-4567-8901', 'Pacific2025', 'Ocean'),
    CURRENT_DATE
);
```

### 4.5. Migrate a cleartext column to an encrypted one

```sql
ALTER TABLE CLIENTES
ADD COLUMN DOCUMENTO_ENC VARCHAR(80) FOR BIT DATA;

SET ENCRYPTION PASSWORD = 'Pwd_Migracion_2025';

UPDATE CLIENTES
SET DOCUMENTO_ENC = ENCRYPT_AES256(DOCUMENTO);

ALTER TABLE CLIENTES DROP COLUMN DOCUMENTO;
```

### 4.6. View to expose decrypted data

```sql
CREATE VIEW VW_CLIENTES_SENSIBLES AS
SELECT
    ID_CLIENTE,
    NOMBRE,
    DECRYPT_CHAR(DOC_ENC, DEFAULT) AS DOCUMENTO,
    FECHA_ALTA
FROM CLIENTES_SENSIBLES;
```

### 4.7. Efficient searches with an auxiliary hash

```sql
ALTER TABLE CLIENTES_SENSIBLES
ADD COLUMN DOC_HASH CHAR(64);

INSERT INTO CLIENTES_SENSIBLES (NOMBRE, DOC_ENC, DOC_HASH, FECHA_ALTA)
VALUES (
    'Cliente Hash',
    ENCRYPT_AES256('1-2345-6789', 'Pwd2025!'),
    HEX(HASH_SHA256('1-2345-6789')),
    CURRENT_DATE
);

SELECT ID_CLIENTE, NOMBRE
FROM CLIENTES_SENSIBLES
WHERE DOC_HASH = HEX(HASH_SHA256('1-2345-6789'));
```

---

## 5. Best practices

### 5.1. Do not hardcode passwords
Load them from a vault or a secure variable. Avoid putting them directly in the SQL code. This reduces the risk of accidental exposure and makes it easier to rotate passwords periodically, which is crucial to maintaining the security of encrypted data and complying with the organization's security policies.

### 5.2. Always use TLS on remote connections
The encryption password could travel in cleartext if there is no secure layer, exposing the data to interception. Make sure all remote connections to the database use TLS to protect the confidentiality and integrity of the transmitted data, including the passwords used for encryption and decryption.

### 5.3. Properly define the type and length of columns
Avoid truncation and decryption errors by making sure the columns intended to store encrypted data are large enough to accommodate the increased size of the encrypted data. Consider the additional overhead and padding that AES-256 introduces, and define the columns as `VARCHAR FOR BIT DATA` or `BINARY` with an appropriate size to avoid data loss and guarantee integrity during the encryption and decryption process.

### 5.4. Use VARCHAR for passwords
Avoid accidental padding in CHAR; remember that passwords can vary in length. Using `VARCHAR` lets you store passwords of different lengths without adding extra spaces that could affect the accuracy of encryption and decryption. This is especially important for maintaining the security and functionality of encrypted data.

### 5.5. Authorities, RCAC, and auditing
Control who can see decrypted data by implementing role-based access controls (RCAC) and regular audits. Make sure only authorized users have permissions to run decryption functions and access sensitive data. Keep detailed records of who accesses the encrypted data and when, in order to meet regulatory compliance requirements and strengthen the overall security of the system.

### 5.6. Performance considerations
Avoid decrypting millions of rows; use auxiliary hashes. Decrypting large volumes of data can negatively impact system performance. To optimize queries, consider storing auxiliary hashes of the sensitive data that allow fast searches without needing to decrypt all the information. This not only improves efficiency but also reduces the exposure of sensitive data during search and filtering operations.

### 5.7. Password management and rotation
If the password is lost, the data is lost. Implement password-management policies that include periodic rotation and secure storage. Use secrets-management tools or vaults to store the encryption passwords, ensuring they are protected against unauthorized access. In addition, establish clear procedures for password recovery and updating, minimizing the risk of losing encrypted data due to forgotten or compromised passwords.


## 6. Common mistakes

- Truncation of encrypted columns.
- Incorrect CCSID when decrypting.
- Hardcoding passwords.
- Not using TLS.
- Searching over decrypted data en masse.


## 7. Conclusions

Implementing `ENCRYPT_AES256` and `DECRYPT_CHAR` in Db2 for i lets you:

- Secure sensitive data without leaving the IBM i environment.
- Meet modern regulatory requirements.
- Integrate IBM i into modern architectures while keeping the core secure.
- Control data governance from SQL, with minimal friction.

It is a critical tool for modernization, security, and enterprise architecture. A perfect combination of simplicity, power, and compliance that strengthens the position of IBM i as a secure and reliable platform in today's technology landscape.
