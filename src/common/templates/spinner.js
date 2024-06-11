import { html } from 'component'

export const spinner = () => html`<div class="d-flex justify-content-center align-items-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
</div>`
