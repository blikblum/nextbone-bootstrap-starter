import { Route } from 'nextbone-routing'
import { inject } from 'next-service'
import { SessionStore } from 'stores/SessionStore.js'

import './application-view.js'

class ApplicationRoute extends Route {
  static component = 'application-view'

  @inject(SessionStore)
  sessionStore: SessionStore

  activate(transition) {
    if (!this.sessionStore.get('isLogged')) {
      transition.redirectTo('frontpage')
    }
  }
}

export { ApplicationRoute }
