import { Component, html, property } from 'component'
import { Collection } from 'nextbone'
import { pageHeader } from 'templates/pageHeader.js'

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
      ${pageHeader({ title: this.title })}
      <div class="container">
        <data-table .fields=${peopleTableFields} .collection=${collection}></data-table>
      </div>
    `
  }
}

customElements.define('generic-view', GenericView)

export { GenericView }
