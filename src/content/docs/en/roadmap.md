---
title: Roadmap
description: Future features and enhancements planned for Drupal MCP
---

This roadmap outlines our vision for the Drupal MCP module. We're committed to building a robust, secure, and developer-friendly integration between Drupal and AI applications.

## Foundation (Delivered)

The following foundational features have been implemented and are available in the current release:

<div style="border: 2px solid #10b981; background-color: #d1fae5; padding: 1rem; margin-bottom: 1rem; border-radius: 0.5rem;">

### Foundation
**Status:** Completed

- **MCP Protocol Layer** - Full implementation of the Model Context Protocol specification for Drupal, enabling standardized communication between Drupal and AI applications
- **Plugin System for Tools and Resources** - Extensible plugin architecture allowing developers to create custom tools and expose specific resources through the MCP interface
- **STDIO Transport Layer** - Standard Input/Output transport implementation with Docker, binary, and JSR package distributions for local development and air-gapped environments
- **Basic Version of HTTP Transport** - HTTP POST endpoint implementation enabling direct communication with Drupal sites, laying groundwork for future streaming capabilities
- **Foundational Security** - Role-based access control with "Use MCP server" permission, secure credential handling, and configurable content exposure settings
- **Submodules for AI Agents and Drush** - Two optional submodules: mcp_extra for AI agent integration and mcp_dev_tools for controlled Drush command execution through MCP
- **Token Authentication** - Secure token-based authentication system integrated with Drupal's Key module for production-ready deployments
- **Configuration UI** - Administrative interface at /admin/config/mcp for managing authentication, plugins, and module settings through Drupal's familiar UI

</div>

## Upcoming Features

Below are the topics we plan to deliver up next:

<div style="border: 2px solid #f59e0b; background-color: #fef3c7; padding: 1rem; margin-bottom: 1rem; border-radius: 0.5rem;">

### Native MCP Authorization
**Status:** In progress

Implement OAuth 2.1-based authentication as defined in the MCP specification, providing:
- Seamless authentication flow similar to "Sign in with Google"
- Token-based access with proper scope management
- Integration with Drupal's permission system
- Secure credential handling for production environments

</div>

<div style="border: 2px solid #f59e0b; background-color: #fef3c7; padding: 1rem; margin-bottom: 1rem; border-radius: 0.5rem;">

### Streaming Support (SSE)
**Status:** In progress

Enable Server-Sent Events for real-time communication:
- Implement SSE in HTTP transport layer
- Support for long-running operations
- Real-time progress updates for content generation
- Efficient handling of large data transfers

</div>

<div style="border: 2px solid #e5e7eb; background-color: #f9fafb; padding: 1rem; margin-bottom: 1rem; border-radius: 0.5rem;">

### Prompts System
**Status:** Not started

Create reusable prompt templates for common Drupal tasks:
- Content creation wizards
- Site configuration templates
- Workflow automation prompts
- Custom prompt creation API for developers

</div>

<div style="border: 2px solid #e5e7eb; background-color: #f9fafb; padding: 1rem; margin-bottom: 1rem; border-radius: 0.5rem;">

### Plugin Ecosystem Expansion
**Status:** Not started

Expand the available plugins and improve developer tools:
- Enhanced ECA (Event-Condition-Action) integration
- Advanced content migration tools
- Media management capabilities
- Commerce and payment integrations

</div>

<div style="border: 2px solid #e5e7eb; background-color: #f9fafb; padding: 1rem; margin-bottom: 1rem; border-radius: 0.5rem;">

### Performance Optimizations
**Status:** Not started

- Caching strategies for MCP responses
- Batch operation support
- Resource usage monitoring

</div>

<div style="border: 2px solid #e5e7eb; background-color: #f9fafb; padding: 1rem; margin-bottom: 1rem; border-radius: 0.5rem;">

### Analytics & Monitoring
**Status:** Not started

- Usage statistics and insights
- Performance metrics dashboard
- Error tracking and debugging tools

</div>

---

*Last updated: January 2025*