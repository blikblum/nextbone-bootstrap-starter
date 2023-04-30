import { registry } from 'next-service'
import { bindClassTasks } from 'domTask.js'

import 'stores/SessionStore.js'
import 'services/SessionService.js'

registry.decorator((instance) => {
  bindClassTasks(instance)
  return instance
})
