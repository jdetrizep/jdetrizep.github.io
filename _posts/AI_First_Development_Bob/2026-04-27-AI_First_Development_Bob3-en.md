---
lang: en
layout: post
title: AI-First Development with IBM Bob Part III
date: 2026-04-27 05:00
modified: 2026-04-27 05:00
description: AI-First Development - Project Bob, MCP and the future of Agentic development
permalink: /AI_First_Development_Bob3/
tag:
  - AI-First
  - Inteligencia Artificial
  - Desarrollo de Software
  - Desarrollo asistido por IA
  - Project BOB
image: /AI_First_Development_Bob/Blog3_AI_First_Development_Portada1.png
---

# Project Bob, MCP and the future of Agentic development

In recent years, development assistants have evolved from simple autocompletion tools into systems capable of generating complete code from natural language instructions.

However, the real change is not solely about generating code faster.

The most profound change occurs when artificial intelligence ceases to limit itself to code and begins to **interact with real tools, data, and systems within the enterprise environment**.

That is where concepts like **Model Context Protocol (MCP)** and **agentic** development come in.

<figure>
<img src="./Blog3_AI_First_Development_Portada2.png" alt="Bob and its Model Context Protocol (MCP)" loading="lazy" />
<figcaption>Fig 1. Bob and its Model Context Protocol (MCP).</figcaption>
</figure>

## From copilots to agents

The evolution of AI in development has gone through several stages:

### 1. Autocompletion
Tools that suggested code fragments and completed lines.

### 2. Copilots
Tools capable of generating complete functions, explaining code, and proposing refactorings.

### 3. Development agents
Systems that can:
- analyze complete repositories
- execute tools
- interact with APIs
- query databases
- automate workflows

This is where **Project Bob** appears.

<figure>
<img src="./Evolución_Desarrollo_Con_AI.png" alt="Evolution of development with AI" loading="lazy" />
<figcaption>Fig 1. Evolution of development with AI.</figcaption>
</figure>

## The problem of context

Language models can generate excellent code, but without access to the project's real environment their capacity remains limited. For example, they normally cannot:
- Query real data.
- Interact with internal systems.
- Discover existing functionalities.
- Execute tools from the enterprise ecosystem.

This is where **Model Context Protocol** appears.

## What is MCP?

The **Model Context Protocol (MCP)** is a standard that allows AI agents to interact with external tools. This enables access to capabilities such as:
- Enterprise APIs.
- Databases.
- Internal tools.
- Cloud services.
- Legacy systems.

MCP turns language models into **consumers of tools within a digital ecosystem**, which allows them to integrate into a digital ecosystem and access a wide variety of capabilities.


## MCP architecture

A typical architecture includes three main components:

### The agent
In this case **Project Bob**.

### The MCP server
Exposes tools that the agent can use.

### The tools
Represent concrete capabilities.

Example:
```
GET_CUSTOMER_PRICING  
GET_ORDER_HISTORY  
CALCULATE_DISCOUNT
```

Tools usually return information structured in JSON.


## MCP and legacy systems
One of the most interesting aspects of MCP is the integration with existing systems. Many organizations possess critical logic in:
- RPG.
- COBOL.
- Java legacy.
- PL/SQL.
- C#.
- IBM i.

Rewriting these systems is costly. With MCP we can **expose that logic as tools consumable by agents**.

For example:
```
GET_CUSTOMER_PRICING
```

This allows reusing existing enterprise logic within AI‑First architectures.


## Agentic architecture
When we combine agents with tools, an agentic architecture appears. Conceptually:

```
Developer
   │
   ▼
AI Agent (Project Bob)
   │
   ▼
MCP Layer
   │
   ├ API Tools
   ├ Database Tools
   ├ Legacy Tools
   ├ Cloud Services
   │
   ▼
Enterprise Systems
```

These systems can include:
- IBM i
- databases
- APIs
- cloud services
- internal platforms


## What changes for developers
The developer's role evolves.
Before:
- Writing code.
- Creating services.
- Integrating APIs.

Now:
- Designing tools.
- Defining reusable capabilities.
- Governing interactions between agents.
- Building intelligent automation ecosystems.


## AI‑First Development in action
Project Bob allows:
- Analyzing systems.
- Generating code.
- Applying engineering rules.
- Collaborating on technical design.

MCP allows:
- Connecting AI with real tools.
- Integrating enterprise systems.
- Creating agentic architectures.

The combination of both enables **AI‑First Development in real enterprise environments**.


## Final reflection

The future of development will probably not be defined only by languages or frameworks. It will be defined by **how developers, agents, and tools interact within the same ecosystem**. Project Bob represents a clear signal of that direction. Not because it writes code automatically. But because it forces us to start thinking about software development in a different way.

> **It is not just about modernizing the code. It is about modernizing the way we think and work.**
