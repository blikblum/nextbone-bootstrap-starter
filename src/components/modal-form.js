import { Component, html, property } from 'component'
import { FormState } from 'nextbone/form'
import { view, state } from 'nextbone'

let formCount = 0

class ModalForm extends view(Component) {
  @property({ type: String })
  title

  @state({ copy: true })
  model

  form = new FormState(this)

  formId = `modalForm${formCount++}`

  formData

  connectedCallback() {
    super.connectedCallback()
    if (this.formData) {
      // eslint-disable-next-line guard-for-in
      for (const prop in this.formData) {
        this.form.setData(prop, this.formData[prop])
      }
    }
  }

  formSubmit(e) {
    e.preventDefault()
    if (this.form.isValid({ update: true, touch: true })) {
      const { model } = this
      const fields = this.form.getAttributes()
      const dirtyFields = this.form.getDirtyAttributes()
      const attrs = model.toJSON()

      const dirtyAttrs = model.pick(...dirtyFields)
      const close = () => this.trigger('submit', { model, attrs, dirtyAttrs, fields, dirtyFields })
      if (this.onSubmit) {
        this.onSubmit({ model, attrs, dirtyAttrs, fields, dirtyFields })
      } else {
        close()
      }
    }
  }

  render() {
    const { formId } = this
    return html`
      <div class="modal-header">
        <h4 class="modal-title">${this.title}</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id=${formId} @submit=${this.formSubmit}>${this.formRender(this.form)}</form>
        ${this.error
          ? html`<div class="alert alert-danger alert-important" role="alert">
              <div class="d-flex">
                <div>
                  <h4 class="alert-title">Submit error</h4>
                  <div>${this.error}</div>
                </div>
              </div>
            </div>`
          : ''}
      </div>
      <div class="modal-footer">
        ${this.buttonsRender
          ? this.buttonsRender()
          : html`<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Fechar
              </button>
              <button type="button" class="btn btn-primary" @click=${this.formSubmit}>
                Salvar
              </button>`}
      </div>
    `
  }
}

customElements.define('modal-form', ModalForm)
