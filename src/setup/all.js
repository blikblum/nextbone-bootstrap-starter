import '../main.scss'
import './services'
import './icons'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
}
