import { html, classMap, ifDefined } from 'component'

export function normalizeSelectItems(items) {
  return (
    items &&
    items.map((item) => {
      if (typeof item === 'string') {
        return { name: item, value: item }
      }
      return item
    })
  )
}

export function selectEl(attr, value, items, options = {}, invalidText = options.invalidText) {
  const id = options.id || attr
  return html`
    <select
      id=${id}
      name=${attr}
      class="form-select ${classMap({
        'is-invalid': !!invalidText,
      })}"
      ?disabled=${options.disabled}
      data-format=${ifDefined(options.format)}
    >
      <option hidden ?selected=${value === undefined}></option>
      ${items.map(
        (item) => html`
          <option value=${item.value} ?selected=${value === item.value}>${item.name}</option>
        `
      )}
    </select>
  `
}

export function selectOptions(value, items, emptyLabel) {
  return html`
    <option ?hidden=${!emptyLabel} ?selected=${value === undefined}>${emptyLabel}</option>
    ${items.map(
      (item) => html`
        <option value=${item.value} ?selected=${value === item.value}>${item.name}</option>
      `
    )}
  `
}

export function select(form, attr, title, items, options = {}) {
  const value = form.get(attr)
  const invalidText = form.touched[attr] && form.errors[attr]
  const id = options.id || attr
  return html`
    <label class="form-label" for=${id}>${title}</label>
    ${selectEl(attr, value, items, options, invalidText)}
    ${invalidText && html`<div class="invalid-feedback">${invalidText}</div>`}
  `
}
