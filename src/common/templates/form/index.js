import { html } from 'lit'
import { get } from 'lodash-es'
import { checkbox } from './checkbox.js'
import { input } from './input.js'
import { radio } from './radio.js'
import { select, selectEl } from './select.js'
import { textarea } from './textarea.js'

function renderComponent(form, component) {
  const { type, key, label, rows } = component
  switch (type) {
    case 'text':
    case 'password':
    case 'email':
      return input(form, key, label, { type: type === 'textarea' ? 'text' : type })

    case 'checkbox':
      return checkbox(form, key, label)

    case 'radio': {
      const values = component.values || []
      return html`<div class="form-label">${label}</div>
        <div>
          ${values.map(({ label: valueLabel, value }) => radio(form, key, valueLabel, { value }))}
        </div>`
    }

    case 'textarea':
      return textarea(form, key, label, { rows })

    case 'select':
      return select(form, key, label, get(component, 'data.values') || [])

    default:
      throw new Error`renderFormTemplate: "${type}" not recognized`()
  }
}

function renderFormTemplate(form, template = {}) {
  const { components = [] } = template

  return components.map(
    (component) => html`<div class="mb-3">${renderComponent(form, component)}</div>`
  )
}

export { input, select, selectEl, radio, checkbox, textarea, renderFormTemplate }
