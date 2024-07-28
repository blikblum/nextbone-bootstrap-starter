import { Class, resolve } from 'next-service'
import { PropertyHook } from 'nextbone-routing'

export function fromService(service: Class): PropertyHook {
  return {
    init(setter) {
      setter(resolve(service))
    },
  }
}
