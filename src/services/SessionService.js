import { Events } from 'nextbone'
import { service } from 'next-service'
import { taskHandler } from 'domTask.js'

@service('sessionService', ['sessionStore'])
class SessionService extends Events {
  constructor(sessionStore) {
    super()
    this.store = sessionStore
  }

  @taskHandler('signin-user')
  async signIn({ type = 'google', email, password } = {}) {
    this.store.set('isLogging', true)
    this.store.set('isLogged', false)
    this.store.unset('loginError')

    switch (type) {
      case 'google':
        break

      case 'email':
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (email === 'jon@hotmail.com' && password === '123') {
              this.store.set('isLogged', true)
              this.store.set('isLogging', false)
              resolve()
            } else {
              this.store.set('loginError', {
                title: 'Erro ao autenticar usuário',
                content: `User or password invalid`,
              })
              this.store.set('isLogged', false)
              this.store.set('isLogging', false)
              reject()
            }
          }, 600)
        })

        break
      default:
    }
  }

  async signOut() {
    this.store.set('isLogged', false)
  }
}

export { SessionService }
