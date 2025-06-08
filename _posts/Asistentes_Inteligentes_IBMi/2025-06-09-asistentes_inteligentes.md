---
layout: post
title: Asistentes Inteligentes para IBM i
date: 2025-06-08 08:00
modified: 2025-06-08 08:00
description: Asistentes Inteligentes para IBM i - De un gran aliado a una nueva promesa
tag:
  - IBM i
  - Watsonx Code Assistant
  - GitHub Copilot
  - Inteligencia Artificial
  - AI
  - Modernización
  - RPGLE
image: /Asistentes_Inteligentes_IBMi/Watsonx_code_assistant_for_IBMi.png
---

# 🤖 Asistentes Inteligentes para IBM i: De un gran aliado a una nueva promesa

Durante años, trabajar con código en IBM i ha sido una tarea que requiere experiencia, paciencia y mucho conocimiento tácito. Pero gracias a la inteligencia artificial, hoy contamos con herramientas que nos acompañan, nos entienden y hasta nos sugieren cómo mejorar nuestro código.

<figure>
<img src="./Asistentes_Inteligentes.png" alt="Asistentes Inteligentes para los desarrolladores de IBM i" width="100%">
<figcaption>Fig 1. Asistentes Inteligentes para los desarrolladores de IBM i.</figcaption>
</figure>

## 💙 GitHub Copilot: Un compañero incansable

Desde que GitHub Copilot llegó a nuestras vidas, se convirtió en más que una herramienta: un **aliado silencioso** pero poderoso.

✅ Nos ayudó a escribir más rápido  
✅ Nos completó código cuando las ideas escaseaban  
✅ Nos reconoció estructuras en **RPG Full Free** con sorprendente precisión  
✅ Y hasta nos sugirió consultas complejas en **SQLRPGLE** que normalmente tomarían varios minutos construir

🎯 Aunque no fue diseñado específicamente para IBM i, **supo adaptarse**, y muchos de nosotros lo hemos adoptado como parte esencial de nuestro día a día.  
🧠 Nos sorprendió su capacidad de entender patrones, adaptarse al estilo de nuestro código e incluso ayudarnos a formar nuevos programadores.

Por todo eso: **¡Gracias Copilot!** 🙌

## 👀 watsonx Code Assistant for i: La promesa que se acerca

Ahora, IBM da un paso más allá con un asistente pensado **específicamente para IBM i**:  
**IBM watsonx Code Assistant for i**.

Aunque aún no está disponible de forma general, lo que se ha anunciado es **muy prometedor**:

🔹 Lectura y explicación de código RPG (Fixed y Free Format)  
🔹 Soporte para modernización de código heredado  
🔹 Generación automática de pruebas unitarias  
🔹 Conversaciones en lenguaje natural para comprender lógica de negocio  
🔹 Integración con VS Code y despliegue en ambientes cloud/híbridos/on-premise

No hablamos solo de sugerencias de código, hablamos de **entender el contexto técnico y de negocio de IBM i**. Algo que solo un asistente entrenado con foco en esta plataforma puede lograr.

## 🏗️ ¿Qué sabemos hoy de watsonx Code Assistant for i?

### 🧬 Arquitectura modular y flexible

Watsonx Code Assistant for i está construido sobre la plataforma **watsonx.ai**, que utiliza modelos fundacionales IBM Granite, optimizados para tareas de generación y comprensión de código.

Se compone de las siguientes capas:

- **Watsonx.ai foundation**
- **Watsonx Code Assistant runtime**
- **Extensiones de IDE**
- **Conectividad con sistemas IBM i**

También se espera integración con herramientas como **ADDI** para análisis de dependencias.

### 🔐 Seguridad y privacidad: pilares del diseño

Uno de los diferenciales más fuertes de IBM frente a otras soluciones de inteligencia artificial es su compromiso con la privacidad y la gobernanza empresarial. Por eso, watsonx Code Assistant for i se diseñó con un enfoque en:
- **Cumplimiento normativo**: Cumple con estándares como GDPR, HIPAA y CCPA.
- **Seguridad de datos**: Implementa controles de seguridad robustos, incluyendo:
  - **Cifrado de datos en tránsito y en reposo**
  - **Uso de claves administradas por el cliente (BYOK)**
  - **Opciones de despliegue flexibles**
- ✅ **Política de privacidad estricta**: IBM no utiliza el contenido que los clientes suben ni los resultados generados por los modelos fundacionales para reentrenar o mejorar otros modelos. Toda la interacción con watsonx Code Assistant se mantiene **dentro del entorno del cliente**, asegurando la confidencialidad, integridad y propiedad de los datos.

## 🔧 Rutas de modernización en Watsonx Code Assistant: tres enfoques complementarios

### ✅ 1. Automated Fixes
Watsonx Code Assistant detecta patrones de código obsoletos o no recomendados y aplica cambios directamente. Esto permite a los desarrolladores enfocarse en tareas más complejas y creativas, mientras el asistente se encarga de las mejoras rutinarias. Por ejemplo, puede sugerir reemplazar estructuras de código antiguas por nuevas prácticas recomendadas, como la conversión de código RPG Fixed Format a Free Format. La idea es que el asistente realice cambios que no requieran revisión manual, mejorando la calidad del código de forma automática.

### 🧭 2. Assisted Fixes
Propuestas que el desarrollador debe revisar y aprobar antes de aplicarlas. Esto permite al usuario tener el control final sobre los cambios, asegurando que las modificaciones se alineen con las necesidades específicas del proyecto. Por ejemplo, si el asistente sugiere una optimización en una consulta SQL, el desarrollador puede revisarla y decidir si implementarla o no. Este enfoque combina la inteligencia del asistente con la experiencia del desarrollador, permitiendo una colaboración efectiva.

