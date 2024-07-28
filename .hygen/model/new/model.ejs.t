---
to: "src/models/<%- h.inflection.camelize(name, true) %>.ts"
---
import { Collection, Model } from 'nextbone'
import { withComputed } from 'nextbone/computed.js'
import { withValidation } from 'nextbone/validation.js'

class <%- name %> extends Model {
  defaults () {
    return {

    }
  }
}

class <%- collection %> extends Collection {
  static model = <%- name %>
}

export { <%- name %>, <%- collection %> }
