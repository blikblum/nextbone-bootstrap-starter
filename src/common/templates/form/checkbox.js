import { html, ifDefined } from 'component'

export const checkbox = (form, attr, title, options = {}) => {
  const value = form.get(attr)
  const invalidText = form.touched[attr] && form.errors[attr]

  const valueAttr = options.value

  const checked = valueAttr ? Array.isArray(value) && value.includes(valueAttr) : !!value

  return html`
    <div class="form-check${options.inline ? ' form-check-inline' : ''}">
      <input
        id=${options.id || attr}
        type="checkbox"
        name=${attr}
        class="form-check-input"
        value=${ifDefined(valueAttr)}
        data-format=${ifDefined(options.format)}
        ?disabled=${options.disabled}
        .checked=${checked}
      />
      <label class="form-check-label" for=${options.id || attr}>${title}</label>
    </div>
  `
}
