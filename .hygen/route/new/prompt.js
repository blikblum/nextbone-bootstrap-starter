const { camelize, getRootDirectories } = require('../../utils')

module.exports = {
  prompt: ({ prompter, args, h }) => {
    if (args.path && args.viewName && args.routeName) {
      return Promise.resolve({ allow: true })
    }

    return prompter.prompt([
      {
        type: 'input',
        name: 'path',
        message({ answers }) {
          return `Path (relative to src/routes)`
        },
      },
      {
        type: 'input',
        name: 'routeName',
        message: 'Route name:',
        initial() {
          return camelize(this.state.answers.path.replace('-', '/'), '/') + 'Route'
        },
      },
      {
        type: 'input',
        name: 'tagName',
        message: 'Element Tag:',
        initial() {
          const routeName = this.state.answers.routeName
          return h.inflection
            .dasherize(h.inflection.underscore(routeName))
            .replace('-route', '-view')
        },
      },
      {
        type: 'input',
        name: 'componentName',
        message: 'Component name:',
        initial() {
          return camelize(this.state.answers.tagName, '-')
        },
      },
      {
        type: 'select',
        name: 'template',
        message: 'Template:',
        choices: [
          { message: 'empty', name: 'view-empty-template.ejs.t' },
          { message: 'collection', name: 'view-collection-template.ejs.t' },
          { message: 'form', name: 'view-form-template.ejs.t' },
          { message: 'dashboard', name: 'view-dashboard-template.ejs.t' },
        ],
      },
    ])
  },
}
