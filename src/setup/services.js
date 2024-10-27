import { container, registry } from 'next-service'
import { bindClassTasks } from 'domTask.js'

import 'stores/SessionStore'
import 'services/SessionService'

registry.decorator((instance) => {
  bindClassTasks(instance)
  return instance
})

// instantiate services. NOTE: after registry.decorator call
const { sessionService } = container
