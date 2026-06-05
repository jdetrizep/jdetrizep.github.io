---
lang: en
layout: post
title: AI-First Development with IBM Bob Part II
date: 2026-04-13 05:00
modified: 2026-04-13 05:00
description: AI-First Development - Advanced techniques for working with Project Bob
permalink: /AI_First_Development_Bob2/
tag:
  - AI-First
  - Inteligencia Artificial
  - Desarrollo de Software
  - Desarrollo asistido por IA
  - Project BOB
image: /AI_First_Development_Bob/Blog2_AI_First_Development_Portada1.png
---

# Advanced techniques for working with Project Bob
In the previous article I talked about a central idea: **Project Bob should not be seen merely as a code generator, but as an agent capable of collaborating in the design, analysis, and implementation of software**. That shift in perspective is fundamental. Understanding Bob as a development agent opens the door to new ways of working where artificial intelligence stops being just a productivity tool and starts becoming a **technical collaborator within the development process**.

In this second article of the series we will explore **advanced techniques that allow you to truly get the most out of Project Bob**.

<figure>
<img src="./Blog2_AI_First_Development_Portada2.png" alt="Representation of Bob's tool ecosystem." loading="lazy" />
<figcaption>Fig 1. Bob's Tool Ecosystem.</figcaption>
</figure>

## 1. The most common mistake: using Bob as a simple prompt box
One of the most frequent mistakes when starting to work with AI tools is treating them as a simple text box where you write isolated instructions. This approach works, but it only takes advantage of a small part of the potential of tools and uses we have available with Project Bob.

Bob can:
- Read files.
- Modify code.
- Execute commands.
- Interact with external tools.
- Analyze the full context of the project.

When we understand this, the interaction with the tool changes completely.
Instead of asking for isolated code, we begin to ask the agent to:
- Analyze existing systems.
- Evaluate design decisions.
- Identify technical debt.
- Propose refactorings.
- Suggest architectural improvements.


## 2. Bob Rules: teaching Bob how your team works
One of the most powerful capabilities of Project Bob is the possibility of defining **engineering rules**. These rules allow you to establish standards that the agent must follow when working on a project. Instead of relying on repeated prompts, you can define guidelines such as:
- Naming conventions.
- Architecture standards.
- Security policies.
- Testing requirements.
- Documentation rules.

Example of a rules structure:
``` text
.bob/rules/
  01-general.md
  02-coding-style.md
  03-security.md
  04-testing.md
  05-architecture.md
```

These rules transform Bob from a generic tool into an agent aligned with the team's engineering discipline.


## 3. Global instructions vs project instructions
Project Bob lets you manage two types of instructions:

### Global instructions
They apply to all projects. Examples:
- Preference for clean code.
- Emphasis on security.
- Documentation style.
- Personal conventions.

### Project instructions
They apply only to the current workspace. Examples:
- Specific technology stack.
- Allowed libraries.
- Mandatory architecture.
- Repository naming rules.

Separating these levels allows you to maintain a consistent base while respecting the particularities of each project.


## 4. Custom Modes: creating specialized agents
Bob lets you create **custom modes**, which in practice means creating specialized agents for specific tasks. Examples:
-   Security Reviewer.
-   DevOps Engineer.
-   Documentation Writer.
-   Performance Analyst.

Conceptual example of a custom mode:

``` yaml
customModes:
  - slug: security-review
    name: Security Reviewer
    roleDefinition: You are a security specialist reviewing code for vulnerabilities
```

This allows the agent to adopt different roles depending on the type of task being performed.

<figure>
<img src="./Custom_Mode_Bob.png" alt="Custom Modes of Bob." loading="lazy" />
<figcaption>Fig 2. Custom Modes Bob.</figcaption>
</figure>

## 5. Enhance Prompt: improving the quality of requests
Many problems when working with AI do not come from the model's capability, but from the quality of the prompt. Project Bob includes a function called **Enhance Prompt**, which allows you to transform a simple instruction into a more structured request. For example:

Simple prompt:
``` text
Analiza este programa RPG
```

Enriched prompt:
- Program structure.
- File usage.
- Business logic.
- Embedded SQL.
- Error handling.
- Standards compliance.

This kind of expansion significantly improves the quality of the analysis.


## 6. Context Mentions and Tagging
Another fundamental technique is the use of **context mentions**, which allow you to add real project context to the conversation. This is achieved using the `@` symbol. Examples:
``` text
@/src/auth/login.ts
@problems
@terminal
```

This allows Bob to work with:
- Specific files.
- Project errors.
- Terminal output.
- Recent commits.

The result is a much more precise analysis.

<figure>
<img src="./Context_Metions_Tagging.png" alt="Context, Metions & Tagging" loading="lazy" />
<figcaption>Fig 3. Context, Metions & Tagging.</figcaption>
</figure>

## 7. Checkpoints: experimenting without risk
**Checkpoints** allow you to save the state of the workspace before making important changes. This enables an exploratory workflow:
1. Create checkpoint.
2. Experiment with changes.
3. Evaluate the result.
4. Restore if necessary.

This functionality is especially useful when performing:
- Large refactorings.
- Module reorganization.
- Architectural experiments.


## 8. Auto-Approve: productivity with responsibility
The **Auto-Approve** function allows Bob to perform actions without asking for confirmation every time. This can significantly accelerate the workflow. However, it must be used with care. Practical recommendation:
-   low risk → auto approve
-   medium risk → human review
-   high risk → mandatory confirmation


## 9. Literate Coding: writing intent inside the code
Literate Coding allows you to write instructions in natural language directly inside the source file. Example:
```Java
    // create a function that calculates the order total
    // apply volume discounts
```
Bob analyzes the file context and generates the corresponding implementation. This reduces friction between intent and code.


## 10. Security Scans
Project Bob also includes integrated security functions:
- Vulnerability Scan.
- Secrets Scan.

These tools allow you to detect:
- Exposed credentials.
- API keys.
- Tokens.
- Common vulnerabilities.

This introduces a **shift-left security** approach within development.


## 11. MCP: the point where Bob becomes a platform
The Model Context Protocol (MCP) allows Bob to connect with external tools. This enables integrations with:
- APIs.
- Databases.
- Internal tools.
- Legacy systems.

For example, an existing RPG program could be exposed as an MCP tool and consumed by the agent. This opens the door to **agentic** architectures where AI interacts directly with enterprise systems.


## Final reflection
When you observe all these capabilities together --- rules, custom modes, enriched prompts, checkpoints, literate coding, integrated security, and MCP --- it becomes clear that Project Bob is not simply a code assistant.

It is a **technical collaboration platform powered by artificial intelligence**. The difference is not only in generating code faster. The difference is in **how we begin to integrate intelligent agents within the real software development process**.


## Next article
In the third article of this series we will explore: **Project Bob, MCP, and the future of Agentic development**. We will see how agents can interact with tools, enterprise systems, and complete platforms to transform the way we build software.