module.exports = function (plop) {
  // page generator
  plop.setGenerator('page', {
    description: 'Create a page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Page name?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/app/{{kebabCase name}}/page.tsx',
        templateFile: 'plop-templates/page/index.hbs'
      },
      {
        type: 'add',
        path: 'src/app/{{kebabCase name}}/{{kebabCase name}}.test.tsx',
        templateFile: 'plop-templates/page/test.hbs'
      }
    ]
  })

  // Component generator
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.tsx',
        templateFile: 'plop-templates/components/index.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
        templateFile: 'plop-templates/components/test.hbs',
      },
    ],
  })

  // Util function generator
  plop.setGenerator('util', {
    description: 'Create a utility function',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Util name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/utils/{{kebabCase name}}.ts',
        templateFile: 'plop-templates/utils/index.hbs',
      },
      {
        type: 'add',
        path: 'src/utils/{{kebabCase name}}.test.ts',
        templateFile: 'plop-templates/utils/test.hbs',
      },
    ],
  })

  // React hook generator
  plop.setGenerator('hook', {
    description: 'Create a custom React hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Hook name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/hooks/{{camelCase name}}.ts',
        templateFile: 'plop-templates/hooks/index.hbs',
      },
      {
        type: 'add',
        path: 'src/hooks/{{camelCase name}}.test.ts',
        templateFile: 'plop-templates/hooks/test.hbs',
      },
    ],
  })

}
