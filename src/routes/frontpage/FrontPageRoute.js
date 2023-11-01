import { Route } from 'nextbone-routing'
import { inject } from 'next-service'
import { SessionStore } from 'stores/SessionStore.js'
import './frontpage-view.js'

class FrontPageRoute extends Route {
  static component = 'frontpage-view'

  @inject(SessionStore)
  sessionStore

  activate() {
    this.listenTo(this.sessionStore, 'change:isLogged', this.onLogin)
  }

  deactivate() {
    this.stopListening(this.sessionStore)
  }

  prepareEl(el) {
    el.session = this.sessionStore
  }

  onLogin() {
    if (this.sessionStore.get('isLogged')) {
      this.$router.transitionTo('application')
    }
  }
}

export { FrontPageRoute }
