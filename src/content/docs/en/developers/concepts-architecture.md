---
title: Concepts & Architecture
description: Technical overview of the MCP architecture and design concepts
---
### MCP JSON-RPC Implementation

The MCP module leverages Drupal's JSON-RPC module to implement the Model Context Protocol's communication layer. This document details how MCP extends and customizes the JSON-RPC functionality to support the MCP protocol requirements.

### JSON-RPC Customization

### 1. Override of JsonRpcMethodManager

The MCP module extends the core JSON-RPC functionality by creating a custom method manager:

See: `src/Plugin/McpJsonRpcMethodManager.php`

Key customizations:

- Uses a custom cache bin
- Sets a custom plugin discovery subdirectory

This customized manager is responsible for discovering and loading MCP-specific JSON-RPC method plugins located in the `Plugin/McpJsonRpc` directory.

### 2. Integration with Drupal's JSON-RPC Handler

The MCP module injects its custom JSON-RPC method manager into a dedicated JSON-RPC handler through service definitions:

See: `mcp.services.yml`

This configuration:

1. Defines a custom plugin manager service (`plugin.manager.mcp_jsonrpc_method`)
2. Creates a dedicated JSON-RPC handler service (`mcp.jsonrpc.handler`) that uses the custom plugin manager
3. Ensures that the standard Drupal JSON-RPC error handler is still used

By creating a separate handler instance, MCP avoids interfering with any other JSON-RPC functionality in the Drupal site while still leveraging the core handler implementation.

### 3. McpController Implementation

The MCP controller class extends Drupal's JSON-RPC `HttpController` and injects the custom handler:

See: `src/Controller/McpController.php`

Key aspects:

- Overrides the `create()` method to inject the custom handler
- Implements a `post()` method to handle all MCP requests
- Adds error handling specific to MCP operations
- Returns JSON-RPC formatted responses

The controller is registered in the routing system through:

See: `mcp.routing.yml`

This creates a dedicated endpoint (`/mcp/post`) that accepts both POST and GET requests and uses the MCP authentication provider.

### 4. MCP JSON-RPC Method Plugins

The MCP module implements the Model Context Protocol through a set of JSON-RPC method plugins located in the `Plugin/McpJsonRpc` directory:

```
Plugin/McpJsonRpc/
  ├── Initialize.php
  ├── ResourcesList.php
  ├── ResourceTemplatesList.php
  ├── ResourcesRead.php
  ├── ToolsCall.php
  └── ToolsList.php
```

Each plugin implements a specific MCP protocol endpoint:

### Base Class: McpJsonRpcMethodBase

MCP provides a base class for all its JSON-RPC methods:

See: `src/Plugin/McpJsonRpcMethodBase.php`

This base class:

- Extends the core JSON-RPC method base class
- Injects the MCP plugin manager into all method implementations
- Provides common functionality for all MCP JSON-RPC methods

Example: Initialize Method

The `Initialize` method is a key part of the MCP protocol:

See: `src/Plugin/McpJsonRpc/Initialize.php`

The method:

- Is registered with the ID "initialize"
- Implements the `execute()` method to handle client initialization requests
- Defines an output schema that conforms to the MCP protocol
- Returns server capabilities and protocol information

### Method Implementation Pattern

All MCP JSON-RPC methods follow a similar pattern:

1. Define the method using the `@JsonRpcMethod` annotation
2. Implement the `execute()` method to handle the specific protocol functionality
3. Define an `outputSchema()` method to specify the response format
4. Often interact with MCP plugins to fulfill the request

## JSON-RPC Communication Flow

The complete flow of an MCP request through the JSON-RPC layer is as follows:

1. **Client Request**: Client sends a JSON-RPC formatted request to `/mcp/post`
2. **Routing**: Drupal routes the request to `McpController::post()`
3. **Authentication**: If enabled, the request is authenticated using the MCP authentication provider
4. **Handler Processing**:
    - The controller passes the request to the custom JSON-RPC handler
    - The handler parses the request to identify the method being called
    - The `McpJsonRpcMethodManager` loads the appropriate method plugin
5. **Method Execution**:
    - The method plugin's `execute()` method is called with the request parameters
    - For resource or tool operations, the method interacts with appropriate MCP plugins
6. **Response Formatting**:
    - The method result is formatted according to the JSON-RPC specification
    - The handler adds any necessary metadata
7. **Response Delivery**: The formatted response is returned to the client

## Extending MCP JSON-RPC

To add new MCP protocol functionality:

1. Create a new class in the `Plugin/McpJsonRpc` directory
2. Extend either `JsonRpcMethodBase` or `McpJsonRpcMethodBase`
3. Use the `@JsonRpcMethod` annotation to define the method ID and parameters
4. Implement the `execute()` and `outputSchema()` methods
5. Register any required dependencies through dependency injection

Example of a custom method implementation:

See: `src/Plugin/McpJsonRpc/` (directory for implementation examples)

# MCP Authentication System

## Overview

The MCP module implements a flexible, multi-strategy authentication system to secure communication between MCP clients and the Drupal server. This system provides options for both token-based and basic authentication while integrating with Drupal's existing authentication framework.

## Authentication Components

### 1. Authentication Provider

The core component of the authentication system is the MCP Authentication Provider:

See: `src/Authentication/Provider/McpAuthProvider.php`

This provider implements Drupal's `AuthenticationProviderInterface` and handles:

- Verifying authentication credentials
- Integrating with Drupal's flood control system
- Loading appropriate user accounts
- Making access decisions

### 2. Authentication Configuration

Authentication settings are managed through the module's configuration system:

See: `src/Config/McpSettings.php`

This configuration service:

- Provides methods to check if authentication is enabled
- Retrieves authentication settings from the configuration system
- Manages token keys through integration with the Key module
- Offers a unified interface for authentication checks

### 3. Authentication Modes

### Token-Based Authentication

Token-based authentication provides a simple, API key-like mechanism for MCP clients:

- Uses a shared secret token stored via Drupal's Key module
- Authenticates as the site's administrator account (UID 1)
- Intended for trusted server-to-server communication
- Offers high-privilege access with minimal setup complexity

Token authentication is particularly useful for integration with local desktop applications or trusted services.

### Basic Authentication

Basic authentication uses standard HTTP Basic Auth credentials:

- Authenticates using Drupal username and password credentials
- Loads the authenticated user with appropriate permissions
- Respects Drupal's user role permissions system
- Provides a way to limit access according to existing user privileges

This authentication method is well-suited for web clients and environments where different users need different levels of access.

## Security Considerations

The MCP authentication system implements several security best practices:

### Flood Protection

The system leverages Drupal's flood control to prevent brute force attacks:

- IP-based limits to prevent mass authentication attempts
- User-specific limits to prevent targeting specific accounts
- Separate tracking for token authentication attempts

### Secret Management

Token authentication relies on the Key module for secure secret storage:

- Tokens can be stored using any Key module provider
- Supports encryption and secure backend integration
- Allows key rotation and management through the Key module's interface

### Principle of Least Privilege

The system is designed to encourage appropriate privilege levels:

- Token authentication clearly indicated as high-privilege
- Basic authentication tied to Drupal's permission system
- Configuration settings to enable/disable specific authentication methods