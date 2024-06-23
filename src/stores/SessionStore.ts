import { Model } from 'nextbone'
import { withComputed } from 'nextbone/computed'
import { service } from 'next-service'

@service('sessionStore')
@withComputed
class SessionStore extends Model {
  static defaults = {
    user: undefined,
  }

  static computed = {
    isAuthenticated: ['user', ({ user }) => user],
  }

  getUserInfo() {
    const user = this.get('user')
    if (!user) throw new Error(`Usuário atual não definido`)
    return { id: user.uid, name: user.displayName }
  }
}

export { SessionStore }
