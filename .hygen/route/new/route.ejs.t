---
to: src/routes/<%- path %>/<%- routeName %>.js
---
import { Route } from 'nextbone-routing'
import { inject } from 'next-service'
import './<%- tagName %>.js'

class <%- routeName %> extends Route {
  static component = '<%- tagName %>'
  
  activate (transition) {

  }

  prepareEl(el) {
   
  }
}

export { <%- routeName %> }
