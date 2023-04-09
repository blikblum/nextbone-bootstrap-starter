import 'luipack/bs-components/toast-container.js'

function getAppToastsInstance() {
  let appToasts = document.body.querySelector('toast-container#app-toasts')

  if (!appToasts) {
    appToasts = document.createElement('toast-container')
    appToasts.id = 'app-toasts'
    document.body.insertBefore(appToasts, document.body.firstChild)
  }

  return appToasts
}

export function showToast(toast) {
  const toasts = getAppToastsInstance()
  toasts.add(toast)
}
