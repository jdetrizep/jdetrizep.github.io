---
lang: en
layout: post
title: The Evolution of RPG
date: 2025-03-23 15:00
modified: 2025-03-23 15:00
description: The Evolution of RPG - Full Free in Modern Architectures
permalink: /evolucion_rpg/
tag:
  - IBM i
  - Full Free
  - AS400
  - RPG
  - Arquitecturas Modernas
  - VS Code
image: /evolucion_del_rpg/Evolucion_RPG.png
---

# 🔥 The Evolution of RPG: Full Free in Modern Architectures 🚀  

The **RPG** language has been the backbone of IBM i systems for decades. Although many consider it "old", the reality is that **it has evolved enormously**, adapting to the needs of modern architectures.  

Today, with **RPG Full Free + VS Code**, we can develop in a more agile, modular, and scalable way, integrating **APIs, microservices, cloud computing, and DevOps**.  

<figure>
<img src="./Crecimiento_RPG.png" alt="Representation of RPG in the cloud with multiple collaborative work teams">
<figcaption>Fig 1. The evolution of RPG with cloud repositories and multiple collaborative work teams.</figcaption>
</figure>

## 🔹 The evolution of RPG with Full Free  

With the arrival of **RPG Full Free**, the limitations of the fixed format disappeared, allowing cleaner code aligned with modern standards.  

### 🔥 Example of variable definition in old RPG vs. Full Free  

**Before (fixed format, SEU or RDi)**:  
```rpg
D Nombre         S             50A
D Edad           S              3 0
D Salario        S              9 2
```

**Now (Full Free in VS Code)**:  
```rpg
dcl-s nombre varchar(50);
dcl-s edad int(3);
dcl-s salario dec(9:2);
```
✅ **More readable, without column restrictions, and aligned with modern languages.**  

<figure>
<img src="./Arquitectura_RPG.png" alt="Agile development teams with RPG Full Free analyzing modern architecture diagrams">
<figcaption>Fig 2. Developments on AS400 through agile teams in modern architectures.</figcaption>
</figure>

## 🔹 Modern Architectures with Full Free + VS Code  

Historically, IBM i has been seen as a monolithic system, but with **RPG Full Free**, we can now design **modular, scalable, and cloud-connected solutions**.  

### ☁️ 1️⃣ REST APIs and Web Services with RPG Full Free  

🔥 **Example of creating a JSON object with RPG Full Free**  
```rpg
dcl-s jsonData clob(1M);
dcl-s nombre varchar(50);
dcl-s edad int(3);

exec sql
   select JSON_OBJECT('nombre' VALUE nombre, 'edad' VALUE edad)
   into :jsonData
   from clientes
   where id = 1001;

dsply jsonData;
```
✅ **Ideal for exposing IBM i data in REST APIs.**  


### 🔗 2️⃣ Microservices on IBM i with RPG Full Free  

With **RPG Full Free + Web Services**, we can:  
✅ Expose business logic in RESTful services.  
✅ Integrate RPG with **Node.js, Python, or Java** to handle web interfaces.  
✅ Use **Docker containers** to deploy RPG APIs in hybrid environments.  

🔥 **Example of a microservice with RPG Full Free and JSON**  
```rpg
dcl-s requestJSON clob(1M);
dcl-s responseJSON clob(1M);

requestJSON = '{
  "accion": "obtenerCliente",
  "idCliente": 1001
}';

exec sql
   set :responseJSON = JSON_OBJECT('status' VALUE 'success',
                                   'data' VALUE JSON_QUERY(requestJSON, '$'));

dsply responseJSON;
```
✅ **Here we process a JSON request and generate a structured response, ideal for microservices on IBM i.**  


### 📡 3️⃣ Cloud Connectivity: Azure, AWS, and IBM Cloud  

With **RPG Full Free + VS Code**, we can connect IBM i to the cloud to:  

☁️ **Send and receive data from Azure Blob Storage, AWS S3, or IBM Cloud Object Storage.**  
☁️ **Authenticate users with OAuth2 and JWT.**  
☁️ **Consume external web services via HTTP.**  

🔥 **Example: Consuming a cloud service with RPG Full Free and HTTP**  
```rpg
dcl-s url varchar(256) inz('https://api.servicio.com/cliente');
dcl-s jsonRequest clob(1M);
dcl-s jsonResponse clob(1M);

jsonRequest = '{ "idCliente": 1001 }';

exec sql
   call QSYS2.HTTP_POST(url, 'application/json', jsonRequest, jsonResponse);

dsply jsonResponse;
```
✅ **This code shows how IBM i can interact with external services through APIs.**  


### 🔄 4️⃣ DevOps Integration: GitHub and Azure DevOps  

🔥 **Example of a workflow with Git and CI/CD in RPG Full Free**  
1️⃣ **We write code in VS Code with Code for IBM i.**  
2️⃣ **We push changes to GitHub or Azure Repos with Git.**  
3️⃣ **We use Hard Code Check for IBM i to validate code quality.**  
4️⃣ **We deploy automatically to IBM i with Azure DevOps.**  

✅ **With this strategy, we can apply agile methodologies in RPG Full Free.**  


### 🛠️ 5️⃣ Using Procedures in RPG Full Free  

One of the benefits of **RPG Full Free** is the ability to better structure code through **procedures**, allowing:  
✅ **Modularity**: Separate logic into reusable components.  
✅ **Maintenance**: Make changes easier without affecting other parts of the system.  
✅ **Reuse**: Avoid duplicate code and improve efficiency.  

🔥 **Example of a Procedure in RPG Full Free**  

**Procedure definition:**  
```rpg
dcl-proc calcularTotal;
   dcl-pi *n packed(9:2);
   dcl-parm cantidad packed(5:0);
   dcl-parm precio packed(7:2);
   return cantidad * precio;
end-proc;
```

**Using the procedure in a program:**  
```rpg
dcl-s total packed(9:2);

total = calcularTotal(5 : 19.99);
dsply ('Total: ' + %char(total));
```
✅ **This procedure allows calculating the total of a purchase, keeping the code clean and reusable.**  

## 🔥 Conclusion  

💡 **IBM i keeps evolving and RPG Full Free adapts perfectly to modern architectures.**  
💡 **Using procedures in RPG improves modularity, reuse, and code maintenance.**  
💡 **VS Code boosts development, integration with APIs, DevOps, and the cloud.**  

🌍 **How are you using RPG Full Free in modern architectures? Have you tried integrations with VS Code, DevOps, or AI?** Let me know in the comments! 👇 