import { state, Model } from 'nextbone'
import { Component, html } from 'component'
import { pageHeader } from 'templates/pageHeader.js'
import { ModalForm } from 'controllers/ModalForm.js'
import { input } from 'templates/form/index.js'


import 'luipack/bs-components/data-table.js'

const dataTableFields = [
  { title: 'Nome', attr: 'name' },
  {
    title: 'Value',
    render: (model) => {
      const { value } = model.attributes
      return value
    },
  },
  {
    title: 'Ações',
    render: (model) => {
      return html`
        <button type="button" class="btn btn-secondary btn-sm" data-action="edit-model">
          Editar
        </button> `
    },
  },
]


class <%- componentName %> extends Component {
  @state
  collection

  modelForm = new ModalForm(this, {
    title: 'Model',
    submitEvent: 'save-model',
    render(form) {
      return html`<div class="mb-3">${input(form, 'name', 'Nome')}</div>`
    },
  })

  addModel() {
    const model = new Model()
    this.modelForm.show(model)
  }

  editModel({ model }) {
    this.modelForm.show(model)
  }

  renderContent() {
    return html`<div class="row row-deck row-cards">
      <div class="col-12">
        <div class="card">
          <data-table
            empty-message="Nenhuma item cadastrado"
            .collection=${this.collection}
            .fields=${dataTableFields}
            @edit-model=${this.editModel}
          ></data-table>
        </div>
      </div>
    </div>`
  }
  
  render() {
    return html`${pageHeader({
        title: 'Empty Template',        
      })}

      <div class="page-body">
        <div class="container-xl">
          ${this.renderContent()}
        </div>
      </div>`
  }
}

customElements.define('<%- tagName %>', <%- componentName %>)

export { <%- componentName %> }
