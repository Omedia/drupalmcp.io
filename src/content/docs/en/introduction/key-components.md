---
title: Key Components
description: Understanding the core components of Drupal MCP setup
---

![MCP flow chart](/images/mcp-flow.svg)

The MCP protocol defines two transport methods for data exchange between client and server: **HTTP** and **STDIO**.

While HTTP is the most common and widely used method, STDIO is better suited for desktop LLM applications. For example, both Claude and Cursor use STDIO to communicate with MCP servers.

To turn your Drupal site into an MCP server, you need to support both transport layers — and the Drupal MCP module does exactly that.  
HTTP support comes naturally, since Drupal is already an HTTP-based system.  
For STDIO, however, we need a small middleware component that runs locally and handles communication via the STDIO protocol.

So, the full setup consists of three components:

1. [Drupal MCP Module (Server)](https://www.drupal.org/project/mcp)
2. [*Optional* STDIO Binary (Middleware)](https://github.com/Omedia/drupal-mcp-client)
3. LLM application (or any MCP client, including the [Drupal MCP Client](https://drupal.org/project/mcp_client))
