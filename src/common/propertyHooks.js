import { resolve } from 'next-service'

export function fromService(service) {
  return {
    init(setter) {
      setter(resolve(service))
    },
  }
}
