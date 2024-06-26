---
to: "../packages/nefrolink-base/models/<%- h.inflection.camelize(name, true) %>.js"
---
import { FireModel } from 'nextbone-firestore'
import { Collection } from 'nextbone'
import { withComputed } from 'nextbone/computed.js'
import { withValidation } from 'nextbone/validation.js'

class <%- name %> extends FireModel {
  defaults () {
    return {

    }
  }
}

class <%- collection %> extends Collection {
  static model = <%- name %>
}

export { <%- name %>, <%- collection %> }
