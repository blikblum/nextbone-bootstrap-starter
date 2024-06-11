import { Component, html } from 'component'
import './<%- tagName %>.scss'

class <%- componentName %> extends Component {
  render () {
    return html `
      <div class="row">
        Hello!
      </div>
    `
  }
}

customElements.define('<%- tagName %>', <%- componentName %>)

export { <%- componentName %> }
