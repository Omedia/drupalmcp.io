---
title: What is MCP?
description: Introduction to the Model Context Protocol
---

The **[Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction)** is an open-source protocol introduced by [Anthropic](https://www.anthropic.com/) and now supported by [OpenAI](https://openai.com/) and [Google](https://www.google.com/). It’s designed to establish a standard that enables large language model (LLM) applications to dynamically extend their context using both local and remote data sources.

MCP is especially useful when building custom AI workflows that need awareness of dynamic context, or when enhancing LLM-based tools like chat apps (e.g., [Claude Desktop](https://www.anthropic.com/news/claude-desktop), [ChatGPT](https://chatgpt.com/)) or development environments like [Cursor](https://www.cursor.com/), [Claude Code](https://www.anthropic.com/news/claude-code), or [Zed IDE](https://zed.dev/).

At its core, MCP revolves around three components: **hosts**, **clients**, and **servers**.  
The **host** is the LLM app itself (like Claude Desktop or ChatGPT).  
A **client** is embedded software within the host that facilitates communication with the server.  
The **server** provides additional context and tools to the LLM by following the MCP standard.

The protocol defines four foundational elements: **Resources**, **Prompts**, **Tools**, and **Sampling**:

- **Resources** expose data to the LLM, extending its context. As the MCP docs put it: “Resources are a core primitive… that allow servers to expose data and content that can be read by clients and used as context for LLM interactions.”  
  Examples include files, database records, API responses, and more.

- **Prompts** are server-defined templates with support for dynamic arguments, chaining, and reuse — useful for creating standardized interactions.

- **Tools** represent functions that the LLM can invoke — like running queries or calling external APIs — to interact with outside systems.

- **Sampling** involves generating completions or predictions from the LLM itself. This feature isn't implemented yet (not even in Claude), but it’s planned for future versions.

Even at a high level, it’s clear how powerful MCP can be for extending LLM context and functionality. For full technical details, refer to the [official MCP documentation](https://modelcontextprotocol.io/introduction).

There are already [many MCP servers available](https://github.com/modelcontextprotocol/servers), including our own [mcp-server-drupal](https://github.com/omedia/mcp-server-drupal) and the [Drupal module for it](https://drupal.org/project/mcp).

Although MCP is still relatively new, its potential is huge — and with major players already adopting it, the protocol is quickly gaining traction.

Here are just a few real-world examples of how MCP can be applied:

- **Connect to a Local Database**: As outlined in the docs, you can connect Claude directly to an SQLite database and use its content as live context for queries or workflows.

- **Smarter Customer Support**: AI chatbots can access real-time customer data to provide more accurate, contextual responses.

- **Automated Code Reviews**: IDEs can dynamically pull in project data from external repos and analyze it with LLMs.

- **Editorial Assistance**: Content teams can use MCP-connected workflows to query internal databases or invoke AI-powered editing tools.
