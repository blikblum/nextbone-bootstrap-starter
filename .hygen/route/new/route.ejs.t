---
to: src/routes/<%- path %>/<%- routeName %>.ts
---
import { Route, property, Transition } from 'nextbone-routing'
import './<%- tagName %>.js'

class <%- routeName %> extends Route {
  static component = '<%- tagName %>'

  @property({ from: 'params.paramName' })
  paramValue: string
  
  activate (transition: Transition) {

  } 
}

export { <%- routeName %> }
