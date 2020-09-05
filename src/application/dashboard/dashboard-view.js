import { Component, html } from 'component'
import { Collection } from 'nextbone'
import { carSellData } from './carSellData.js'

import 'components/data-table.js'

const sells = new Collection(carSellData)

class DashboardView extends Component {
  render() {
    return html`
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
      >
        <h1 class="h2">Dashboard</h1>
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

      <div class="row">
        <div class="col">
          <div class="card text-white bg-primary mb-3">
            <div class="card-header">Header</div>
            <div class="card-body">
              <h5 class="card-title">Primary card title</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card text-white bg-success mb-3">
            <div class="card-header">Header</div>
            <div class="card-body">
              <h5 class="card-title">Success card title</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card text-white bg-danger mb-3">
            <div class="card-header">Header</div>
            <div class="card-body">
              <h5 class="card-title">Danger card title</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2>Section title</h2>
      <div class="table-responsive">
        <data-table
          striped
          sm
          .fields=${[
            { title: '#', attr: 'id' },
            { title: 'Maker', attr: 'maker' },
            { title: 'Model', attr: 'model' },
            { title: 'Sells', attr: 'sell' },
          ]}
          .collection=${sells}
        ></data-table>
      </div>
    `
  }
}

customElements.define('dashboard-view', DashboardView)
