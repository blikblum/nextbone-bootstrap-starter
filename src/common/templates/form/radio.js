import { html, classMap, ifDefined } from 'component'

export const radio = (form, attr, title, options = {}) => {
  const radioValue = options.value || title
  const value = form.getValue(attr, options.model)
  const id = options.id || `${attr}-${radioValue}`
  const invalidText = form.touched[attr] && form.errors[attr]

  return html`
    <div class="form-check${options.inline ? ' form-check-inline' : ''}">
      <input
        id=${id}
        type="radio"
        name=${attr}
        class="form-check-input"
        .value=${radioValue}
        .checked=${value === radioValue}
        ?disabled=${options.disabled}
      />
      <label class="form-check-label" for=${id}>${title}</label>
    </div>
  `
}
