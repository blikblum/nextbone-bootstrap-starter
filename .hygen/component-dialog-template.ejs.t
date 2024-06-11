import { Component, html } from 'component'
import './<%- tagName %>.scss'

class <%- componentName %> extends Component {
  saveClick(event) {
    event.preventDefault()
    this.dispatchEvent(new CustomEvent('submit', { detail: {}, bubbles: true }))
  }

  render() {
    return html`<div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Dialogo</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body"></div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        <button class="btn btn-primary" @click=${this.saveClick}>Salvar</button>
      </div>
    </div>`
  }
}

customElements.define('<%- tagName %>', <%- componentName %>)

export { <%- componentName %> }
