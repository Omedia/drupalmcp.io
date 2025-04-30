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

The MCP module uses a plugin-based architecture that lets developers extend its functionality. The core module handles the MCP protocol itself and serves as a foundation, but the actual actions and resources exposed to the outside world are defined by plugins. You can also [create your own custom plugin](/en/developers/create-plugin/).

MCP comes with two optional submodules that provide useful plugins:

- `mcp_extra` — exposes AI module function call actions (see [AI Plugins Configuration](/en/plugin-config/ai-plugins/))
- `mcp_dev_tools` — allows access to Drush from LLMs

Enabling both is highly recommended for getting the most out of MCP.

> *Note: for `mcp_extra` to expose AI function actions, you’ll need to install and enable the Drupal [AI module](https://drupal.org/project/ai).*

```bash
ddev drush en mcp_extra
ddev drush en mcp_dev_tools
```

## Configure

Once installed, you’ll find the MCP configuration form under Web Services at `/admin/config/mcp`.

Here you can:

- Enable authentication (token-based or credentials)
- Enable/disable above mentioned plugins
- Configure plugin settings individually

![Configuration screen](/images/mcp-config.png)
