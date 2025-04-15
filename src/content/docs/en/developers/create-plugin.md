---
title: Create your Plugin
description: Guide to developing custom MCP plugins for Drupal
---

The Model Context Protocol (MCP) module supports a plugin-based architecture that allows developers to extend its functionality. This guide will walk you through the process of creating custom MCP plugins for your Drupal site.

## What is an MCP Plugin?

MCP plugins are PHP classes that implement specific features following the Model Context Protocol. These plugins allow you to:

- Expose **Resources**: Content entities, configuration, or any other data as MCP resources
- Provide **Tools**: Functions that can be called by MCP clients (like Claude)
- Define **Resource Templates**: Templates for structured resource access

## Plugin Structure Overview

An MCP plugin consists of:

1. A PHP class implementing `McpInterface` (typically extending `McpPluginBase`)
2. Plugin metadata using the `#[Mcp]` attribute
3. Optional configuration form

## Creating a Basic Plugin

### Step 1: Create the Plugin Class File

Create a new PHP file in your module's `src/Plugin/Mcp` directory. For example:

```php
<?php

namespace Drupal\my_module\Plugin\Mcp;

use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\mcp\Attribute\Mcp;
use Drupal\mcp\Plugin\McpPluginBase;
use Drupal\mcp\ServerFeatures\Tool;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Plugin implementation for MCP that demonstrates basic functionality.
 */
#[Mcp(
  id: 'my_plugin',
  name: new TranslatableMarkup('My Plugin'),
  description: new TranslatableMarkup('Provides custom MCP functionality.'),
)]
class MyPlugin extends McpPluginBase implements ContainerFactoryPluginInterface {
		// Plugin implementation goes here...
}
```

### Step 2: Implement Required Services

If your plugin needs Drupal services, inject them using the static `create()` method:

```php
/**
 * The configuration factory.
 *
 * @var \Drupal\Core\Config\ConfigFactoryInterface
 */
protected $configFactory;

/**
 * {@inheritDoc}
 */
public static function create(
  ContainerInterface $container,
  array $configuration,
  $plugin_id,
  $plugin_definition,
) {
  $instance = parent::create(
    $container,
    $configuration,
    $plugin_id,
    $plugin_definition,
  );

  $instance->configFactory = $container->get('config.factory');

  return $instance;
}
```

### Step 3: Implementing Features

### Adding Tools

Tools are functions that MCP clients can call. Implement the `getTools()` method to define available tools:

```php
/**
 * {@inheritdoc}
 */
public function getTools(): array {
  $tools = [];

  $tools[] = new Tool(
    name: 'hello-world',
    description: 'A simple hello world tool that demonstrates functionality.',
    inputSchema: [
      'type'       => 'object',
      'properties' => [
        'name' => [
          'type' => 'string',
          'description' => 'Name to greet',
        ],
      ],
      'required' => ['name'],
    ],
  );

  return $tools;
}
```

### Executing Tools

Implement the `executeTool()` method to handle tool execution:

```php
/**
 * {@inheritdoc}
 */
public function executeTool(string $toolId, mixed $arguments): array {
  if ($toolId === md5('hello-world')) {
    $name = $arguments['name'] ?? 'World';
    return [
      [
        "type" => "text",
        "text" => "Hello, $name!",
      ],
    ];
  }

  throw new \InvalidArgumentException('Tool not found');
}
```

**Note**: The `toolId` parameter will be the MD5 hash of the tool name. You need to compare it to the MD5 hash of your tool's name.

### Adding Resources

Implement the `getResources()` method to expose data as resources:

```php
/**
 * {@inheritdoc}
 */
public function getResources(): array {
  $resources = [];
  $resources[] = new Resource(
    uri: 'example',
    name: 'Example Resource',
    description: 'An example resource that demonstrates functionality.',
    mimeType: 'application/json',
    text: json_encode([
      'message' => 'This is an example resource',
      'timestamp' => \Drupal::time()->getRequestTime(),
    ]),
  );

  return $resources;
}
```

### Reading Resources

Implement the `readResource()` method to handle resource requests:

