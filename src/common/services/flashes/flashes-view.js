import { Component, html } from 'component'
import { state } from 'nextbone'
import 'bootstrap/js/dist/alert'
import './styles.scss'

export default class FlashesView extends Component {
  @state
  flashes

  render() {
    return html`
      <div class="flashes__container">
        ${this.flashes.map((model) => {
          const dismissible = Boolean(model.get('dismissible'))
          return html`
            <div
              role="alert"
              class="flashes__alert alert alert-${model.get('type')} ${dismissible
                ? 'alert-dismissible'
                : ''}"
            >
              <strong>${model.get('title')}</strong>
              ${dismissible &&
              html`
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              `}
            </div>
          `
        })}
      </div>
    `
  }
}

customElements.define('flashes-view', FlashesView)
