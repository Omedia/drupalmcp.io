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
