import { Component, html } from 'component'
import { showToast } from 'toasts.js'

class NotificationsView extends Component {
  displayAlert(e) {
    const el = e.target
    showToast({ type: el.dataset.type, message: el.textContent.trim() })
  }

  render() {
    return html`
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
      >
        <h1 class="h2">Notifications</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group mr-2">
            <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
            <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
          </div>
          <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
            <span data-feather="calendar"></span>
            This week
          </button>
        </div>
      </div>

      <div class="row">Show alerts / flashes</div>
      <div class="row">
        <button data-type="error" class="btn btn-danger col-auto" @click=${this.displayAlert}>
          Danger
        </button>
        <button data-type="warning" class="btn btn-success col-auto" @click=${this.displayAlert}>
          Warning
        </button>
        <button data-type="info" class="btn btn-info col-auto" @click=${this.displayAlert}>
          Info
        </button>
      </div>
    `
  }
}

customElements.define('notifications-view', NotificationsView)

export { NotificationsView }
