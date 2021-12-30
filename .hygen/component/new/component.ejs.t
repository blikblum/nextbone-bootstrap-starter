---
to: <%- path%><%- tagName %>.js
---
import { Component, html, css } from 'component'

class <%- componentName %> extends Component {
  static styles = [css`
    <%- tagName %> {

    }
  `]

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
