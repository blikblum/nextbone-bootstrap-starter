import './setup/all'
import { Radio } from 'nextbone-radio'
import { Router } from 'nextbone-routing'
import { container } from 'next-service'

// route classes
import { ApplicationRoute } from './application/ApplicationRoute'
import { FrontPageRoute } from './frontpage/FrontPageRoute'

// route views / components
import './application/dashboard/dashboard-view'
import './application/generic-view'
import { NotificationsRoute } from './application/notifications/NotificationsRoute.js'

const { flashesService, sessionService } = container

const router = new Router({
  outlet: '#main-view',
  log: true,
  logError: true,
})

router.map(function routeMap(route) {
  route('frontpage', { path: '/', class: FrontPageRoute })
  route('application', { path: '/app', class: ApplicationRoute }, () => {
    route('dashboard', { path: '', component: 'dashboard-view' })
    route('notifications', { class: NotificationsRoute })
    route('products', { component: 'generic-view', properties: { title: 'Products' } })
    route('customers', { component: 'generic-view', properties: { title: 'Customers' } })
    route('reports', { component: 'generic-view', properties: { title: 'Reports' } })
  })
})

// proxy router events through a Radio channel
const routerChannel = Radio.channel('router')

router.on('all', (...args) => {
  routerChannel.trigger(...args)
})

// configure flashes service

flashesService.setup({
  container: '.application__flashes',
})

router.on('transition:error', (transition, err) => {
  flashesService.add({
    type: 'danger',
    title: `Transition Error: ${err}`,
  })
})

router.on('before:activate', (transition, route) => {
  if (!sessionService.isAuthenticated && process.env.NODE_ENV !== 'development') {
    transition.redirectTo('frontpage')
  }
})

router.listen()
