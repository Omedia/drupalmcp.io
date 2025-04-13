---
title: Quick Setup
description: How to quickly set up the Drupal MCP module
---

# Quick Setup

Setting up the Drupal MCP module is straightforward and can be done in just a few steps.

## Installation

```bash
# Require the module using Composer
composer require 'drupal/mcp:^1.0@alpha'

# Enable the module (this can also be done via the UI)
drush en mcp
```

## Setup Options

There are two ways to use your Drupal with LLM clients using the MCP protocol:

### Option 1: Drupal Native (HTTP SSE)

The simplest approach is to let Drupal become the MCP server itself using HTTP Server-Sent Events (SSE). This works out of the box after you enable the module.

1. Enable the MCP module in Drupal
2. Configure your LLM client to connect to your Drupal site
3. Start using MCP functionality immediately

### Option 2: Third-Party MCP Server

Alternatively, you can use a third-party MCP server as an intermediary between your Drupal instance and the LLM client.

1. Download the TS-based Drupal MCP server binary (see STDIO Binary section)
2. Make the binary executable on your system
3. Configure your LLM software to use the MCP server

For example, for Claude desktop app, configure it in the configuration file:

```json
{
  "mcpServers": {
    "mcp-server-drupal": {
      "command": "full path to the executable",
      "args": ["--drupalBaseUrl", "your drupal website url"],
      "env": {}
    }
  }
}
```

4. Restart your Claude desktop app
5. You should now be able to access and use the MCP server 