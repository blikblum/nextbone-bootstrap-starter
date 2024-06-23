import { Route } from 'nextbone-routing'
import { inject } from 'next-service'
import { SessionStore } from 'stores/SessionStore.js'
import './frontpage-view.js'

class FrontPageRoute extends Route {
  static component = 'frontpage-view'

  @inject(SessionStore)
  sessionStore

  prepareEl(el) {
    el.session = this.sessionStore
  }
}

export { FrontPageRoute }
