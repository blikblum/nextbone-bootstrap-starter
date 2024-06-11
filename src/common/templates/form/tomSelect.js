import { html } from 'lit'

import 'components/tom-select.js'

export function tomSelect(form, attr, title, items, options = {}) {
  const value = form.get(attr)
  const invalidText = form.touched[attr] && form.errors[attr]
  const id = options.id || attr
  return html`
    <label class="form-label" for=${id}>${title}</label>
    <tom-select
      id=${id}
      name=${attr}
      custom-input
      ?invalid=${invalidText}
      ?multiple=${options.multiple}
      ?create=${options.create}
      .value=${value}
      .items=${items}
    ></tom-select>
    ${invalidText && html`<div class="invalid-feedback">${invalidText}</div>`}
  `
}
