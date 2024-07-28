import { property, Route } from 'nextbone-routing'
import { SessionStore } from 'stores/SessionStore.js'
import { fromService } from 'routeHooks.js'

import './frontpage-view.js'

class FrontPageRoute extends Route {
  static component = 'frontpage-view'

  @property({ from: fromService(SessionStore), to: 'session' })
  sessionStore: SessionStore
}

export { FrontPageRoute }
