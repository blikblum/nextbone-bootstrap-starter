---
to: src/application/<%- path %>/<%- routeName %>.js
---
import { Route } from 'nextbone-routing'
import { inject } from 'next-service'
import './<%- tagName %>'

class <%- routeName %> extends Route {
  static component = '<%- tagName %>'
  
  activate (transition) {

  }
}

export { <%- routeName %> }
