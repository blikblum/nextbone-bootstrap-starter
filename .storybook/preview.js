import { withActions } from '@storybook/addon-actions/decorator'
import { registerContext } from 'wc-context'
import '../src/setup/all.js'

/** @type { import('@storybook/web-components').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    withActions,
    (story, context) => {
      /** @type {HTMLElement} */
      const el = story()

      const { events } = context.parameters
      if (events) {
        for (const [eventName, handler] of Object.entries(events)) {
          el.addEventListener(eventName, handler)
        }
      }

      return el
    },
    (story, context) => {
      const el = story()

      const { contexts } = context.parameters
      if (contexts) {
        for (const [context, value] of Object.entries(contexts)) {
          registerContext(el, context, value)
        }
      }

      return el
    },
  ],
}

export default preview