```php
/**
 * {@inheritdoc}
 */
public function readResource(string $resourceId): array {
  if ($resourceId === 'example') {
    return [
      new Resource(
        uri: 'example',
        name: 'Example Resource',
        description: 'An example resource that demonstrates functionality.',
        mimeType: 'application/json',
        text: json_encode([
          'message' => 'This is an example resource',
          'timestamp' => \Drupal::time()->getRequestTime(),
        ]),
      ),
    ];
  }

  if (str_starts_with($resourceId, 'dynamic/')) {
    $id = substr($resourceId, 8);
    return [
      new Resource(
        uri: $resourceId,
        name: "Dynamic Resource $id",
        description: "Dynamically generated resource with ID $id",
        mimeType: 'application/json',
        text: json_encode([
          'id' => $id,
          'generated' => \Drupal::time()->getRequestTime(),
        ]),
      ),
    ];
  }

  throw new \InvalidArgumentException("Unknown resource: $resourceId");
}
```

### Adding Resource Templates

Implement the `getResourceTemplates()` method to define URI templates:

```php
/**
 * {@inheritdoc}
 */
public function getResourceTemplates(): array {
  return [
    new ResourceTemplate(
      uriTemplate: 'dynamic/{id}',
      name: 'Dynamic Resource',
      description: 'A template for dynamic resources',
      mimeType: 'application/json',
    ),
  ];
}
```

### Step 4: Adding Plugin Configuration

To make your plugin configurable, implement these methods:

```php
/**
 * {@inheritdoc}
 */
public function defaultConfiguration(): array {
  return [
    'enabled' => TRUE,
    'config' => [
      'some_setting' => 'default_value',
    ],
  ];
}

/**
 * {@inheritdoc}
 */
public function buildConfigurationForm(
  array $form,
  FormStateInterface $form_state,
): array {
  $config = $this->getConfiguration();

  $form['some_setting'] = [
    '#type' => 'textfield',
    '#title' => $this->t('Some Setting'),
    '#description' => $this->t('Description of the setting'),
    '#default_value' => $config['config']['some_setting'] ?? '',
  ];

  return $form;
}
```

## Important Considerations

### Tool IDs

When the MCP module exposes tools to clients, it prefixes the tool name with the plugin ID and uses MD5 hash for security. In your `executeTool()` method, compare the incoming ID with the MD5 hash of your tool name.

### Resource URIs

Resource URIs are prefixed with your plugin ID when exposed to clients. When implementing `readResource()`, you'll receive just the part after the plugin ID and separator.

### Requirements Checking

You can implement the `checkRequirements()` method to verify if dependencies are available:

```php
/**
 * {@inheritdoc}
 */
public function checkRequirements(): bool {
  return $this->moduleHandler->moduleExists('required_module');
}
```

### Access Control

Control who can use your plugin with the `hasAccess()` method:

```php
/**
 * {@inheritdoc}
 */
public function hasAccess(): AccessResult {
  return AccessResult::allowedIfHasPermission($this->currentUser, 'some permission');
}
```

## Complete Plugin Example

Here's a complete example of a custom MCP plugin:

