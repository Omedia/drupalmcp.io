---
title: Introduction
description: Introduction to Drupal MCP
---

# Drupal as an MCP Server

Drupal is uniquely positioned to serve as a Model Context Protocol (MCP) server due to its robust content management capabilities and modular structure. Drupal's content can be exposed as **resources**, its built-in AI functionality can be leveraged as **tools**, and its extensibility enables creating highly customized workflows.

## What is MCP?

The **Model Context Protocol (MCP)** is an open-source protocol introduced by Anthropic, the company behind Claude. MCP establishes a standard that enables large language model (LLM) applications to extend their context dynamically using both local and remote data sources.

This protocol is especially valuable when building custom AI workflows that require awareness of specific dynamic contexts or when enhancing the functionality of LLM-based tools like chat applications (e.g., Claude) or development environments like Zed IDE.

## Core Components

MCP is built around three core components:

- **Hosts**: The LLM application itself (e.g., Claude)
- **Clients**: Software embedded within the host to facilitate communication with the server
- **Servers**: The component that provides additional context and tools to the LLM by adhering to the MCP standard

## Foundational Elements

The protocol defines four foundational elements:

1. **Resources**: Expose data to the LLM, making it accessible as part of its extended context
2. **Prompts**: Allow servers to define templates with dynamic arguments, chaining, and other advanced features
3. **Tools**: Represent functions on the server that can be invoked by the LLM to perform actions
4. **Sampling**: Involves requesting autocompletions or predictions from LLMs

## Potential Applications

Even in its current state, MCP is particularly useful for building custom AI workflows within organizations:

- **Content Management**: AI chatbots that can access your Drupal content and provide contextual responses
- **Editorial Assistance**: MCP-enabled workflows that allow editorial teams to query content databases
- **Enhanced Customer Support**: Access real-time customer records to provide highly contextual responses
- **Code Review Automation**: Dynamic pulling of contextual project details from external repositories 