### 🛠️ 3. Self-Directed Fixes
El usuario dirige las modificaciones con el apoyo del asistente como copiloto. En este caso, el asistente actúa como un guía, proporcionando sugerencias y recursos mientras el desarrollador toma las decisiones finales. Por ejemplo, si un desarrollador quiere refactorizar una función compleja, puede pedirle al asistente que le sugiera mejores prácticas o ejemplos de código, pero la implementación final queda en manos del usuario. Este enfoque fomenta la autonomía del desarrollador y permite un aprendizaje continuo.

## 🛠️ ¿Cómo obtener recomendaciones de código de alta calidad con Watsonx Code Assistant for i?

### 🧾 Mejores prácticas:
1. Usá el chat iterativo en el IDE  
2. Referenciá archivos específicos  
3. Proporcioná contexto técnico o funcional  
4. Refiná el resultado  
5. Usá lenguaje natural con términos técnicos  

Una buena práctica es **proporcionar ejemplos de código** o **describir el contexto del problema**. Por ejemplo:

```plaintext
Quiero que me ayudes a generar un programa en RPG Full Free que lea un archivo de clientes y muestre sus nombres y direcciones. El archivo se llama `CLIENTES` y tiene los campos `NOMBRE` y `DIRECCION`.
```
Y si necesitas generar un código base, puedes pedir algo como:

```plaintext
Generame un boilerplate de un programa en SQLRPGLE que conecte a una base de datos y realice una consulta simple.
```

💡 **Tip que siempre es importante**: Sé claro al generar boilerplate code.

Todo esto ayuda a que el asistente entienda mejor tus necesidades y genere código más relevante. Además, es importante **ser claro y específico** en tus solicitudes para obtener el mejor resultado posible. Y es muy importante no olvidar que, aunque la IA puede hacer mucho, **el juicio humano sigue siendo esencial** para validar y adaptar las sugerencias a tu contexto específico. Un buen asistente no reemplaza al desarrollador, sino que lo potencia.

## 🧑‍💻 IDEs Soportados
Watsonx Code Assistant for i se integrará con los siguientes IDEs:
- **Visual Studio Code**: Con una extensión dedicada que permitirá aprovechar todas las capacidades del asistente directamente en el editor.
- **RDi (Rational Developer for i)**: Integración para los usuarios que prefieren este entorno de desarrollo tradicional en IBM i.

Esta integración facilitará el acceso a las funcionalidades del asistente sin necesidad de cambiar de entorno, permitiendo a los desarrolladores trabajar de manera más eficiente. En el caso de Visual Studio Code, se espera que la extensión ofrezca una experiencia similar a la de Copilot, pero con un enfoque específico en las necesidades de los desarrolladores de IBM i. Mientras que para RDi, la integración permitirá aprovechar las capacidades de modernización y generación de código directamente en el entorno de desarrollo más utilizado en IBM i.

## 🆚 Copilot vs watsonx Code Assistant for i

Ahora, comparemos las capacidades de GitHub Copilot y watsonx Code Assistant for i:

| Característica                          | GitHub Copilot         | watsonx Code Assistant for i |
|----------------------------------------|-------------------------|-------------------------------|
| Reconocimiento de RPG Full Free        | ✅ Bastante bueno        | ✅ Especializado              |
| Soporte para SQLRPGLE                  | ✅ Funciona bien         | ✅ Modernización focalizada   |
| Entrenamiento específico para IBM i    | ❌ No                   | ✅ Sí                         |
| Modernización de código legacy         | ❌ General              | ✅ Especializado              |
| Generación de pruebas unitarias        | 🔸 Limitada             | ✅ Nativa (anunciada)         |
| Explicación de lógica empresarial RPG  | ❌ No                   | ✅ Prometido                  |

Si bien GitHub Copilot ha sido un gran aliado, **watsonx Code Assistant for i** promete llevar la experiencia de desarrollo en IBM i a un nuevo nivel, con un enfoque más profundo en las necesidades específicas de esta plataforma. Aunque Copilot ha demostrado ser un compañero valioso, la especialización de watsonx Code Assistant en el ecosistema IBM i podría marcar una diferencia significativa.


## 🧭 Reflexión final

GitHub Copilot se ganó nuestra confianza, es un gran aliado para los desarrolladores de IBM i y su capacidad de adaptarse a nuestras necesidades ha sido impresionante y su impacto en la productividad es innegable. Con esto Watsonx Code Assistant for i **tiene una vara alta que superar**, pero ya está mostrando señales claras de que puede hacerlo, y si cumple lo prometido, será un punto de inflexión para IBM i.
Con los diferentes asistentes inteligentes que están surgiendo, como watsonx Code Assistant for i o GitHub Copilot, estamos ante una nueva era de desarrollo en IBM i, donde la inteligencia artificial no solo nos acompaña, sino que también nos entiende y potencia nuestras capacidades, permitiéndonos enfocarnos en lo que realmente importa: **resolver problemas y crear valor para nuestros usuarios**, pero es muy importante recordar que la IA no reemplaza al desarrollador, sino que lo potencia. Debemos **seguir siendo críticos y cuidadosos** con las sugerencias que recibimos, validando siempre su pertinencia y calidad, asegurándonos de que se alineen con nuestras necesidades y estándares de calidad, esto es clave para hacer un uso responsable y efectivo de estas herramientas, garantizando que la inteligencia artificial sea un aliado en nuestro camino hacia la modernización y mejora continua de nuestros sistemas.