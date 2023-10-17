import { Component, html, property } from 'component'
import { Collection } from 'nextbone'

import 'luipack/bs-components/data-table.js'

const people = [
  {
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
    },
  },
  {
    name: 'Jane Smith',
    age: 25,
    email: 'jane.smith@example.com',
    address: {
      street: '456 Oak St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
    },
  },
  {
    name: 'Bob Johnson',
    age: 40,
    email: 'bob.johnson@example.com',
    address: {
      street: '789 Maple St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
    },
  },
]

const collection = new Collection(people)

const peopleTableFields = [
  { attr: 'name', title: 'Name', sortable: true },
  { attr: 'age', title: 'Age', sortable: true },
  { attr: 'email', title: 'Email', sortable: true },
]

class GenericView extends Component {
  @property()
  title

  render() {
    return html`
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
      >
        <h1 class="h2">${this.title}</h1>
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
      <div class="container">
        <data-table .fields=${peopleTableFields} .collection=${collection}></data-table>
      </div>
    `
  }
}

customElements.define('generic-view', GenericView)

export { GenericView }
