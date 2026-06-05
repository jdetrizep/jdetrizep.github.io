---
lang: en
layout: post
title: Strengthening Continuous Integration with Hard Code Check
date: 2025-05-26 08:00
modified: 2025-05-26 08:00
description: Hard Code Check for IBM i - Strengthening Continuous Integration with modern code-quality practices
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
permalink: /hardcodecheck_ci_ibmi/
---

# Hard Code Check for IBM i: Strengthening Continuous Integration with modern code-quality practices

In enterprise environments where IBM i is still a key platform for core systems, applying modern practices such as **DevOps** and **Continuous Integration (CI)** may seem like a challenge, until now.

Today I want to tell you about an extension for **Visual Studio Code**, designed especially for IBM i developers:  
**Hard Code Check for IBM i**.

This tool integrates easily into modern workflows, helping maintain code quality from the very first commit and making early detection of **bad practices** easier, such as the use of **hardcoded constants**.

<figure>
<img src="./Uso_HardCodeCheck.png" alt="Developer using Hard Code Check in VS Code">
<figcaption>Fig 1. Using Hard Code Check for IBM i in VS Code.</figcaption>
</figure>

## What problem does it solve?

In RPGLE, CL, and SQLRPGLE environments, it is very common to find code fragments with embedded static values:

```rpgle
// Ejemplo en RPGLE
IF CUSTTYPE = 'GOLD';
   BONUS = 200;
ENDIF;
```

This type of coding limits flexibility, makes maintainability harder, and goes against the principles of external configuration and reuse.
For example, if a value like `200` is found in the code, it is not clear what it refers to. Is it an amount? A percentage? A customer ID? This can lead to errors and misunderstandings in the future.
In addition, if at some point that value needs to be changed, the developer has to search and replace it in multiple places, which increases the chance of errors.
On the other hand, if the value `GOLD` is found in multiple places in the code, changing it to `PLATINUM` can be a monumental task. This not only affects code quality, but also increases technical debt and maintenance time.
Therefore, it is crucial to avoid the use of hardcoded constants and opt for external configurations or variables that can be easily modified without needing to recompile the code.

## How does it help in DevOps and Continuous Integration?

This extension is designed to integrate into your DevOps flow from the early stages of the software lifecycle:

1. **Automatic analysis in VS Code**  
   When saving a file or running an analysis, the extension identifies prohibited constants or **hardcoded** values in the source code.

2. **Rule customization**  
   You can define a list of values that should not appear directly in the code. For example:

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

3. **Immediate results for continuous feedback**  
   A report is generated directly in the VS Code editor, allowing developers to fix issues before doing a *push* to the repository.

4. **Integration with CI pipelines**  
   You can incorporate the use of this tool into an Azure DevOps or GitHub Actions pipeline, running static validations before allowing a **merge** to the main branch.

## Key benefits

- **Better maintenance and lower technical debt**
- **Compliance with coding standards**
- **Early error prevention**
- **Smooth integration with DevOps tools**
- **A preventive rather than reactive approach**

## Who should use it?

- Teams that maintain systems on IBM i (RPGLE, CL, SQLRPGLE)
- Technical leads who want code governance
- Organizations that are modernizing their practices with DevOps
- QA and DevOps engineers who want to include validations in CI/CD
- Developers who seek to improve the quality of their code and reduce technical debt
- Project leads who seek to ensure code quality from the start

## Where to get it?

The extension is available on the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=crnova.apphardcode-check).
Installation is simple and does not require complicated configurations. You just need to have Visual Studio Code and follow the installation instructions.

If you are making the leap to DevOps with IBM i, this type of tool is fundamental to closing the gap between traditional technologies and the continuous-delivery demands of modern software.

**Hard Code Check for IBM i** not only helps you write better code, it helps you build a cleaner, more sustainable, and automated future on your IBM i platform.

## Conclusion
Code quality is a fundamental pillar in any modern development practice. With tools like **Hard Code Check for IBM i**, you can make sure that your code not only meets current standards, but is also prepared for the future.
Integrating this tool into your DevOps workflows not only improves code quality, but also reduces technical debt and makes long-term maintenance easier.
The **Hard Code Check for IBM i** extension is a powerful tool that can help developers maintain code quality and prevent errors before they become bigger problems. With its integration into Visual Studio Code and its ability to customize rules, this tool is a valuable resource for any team working with IBM i.
