---
to: "<%= fileScope === 'global' ? h.rootDir() + '/src/common/entities/' : path %><%- name.toLowerCase() %>.js"
---
import { Model, Collection } from 'nextbone'
import { withComputed } from 'nextbone/computed'
import { withValidation } from 'nextbone/validation'

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
