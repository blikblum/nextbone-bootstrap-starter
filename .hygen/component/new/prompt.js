const { camelize, getRootDirectories } = require('../../utils')
const { normalize } = require('path')

module.exports = {
  prompt: ({ prompter, args }) => {
    return prompter.prompt([
      {
        type: 'select',
        name: 'scope',
        message: 'Scope:',
        choices() {
          return ['global', ...getRootDirectories()]
        },
      },
      {
        type: 'input',
        name: 'path',
        message({ answers }) {
          const scope = answers.scope
          return `Path (relative to src/${scope === 'global' ? 'components' : scope})`
        },
        result(path) {
          const scope = this.state.answers.scope
          const basePath = scope === 'global' ? 'components' : scope
          return normalize(`src/${basePath}/${path}/`).replace(/\\/gm, '/')
        },
      },
      {
        type: 'input',
        name: 'tagName',
        message: 'Element tag:',
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
          { message: 'empty', name: 'component-empty-template.ejs.t' },
          { message: 'dialog', name: 'component-dialog-template.ejs.t' },
        ],
      },
    ])
  },
}
