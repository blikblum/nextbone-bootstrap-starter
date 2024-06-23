import { Route } from 'nextbone-routing'
import { inject } from 'next-service'
import { SessionStore } from 'stores/SessionStore.js'

class RootRoute extends Route {
  @inject(SessionStore)
  sessionStore

  activate(transition) {
    // todo: move handling of logged guard to main.js?
    this.listenTo(this.sessionStore, 'change:isLogged', this.onLogin)
    console.log('RootRoute activated', { session: this.sessionStore.toJSON() })
    if (!this.sessionStore.get('isLogged')) {
      transition.redirectTo('frontpage')
    }
  }

  deactivate() {
    this.stopListening(this.sessionStore)
  }

  onLogin() {
    if (this.sessionStore.get('isLogged')) {
      this.$router.transitionTo('application')
    } else {
      this.$router.transitionTo('frontpage')
    }
  }
}

export { RootRoute }
