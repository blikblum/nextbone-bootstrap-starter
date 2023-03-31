const { camelize, getRootDirectories } = require('../../utils')

module.exports = {
  prompt: ({ prompter, args }) => {
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
          return this.state.answers.path.replace('/', '-') + '-view'
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
    ])
  },
}
