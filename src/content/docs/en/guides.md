---
title: Guides
description: Comprehensive guides for working with Drupal MCP
---

# Guides

This section provides comprehensive guides for setting up, configuring, and extending Drupal MCP for various use cases.

## Connecting Drupal MCP to LLM Clients

### Claude Desktop App

1. Install the Drupal MCP module (see Quick Setup)
2. Configure Claude to use your Drupal MCP server
3. Test the connection with a simple query

### Zed IDE

1. Install the Drupal MCP module (see Quick Setup)
2. Configure Zed IDE to use your Drupal MCP server
3. Test the connection with a simple code completion task

## Extending Drupal MCP

### Creating Custom Tools

Drupal MCP allows you to create custom tools that can be invoked by the LLM:

1. Define a new tool in your custom module
2. Register the tool with the MCP module
3. Test the tool with your LLM client

### Exposing Custom Resources

You can expose additional data from your Drupal site as MCP resources:

1. Define a new resource provider in your custom module
2. Configure the resource mapping
3. Test accessing the resource from your LLM client

## Integration with Other Drupal Modules

### JSON:API Integration

The Drupal MCP module can be used alongside the JSON:API module to provide enhanced content access:

1. Enable the JSON:API module
2. Configure JSON:API permissions
3. Use MCP tools to access JSON:API endpoints

### Content Moderation Workflows

Integrate MCP with Drupal's content moderation workflow:

1. Set up content moderation in Drupal
2. Configure MCP tools to access workflow states
3. Use LLM clients to query and modify content workflow states

## Advanced Configurations

### Authentication and Security

Properly secure your Drupal MCP server:

1. Set up authentication for MCP connections
2. Configure access restrictions for MCP tools
3. Audit and monitor MCP usage

### Performance Optimization

Optimize the performance of your Drupal MCP server:

1. Configure caching for MCP responses
2. Optimize database queries for MCP tools
3. Monitor and troubleshoot performance issues 