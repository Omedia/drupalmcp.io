---
title: Roadmap
description: Future features and enhancements planned for Drupal MCP
---

The Drupal MCP project is continuously evolving to provide better integration between Drupal and AI applications. This roadmap outlines the key features we're planning to implement, aligned with the MCP specification standards.

## 1. Native MCP Authorization

### What is it?
Native MCP authorization will implement the standard OAuth 2.1-based authentication protocol defined in the MCP specification, replacing our current custom authentication implementation.

### Impact
This will allow MCP clients to authenticate with Drupal sites using familiar OAuth flows, similar to "Sign in with Google" experiences, while maintaining Drupal's robust permission system.

## 2. Streaming Support

### What is it?
Full streaming support will enable Server-Sent Events (SSE) in the HTTP transport, allowing real-time, bidirectional communication between Drupal and MCP clients.

## 3. Prompts System

### What is it?
The prompts system will allow Drupal to expose structured, reusable templates for common tasks, making it easier for AI assistants to help with complex Drupal operations.

## Contributing

We welcome contributions to help implement these features! Whether you're interested in:
- OAuth implementation
- Real-time streaming
- Prompt design
- Testing and documentation

Visit our [Contributing Guide](/en/developers/contributing/) to get started.

## Stay Updated

Follow the project's progress:
- [Project Page](https://www.drupal.org/project/mcp)
- [Issue Queue](https://www.drupal.org/project/issues/mcp)