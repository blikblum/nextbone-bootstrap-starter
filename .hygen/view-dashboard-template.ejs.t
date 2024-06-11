import { state } from 'nextbone'
import { Component, html } from 'component'
import { pageHeader } from 'templates/pageHeader.js'

class <%- componentName %> extends Component {
  @state
  model

  renderContent() {
    return html`<div class="card">
      <div class="card-header"><h5 class="h3 mb-0">Template</h5></div>
        <div class="card-body">
            
        </div>
      </div>`
  }

  render() {
    return html`${pageHeader({
        title: 'Empty Template',        
      })}

      <div class="container-fluid mt--6">
        ${this.renderContent()}
      </div>`
  }
}

customElements.define('<%- tagName %>', <%- componentName %>)

export { <%- componentName %> }
