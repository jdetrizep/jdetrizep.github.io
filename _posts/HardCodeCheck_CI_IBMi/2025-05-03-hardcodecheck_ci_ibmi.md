---
layout: post
title: Fortaleciendo la Integración Continua con Hard Code Check
date: 2025-05-26 08:00
modified: 2025-05-26 08:00
description: Hard Code Check for IBM i - Fortaleciendo la Integración Continua con prácticas modernas de calidad de código
tag:
  - IBM i
  - DevOps
  - Hard Code Check
  - CI/CD
  - Integración Continua
  - Calidad de Código
  - RPGLE
image: /HardCodeCheck_CI_IBMi/Portada_HardCodeCheck_final.png
coautor: " | Ramiro García Leandro"
---

# Hard Code Check for IBM i: Fortaleciendo la Integración Continua con prácticas modernas de calidad de código

En entornos empresariales donde IBM i sigue siendo una plataforma clave para los sistemas core, aplicar prácticas modernas como **DevOps** e **Integración Continua (CI)** puede parecer un reto, hasta ahora.

Hoy quiero hablarles de una extensión para **Visual Studio Code**, pensada especialmente para desarrolladores de IBM i:  
**Hard Code Check for IBM i**.

Esta herramienta se integra fácilmente a los flujos de trabajo modernos, ayudando a mantener la calidad del código desde el primer commit y facilitando la detección temprana de **malas prácticas**, como el uso de **constantes hardcodeadas**.

<figure>
<img src="./Uso_HardCodeCheck.png" alt="Desarrollador usando Hard Code Check en VS Code">
<figcaption>Fig 1. Uso de Hard Code Check for IBM i en VS Code.</figcaption>
</figure>

## ¿Qué problema resuelve?

En ambientes RPGLE, CL y SQLRPGLE, es muy común encontrar fragmentos de código con valores estáticos embebidos:

```rpgle
// Ejemplo en RPGLE
IF CUSTTYPE = 'GOLD';
   BONUS = 200;
ENDIF;
```

Este tipo de codificación limita la flexibilidad, dificulta la mantenibilidad y va en contra de los principios de configuración externa y reutilización.
Por ejemplo, si en el código se encuentra un valor como `200`, no queda claro a qué se refiere. ¿Es un monto? ¿Un porcentaje? ¿Un ID de cliente? Esto puede llevar a errores y malentendidos en el futuro.
Además, si en algún momento se necesita cambiar ese valor, el desarrollador debe buscar y reemplazar en múltiples lugares, lo que aumenta la posibilidad de errores.
Por otro lado, si el valor `GOLD` se encuentra en múltiples lugares del código, cambiarlo a `PLATINUM` puede ser una tarea monumental. Esto no solo afecta la calidad del código, sino que también incrementa la deuda técnica y el tiempo de mantenimiento.
Por lo tanto, es crucial evitar el uso de constantes hardcodeadas y optar por configuraciones externas o variables que puedan ser fácilmente modificadas sin necesidad de recompilar el código.

## ¿Cómo ayuda en DevOps e Integración Continua?

Esta extensión está diseñada para integrarse a tu flujo DevOps desde las etapas iniciales del ciclo de vida del software:

1. **Análisis automático en VS Code**  
   Al guardar un archivo o al correr un análisis, la extensión identifica constantes prohibidas o valores **hardcodeados** en el código fuente.

2. **Personalización de reglas**  
   Puedes definir una lista de valores que no deberían aparecer directamente en el código. Por ejemplo:

```json
{
    "allowedExtensions": [".rpg", ".rpgle", ".clp", ".clle", ".sqlrpgle", ".cmd", ".pf", ".lf", ".sql"],
    "rules": [
        {
            "name": "Monedas",
            "keywords": ["USD", "CRC", "EUR", "COL", "COR", "LPS", "QTZ"],
            "message": "Moneda encontrada",
            "help": "Evitar el uso de monedas fijas.",
            "severity": "error",
            "enabled": true  
        }
    ]
}
```

3. **Resultados inmediatos para feedback continuo**  
   Se genera un reporte directo en el editor de VS Code, permitiendo a los desarrolladores corregir antes de hacer *push* al repositorio.

4. **Integración con pipelines de CI**  
   Puedes incorporar el uso de esta herramienta en un pipeline de Azure DevOps o GitHub Actions, ejecutando validaciones estáticas antes de permitir un **merge** a rama principal.

## Beneficios clave

- **Mejor mantenimiento y menor deuda técnica**
- **Cumplimiento de estándares de codificación**
- **Prevención temprana de errores**
- **Integración fluida con herramientas DevOps**
- **Enfoque preventivo y no reactivo**

## ¿Quiénes deberían usarla?

- Equipos que mantienen sistemas en IBM i (RPGLE, CL, SQLRPGLE)
- Líderes técnicos que quieren gobernanza de código
- Organizaciones que están modernizando sus prácticas con DevOps
- QA y DevOps engineers que desean incluir validaciones en CI/CD
- Desarrolladores que buscan mejorar la calidad de su código y reducir la deuda técnica
- Líderes de proyectos que buscan asegurar la calidad del código desde el inicio

## ¿Dónde obtenerla?

La extensión está disponible en el [Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=crnova.apphardcode-check).
La instalación es sencilla y no requiere configuraciones complicadas. Solo necesitas tener Visual Studio Code y seguir las instrucciones de instalación.

Si estás dando el salto hacia DevOps con IBM i, este tipo de herramientas son fundamentales para cerrar la brecha entre las tecnologías tradicionales y las exigencias de entrega continua del software moderno.

**Hard Code Check for IBM i** no solo te ayuda a escribir mejor código, te ayuda a construir un futuro más limpio, sostenible y automatizado sobre tu plataforma IBM i.

## Conclusión
La calidad del código es un pilar fundamental en cualquier práctica de desarrollo moderno. Con herramientas como **Hard Code Check for IBM i**, puedes asegurarte de que tu código no solo cumpla con los estándares actuales, sino que también esté preparado para el futuro.
La integración de esta herramienta en tus flujos de trabajo de DevOps no solo mejora la calidad del código, sino que también reduce la deuda técnica y facilita el mantenimiento a largo plazo.
La extensión **Hard Code Check for IBM i** es una herramienta poderosa que puede ayudar a los desarrolladores a mantener la calidad del código y a prevenir errores antes de que se conviertan en problemas mayores. Con su integración en Visual Studio Code y su capacidad para personalizar reglas, esta herramienta es un recurso valioso para cualquier equipo que trabaje con IBM i.