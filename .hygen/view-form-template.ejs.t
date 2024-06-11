import { state, Model } from 'nextbone'
import { FormState } from 'nextbone/form'
import { Component, html } from 'component'
import { pageHeader } from 'templates/pageHeader.js'
import { input } from 'templates/form/input.js'

class <%- componentName %> extends Component {
  @state({copy: true})
  model = new Model()

  form = new FormState(this, { model: this.model })

  renderContent() {
    const { form } = this

    return html`<div class="card">
      <div class="card-header"><h5 class="h3 mb-0">Template</h5></div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">${input(form, 'name', 'Nome')}</div>
          </div>
        </div>
      </div>`
  }                

  render() {
    const { model } = this
    return html`${pageHeader({
        title: model.isNew() ? 'Novo' : 'Editar',        
      })}

      <div class="container-fluid mt--6">
        ${this.renderContent()}
      </div>`
  }
}

customElements.define('<%- tagName %>', <%- componentName %>)

export { <%- componentName %> }
