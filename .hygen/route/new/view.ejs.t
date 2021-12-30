---
to: src/application/<%- path %>/<%- tagName %>.js
---
import { Component, html } from 'component'
import { pageHeader } from 'templates/pageHeader.js'

class <%- componentName %> extends Component {
  render () {
    return html `
      ${pageHeader({
        title: 'Página',
        buttons: [{ title: 'XXX', event: 'xxx' }],
      })}
      <div class="page-content container-fluid">
      </div>`
  }
}

customElements.define('<%- tagName %>', <%- componentName %>)

export { <%- componentName %> }
