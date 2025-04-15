---
title: What is MCP?
description: Introduction to the Model Context Protocol
---

The **[Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction)** is an open-source protocol introduced by [Anthropic](https://www.anthropic.com/) and now supported by [OpenAI](https://openai.com/) and [Google](https://www.google.com/). MCP is designed to establish a standard that enables large language model (LLM) applications to extend their context dynamically using both local and remote data sources.

This protocol is especially valuable when building custom AI workflows that require awareness of specific dynamic contexts or when enhancing the functionality of LLM-based tools like chat applications (e.g., [Claude Desktop](https://www.anthropic.com/news/claude-desktop) or [ChatGPT](https://chatgpt.com/)) or development environments like [Cursor](https://www.cursor.com/), [Claude Code](https://www.anthropic.com/news/claude-code) or [Zed IDE](https://zed.dev/).

MCP is built around three core components: **hosts**, **clients**, and **servers**. Host is the LLM application itself (e.g., [Claude Desktop](https://www.anthropic.com/news/claude-desktop) or [ChatGPT](https://chatgpt.com/)). Client can be thought as software embedded within the host to facilitate communication with the server and the server - the component that provides additional context and tools to the LLM by adhering to the MCP standard.

The protocol defines four foundational elements: **Resources**, **Prompts**, **Tools**, and **Sampling**.

Resources expose data to the LLM, making it accessible as part of its extended context. According to the MCP documentation, "Resources are a core primitive… that allow servers to expose data and content that can be read by clients and used as context for LLM interactions."

Examples of resources include files, database records, API responses and others.

Prompts allow servers to define templates with dynamic arguments, chaining, and other advanced features, enabling standardized and reusable interactions with LLMs.

Tools represent functions on the server that can be invoked by the LLM to perform actions, such as database queries or API calls, enhancing the LLM’s ability to interact with external systems.

Sampling involves requesting autocompletions or predictions from LLMs. Although not yet implemented (even in Claude), it offers a promising avenue for future capabilities.

Even with just this overview, the potential for building powerful solutions using this approach to extend LLM context is obvious. For more in-depth details, refer to the [official MCP documentation](https://modelcontextprotocol.io/introduction).

There are already [lots of MCP servers built](https://github.com/modelcontextprotocol/servers) for various platforms, including our [mcp-server-drupal](https://github.com/omedia/mcp-server-drupal) and [Drupal module for it](https://drupal.org/project/mcp).

Despite its recent introduction, MCP holds tremendous potential. All big players are already working on MCP support, and the protocol is open to all.

Here are some, limited examples of how MCP can be applied:

- **Connecting to a Local Database**: As described in the documentation, you can directly link Claude to an SQLite database and use its entire dataset as an extended context for queries and workflows.

- **Enhanced Customer Support**: AI chatbots could access real-time customer records to provide highly contextual responses.

- **Code Review Automation**: IDE tools could dynamically pull contextual project details from external repositories and databases.

- **Editorial Assistance**: MCP-enabled workflows could allow editorial teams to query content databases or invoke AI-powered editing tools.