---
title: Drupal MCP Server
description: Details about using Drupal as an MCP server
---

# Drupal MCP Server

Drupal can function as a complete MCP server out of the box when the MCP module is installed and enabled.

## Architecture

The Drupal MCP server implements the MCP protocol, allowing it to communicate directly with LLM clients. The architecture consists of:

- **MCP Protocol Handler**: Manages the protocol-level communication
- **Resource Providers**: Expose Drupal content as resources
- **Tool Implementations**: Provide actions that can be invoked by LLMs
- **Configuration System**: Allows customization of MCP behavior

## Native Mode

In native mode, Drupal itself acts as the MCP server, communicating directly with LLM clients using HTTP Server-Sent Events (SSE).

### Benefits

- No additional software required
- Direct integration with Drupal's content and permission systems
- Lower latency for content-related operations
- Simplified deployment and maintenance

### Configuration

The native mode is enabled by default when the MCP module is installed. You can configure aspects of the server in the Drupal admin interface:

1. Navigate to Configuration > System > MCP Server
2. Adjust settings for resource exposure, tool permissions, and connection parameters

## Available Resources

The Drupal MCP server exposes several resources by default:

- **Content Entities**: Access to nodes, users, comments, etc.
- **Configuration Entities**: Access to site configuration
- **Files**: Access to managed files
- **Media**: Access to media entities
- **Taxonomy**: Access to taxonomy terms and vocabularies

## Available Tools

The following tools are available out of the box:

- **Content Search**: Search for content using various criteria
- **User Management**: Create, read, update, and delete users
- **Content Management**: Create, read, update, and delete content
- **Drupal Commands**: Execute Drush commands
- **System Information**: Get information about the Drupal installation

## Extending

You can extend the Drupal MCP server by:

1. Creating custom modules that implement the MCP interfaces
2. Registering additional resources or tools
3. Customizing the behavior of existing resources and tools

See the "Guides" section for detailed instructions on extending the server functionality. 