```php
<?php

namespace Drupal\my_module\Plugin\Mcp;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\mcp\Attribute\Mcp;
use Drupal\mcp\Plugin\McpPluginBase;
use Drupal\mcp\ServerFeatures\Resource;
use Drupal\mcp\ServerFeatures\ResourceTemplate;
use Drupal\mcp\ServerFeatures\Tool;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Jedi MCP plugin that helps access the Force.
 */
#[Mcp(
  id: 'jedi-archives',
  name: new TranslatableMarkup('Jedi Archives'),
  description: new TranslatableMarkup('Provides access to the Jedi Archives.'),
)]
class JediArchives extends McpPluginBase implements ContainerFactoryPluginInterface {

  /**
   * The configuration factory.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $configFactory;

  /**
   * {@inheritDoc}
   */
  public static function create(
    ContainerInterface $container,
    array $configuration,
    $plugin_id,
    $plugin_definition,
  ) {
    $instance = parent::create(
      $container, $configuration, $plugin_id, $plugin_definition
    );
    $instance->configFactory = $container->get('config.factory');

    return $instance;
  }

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration(): array {
    return [
      'enabled' => TRUE,
      'config'  => [
        'jedi_rank'       => 'padawan',
        'allow_dark_side' => FALSE,
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(
    array $form,
    FormStateInterface $form_state,
  ): array {
    $config = $this->getConfiguration();

    $form['jedi_rank'] = [
      '#type'          => 'select',
      '#title'         => 'Jedi Rank',
      '#options'       => [
        'padawan' => 'Padawan',
        'knight'  => 'Jedi Knight',
        'master'  => 'Jedi Master',
      ],
      '#default_value' => $config['config']['jedi_rank'] ?? 'padawan',
    ];

    $form['allow_dark_side'] = [
      '#type'          => 'checkbox',
      '#title'         => 'Allow Dark Side',
      '#description'   =>
      'Grant access to dark side knowledge (use with caution).',
      '#default_value' => $config['config']['allow_dark_side'] ?? FALSE,
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function getTools(): array {
    $tools = [];

    // Force probe tool.
    $tools[] = new Tool(
      name: 'force-probe',
      description: 'Probe the Force to sense information.',
      inputSchema: [
        'type'       => 'object',
        'properties' => [
          'entity'   => [
            'type'        => 'string',
            'description' => 'Entity to probe.',
          ],
          'strength' => [
            'type'        => 'integer',
            'description' => 'Strength of the probe (1-10).',
            'default'     => 5,
          ],
        ],
        'required'   => ['entity'],
      ],
    );

    // Lightsaber tool.
    $tools[] = new Tool(
      name: 'lightsaber',
      description: 'Construct a lightsaber with specific properties.',
      inputSchema: [
        'type'       => 'object',
        'properties' => [
          'crystal' => [
            'type'        => 'string',
            'description' => 'Kyber crystal type.',
            'enum'        => ['blue', 'green', 'purple', 'red', 'yellow'],
          ],
          'style'   => [
            'type'        => 'string',
            'description' => 'Lightsaber style.',
            'default'     => 'standard',
          ],
        ],
        'required'   => ['crystal'],
      ],
    );

    return $tools;
  }

  /**
   * {@inheritdoc}
   */
  public function executeTool(string $toolId, mixed $arguments): array {
    if ($toolId === md5('force-probe')) {
      return $this->executeForceProbe($arguments);
    }
    elseif ($toolId === md5('lightsaber')) {
      return $this->executeLightsaberConstruction($arguments);
    }

    throw new \InvalidArgumentException(
      'Unknown tool. Perhaps the archives are incomplete.'
    );
  }

  /**
   * Execute the Force probe tool.
   */
  protected function executeForceProbe(array $arguments): array {
    $entity = $arguments['entity'] ?? 'unknown';
    $strength = min(10, max(1, $arguments['strength'] ?? 5));

    $results = [
      'wookiees' => [
        'Chewbacca is nearby with Han Solo',
        'A group of Wookiees are planning a hunt',
      ],
      'droids'   => [
        'R2-D2 is carrying a secret message',
        'C-3PO is worried about something',
      ],
      'jedi'     => [
        'Master Yoda is meditating',
        'Obi-Wan Kenobi is watching over Luke',
      ],
      'sith'     => [
        'Darth Vader is approaching',
        'The Emperor is plotting something sinister',
      ],
      'rebels'   => [
        'The Rebel Alliance is planning an attack',
        'Princess Leia is organizing a mission',
      ],
      'empire'   => [
        'Imperial troops are searching the area',
        'A Star Destroyer is orbiting the planet',
      ],
    ];

    $response = $results[$entity] ?? ["The Force cannot locate '$entity'"];

    return [
      [
        'type' => 'text',
        'text' => 'Force probe results: ' . $response[0],
      ],
    ];
  }

  /**
   * Execute the lightsaber construction tool.
   */
  protected function executeLightsaberConstruction(array $arguments): array {
    $crystal = $arguments['crystal'] ?? 'blue';
    $style = $arguments['style'] ?? 'standard';

    $config = $this->getConfiguration();
    if ($crystal === 'red' && !$config['config']['allow_dark_side']) {
      return [
        [
          'type' => 'text',
          'text' => 'Red kyber crystals are aligned with the dark side. Access denied.',
        ],
      ];
    }

    return [
      [
        'type' => 'text',
        'text' => "You have constructed a new $crystal lightsaber with a $style hilt. The Force is with you.",
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getResources(): array {
    $resources = [];

    // Jedi Order records.
    $resources[] = new Resource(
      uri: 'jedi-order',
      name: 'Jedi Order',
      description: 'Records of the Jedi Order.',
      mimeType: 'application/json',
      text: json_encode([
        'council_members' => [
          'Yoda',
          'Mace Windu',
          'Obi-Wan Kenobi',
          'Plo Koon',
          'Kit Fisto',
        ],
        'temples'         => [
          'Coruscant',
          'Jedha',
          'Ahch-To',
          'Lothal',
        ],
      ]),
    );

    // Planets database.
    $resources[] = new Resource(
      uri: 'planets',
      name: 'Planets Database',
      description: 'Known planets in the galaxy.',
      mimeType: 'application/json',
      text: json_encode([
        'core_worlds' => ['Coruscant', 'Alderaan', 'Corellia'],
        'outer_rim'   => ['Tatooine', 'Endor', 'Hoth', 'Dagobah'],
      ]),
    );

    return $resources;
  }

  /**
   * {@inheritdoc}
   */
  public function getResourceTemplates(): array {
    return [
      new ResourceTemplate(
        uriTemplate: 'jedi/{name}',
        name: 'Jedi Knight Records',
        description: 'Personal records of individual Jedi Knights.',
        mimeType: 'application/json',
      ),
      new ResourceTemplate(
        uriTemplate: 'planet/{name}',
        name: 'Planet Information',
        description: 'Detailed information about specific planets.',
        mimeType: 'application/json',
      ),
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function readResource(string $resourceId): array {
    // Base resources.
    if ($resourceId === 'jedi-order' || $resourceId === 'planets') {
      return array_filter(
        $this->getResources(),
        fn(Resource $resource) => $resource->uri === $resourceId
      );
    }

    // Jedi records.
    if (preg_match('/^jedi\/(.+)$/', $resourceId, $matches)) {
      $jediName = $matches[1];

      $jediData = [
        'luke'    => [
          'name'       => 'Luke Skywalker',
          'rank'       => 'Jedi Knight',
          'lightsaber' => 'green',
          'master'     => 'Yoda',
        ],
        'yoda'    => [
          'name'       => 'Yoda',
          'rank'       => 'Grand Master',
          'lightsaber' => 'green',
          'age'        => 900,
        ],
        'obi-wan' => [
          'name'        => 'Obi-Wan Kenobi',
          'rank'        => 'Jedi Master',
          'lightsaber'  => 'blue',
          'apprentices' => ['Anakin Skywalker', 'Luke Skywalker'],
        ],
      ];

      if (isset($jediData[strtolower($jediName)])) {
        return [
          new Resource(
            uri: "jedi/$jediName",
            name: $jediData[strtolower($jediName)]['name'],
            description: "Jedi records for " . $jediData[strtolower(
              $jediName
            )]['name'],
            mimeType: 'application/json',
            text: json_encode($jediData[strtolower($jediName)]),
          ),
        ];
      }

      throw new \InvalidArgumentException(
        "No records found for Jedi: $jediName"
      );
    }

    // Planet records.
    if (preg_match('/^planet\/(.+)$/', $resourceId, $matches)) {
      $planetName = $matches[1];

      $planetData = [
        'tatooine'  => [
          'name'              => 'Tatooine',
          'sector'            => 'Outer Rim',
          'suns'              => 2,
          'notable_residents' => [
            'Anakin Skywalker',
            'Luke Skywalker',
            'Jabba the Hutt',
          ],
        ],
        'coruscant' => [
          'name'       => 'Coruscant',
          'sector'     => 'Core Worlds',
          'population' => 'Trillions',
          'features'   => [
            'Jedi Temple',
            'Senate Building',
            'Entire planet is one city',
          ],
        ],
      ];

      if (isset($planetData[strtolower($planetName)])) {
        return [
          new Resource(
            uri: "planet/$planetName",
            name: $planetData[strtolower($planetName)]['name'],
            description: "Information about " . $planetData[strtolower(
              $planetName
            )]['name'],
            mimeType: 'application/json',
            text: json_encode($planetData[strtolower($planetName)]),
          ),
        ];
      }

      throw new \InvalidArgumentException(
        "No records found for planet: $planetName"
      );
    }

    throw new \InvalidArgumentException(
      "These are not the resources you're looking for."
    );
  }

  /**
   * {@inheritdoc}
   */
  public function hasAccess(): AccessResult {
    $config = $this->getConfiguration();
    $requiredPermission = $config['config']['jedi_rank'] === 'padawan'
      ? 'access content'
      : 'administer site configuration';

    return AccessResult::allowedIfHasPermission(
      $this->currentUser, $requiredPermission
    );
  }

}

```

## Using Your Plugin

Once your plugin is implemented, it will be automatically discovered by the MCP module. You can enable/disable and configure it from the MCP settings page at `/admin/config/mcp`.

When using an MCP client like Claude with MCP enabled, your plugin's resources and tools will be available through the MCP protocol.

### Test the Plugin:

1. Can you create a lightsaber with a red crystal for me? (This should be denied unless you've enabled the "Allow Dark Side" option)
2. “Use the force-probe tool to sense information about rebels.”
3. Change the "Jedi Rank" setting to "Jedi Master" and then try accessing the plugin with a user who only has "access content" permission (should be denied).
4. Enable the "Allow Dark Side" option and retry constructing a lightsaber with a red crystal (should now work).
5. Can you retrieve information about the Jedi Order from the archives?