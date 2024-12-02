module.exports = function (plop) {
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
        path: 'utils/{{camelCase name}}.ts',
        templateFile: 'plop-templates/util.ts.hbs',
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
        path: 'hooks/{{camelCase name}}.ts',
        templateFile: 'plop-templates/hook.ts.hbs',
      },
    ],
  })
}
