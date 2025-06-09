---
title: Setup & Configure
description: Installation and configuration instructions for MCP
---
This guide will walk you through setting up and configuring the MCP module for your Drupal site.

## Install a fresh Drupal CMS (optional)

If you don’t have an existing Drupal site, you can spin up a fresh one using DDEV.

Instructions below are from the [official Drupal CMS documentation](https://new.drupal.org/docs/drupal-cms/get-started/install-drupal-cms/install-drupal-cms-locally-with-ddev):

```bash
mkdir my-drupal-site && cd my-drupal-site
ddev config --project-type=drupal11 --docroot=web
ddev start
ddev composer create drupal/cms
```

## Install and enable the MCP module

```bash
ddev composer require 'drupal/mcp:^1.0'
ddev drush en mcp -y
```

## Enable plugins

The MCP module uses a plugin-based architecture that lets developers extend its functionality. The core module handles the MCP protocol itself and serves as a foundation, but the actual actions and resources exposed to the outside world are defined by plugins.


You can extend MCP functionality in several ways:
- Use the optional submodules included with MCP (described below)
- Install community-contributed plugins
- [Create your own custom plugin](/en/developers/create-plugin/)

### Optional submodules

MCP comes with two optional submodules that provide useful plugins:

- **[mcp_extra](/en/plugin-config/ai-plugins/)** - Exposes AI module function call actions, allowing MCP clients to leverage Drupal's AI capabilities
- **[mcp_dev_tools](/en/plugin-config/dev-tools/)** - Provides controlled access to Drush commands through the MCP interface

You can enable these submodules individually based on your needs:

```bash
# Enable AI agents functionality
ddev drush en mcp_extra

# Enable developer tools
ddev drush en mcp_dev_tools
```



> *Note: for `mcp_extra` to expose AI function actions, you’ll need to install and enable the Drupal [AI module](https://drupal.org/project/ai).*


## Configure

Once installed, you’ll find the MCP configuration form under Web Services at `/admin/config/mcp`.

Here you can:

- Enable authentication (token-based or credentials)
- Enable/disable above mentioned plugins
- Configure plugin settings individually
- Select which content types to expose (opt-in by default)
- Configure user permissions for MCP access

:::note[Security Configuration]
Starting with version 1.1, MCP includes enhanced security features:

- **Permissions**: Users must have the "Use MCP server" permission to access MCP
- **Content Types**: Content types are now opt-in by default for better security
- **Authentication**: Token authentication can be configured to use a specific user account instead of defaulting to UID 1
- **Command Restrictions**: The mcp_dev_tools module supports restricting allowed Drush commands
:::

![Configuration screen](/images/mcp-config.png)
