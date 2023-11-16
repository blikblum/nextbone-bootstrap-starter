import { Route } from 'nextbone-routing'
import './application-view.js'
import { inject } from 'next-service'
import { SessionStore } from 'stores/SessionStore.js'

class ApplicationRoute extends Route {
  static component = 'application-view'

  @inject(SessionStore)
  sessionStore

  activate(transition) {
    if (!this.sessionStore.get('isLogged')) {
      transition.redirectTo('frontpage')
    }
  }
}

export { ApplicationRoute }
