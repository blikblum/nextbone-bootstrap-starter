import './setup/all.js'

import { Router } from 'nextbone-routing'
import { container } from 'next-service'
import { showToast } from 'toasts.js'

// route classes
import { RootRoute } from 'routes/root/RootRoute.js'
import { FrontPageRoute } from './routes/frontpage/FrontPageRoute.js'
import { ApplicationRoute } from './routes/application/ApplicationRoute.js'
import { NotificationsRoute } from './routes/notifications/NotificationsRoute.js'

// route views / components
import './routes/dashboard/dashboard-view.js'
import './components/generic-view.js'

const { sessionService } = container

const router = new Router({
  outlet: '#main-view',
  log: true,
  logError: true,
})

router.map(function routeMap(route) {
  route('root', { path: '/', class: RootRoute }, () => {
    route('frontpage', { path: '', class: FrontPageRoute })
    route('application', { path: 'app', class: ApplicationRoute }, () => {
      route('dashboard', { path: '', component: 'dashboard-view' })
      route('notifications', { class: NotificationsRoute })
      route('products', { component: 'generic-view', properties: { title: 'Products' } })
      route('customers', { component: 'generic-view', properties: { title: 'Customers' } })
      route('reports', { component: 'generic-view', properties: { title: 'Reports' } })
    })
  })
})

// configure flashes service

router.on('transition:error', (transition, err) => {
  showToast({
    type: 'error',
    title: `Transition Error`,
    message: `${err}`,
  })
})

router.on('before:activate', (transition, route) => {
  if (!sessionService.isAuthenticated && process.env.NODE_ENV !== 'development') {
    transition.redirectTo('frontpage')
  }
})

router.listen()
