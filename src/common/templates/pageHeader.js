import { html } from 'component'

export const pageHeader = ({ title, buttons = [] }) => html`
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">${title}</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
      ${buttons.map(({ label, link, onClick, type }) => {
        const btnClass = type ? `btn-${type}` : ''
        return link
          ? html`<a href=${link} class="btn ${btnClass}">${label}</a>`
          : html`<button class="btn ${btnClass}" @click=${onClick}>${label}</button>`
      })}
    </div>
  </div>
`
