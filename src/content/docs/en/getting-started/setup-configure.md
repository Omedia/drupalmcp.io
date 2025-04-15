---
title: Setup & Configure
description: Installation and configuration instructions for MCP
---

This guide will walk you through the process of setting up and configuring MCP module for your Drupal site.

#### 1. Install the Drupal MCP Module

Use Composer to install the MCP module:

```bash
composer require 'drupal/mcp:^1.0'
```

#### 2. Enable the Module

Enable the MCP module through Drupal's admin interface or using Drush:

```bash
drush en mcp -y
```

#### 3. Install the STDIO Binary

The STDIO binary can be installed in two ways:

#### Option A: Using Composer

```bash
composer require drupal/mcp-stdio
```

#### Option B: Manual Download

1. Download the latest release from the [MCP STDIO GitHub repository](https://github.com/Omedia/mcp-server-drupal/releases)
2. Extract the binary to a location accessible to your AI assistant
3. Make the binary executable: `chmod +x mcp-stdio`

## Configuration

### 1. Access the MCP Configuration Page

Navigate to **Administration > Configuration > System > MCP Settings** in your Drupal admin panel.

### 2. Configure Basic Settings

- **Enable MCP**: Toggle to activate MCP functionality
- **Authentication Method**: Choose between user tokens or API keys
- **Logging Level**: Set the desired level of logging detail
- **Command Timeout**: Set the maximum execution time for commands

### 3. Permission Setup

1. Go to **Administration > People > Permissions**
2. Under the **MCP** section, configure permissions for:
   - **Administer MCP**: Full administrative access
   - **Use MCP**: Basic ability to interact with MCP
   - **Execute commands**: Permission to run various command groups

### 4. Configure Command Access

1. Return to the MCP Settings page
2. Navigate to the **Commands** tab
3. Enable/disable specific commands or command groups
4. Configure access requirements for sensitive commands

### 5. Verify Installation

Run a test command to verify that MCP is functioning:

```bash
./mcp-stdio --test-connection
```

You should see a success message if everything is working correctly.

## Advanced Configuration

### Environment Variables

You can configure MCP using environment variables:

- `MCP_DRUPAL_BASE_URL`: Base URL of your Drupal site
- `MCP_AUTH_TOKEN`: Authentication token (if using token-based auth)
- `MCP_DEBUG`: Enable debug mode (true/false)
- `MCP_LOG_PATH`: Path for log files

### Custom Command Registration

To register custom commands, create a module that implements `hook_mcp_commands`:

```php
function mymodule_mcp_commands() {
  return [
    'my_custom_command' => [
      'callback' => 'mymodule_custom_command_callback',
      'description' => 'My custom command description',
      'parameters' => [
        // Parameter definitions
      ],
    ],
  ];
}
```

See the [Developer Documentation](/en/developers/create-plugin/) for more details on creating custom commands.

## Next Steps

- [Configure your AI assistant](/en/getting-started/integration-guides/) to use MCP
- Learn about [troubleshooting common issues](/en/getting-started/troubleshooting/)
- Explore the [available commands and functionality](/en/developers/concepts-architecture/) 