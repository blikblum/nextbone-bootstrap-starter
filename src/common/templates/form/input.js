import { html, classMap, ifDefined } from 'component'

export function input(form, attr, title, options = {}) {
  const value = form.getValue(attr, options.model)

  const invalidText = form.touched[attr] && form.errors[attr]

  const datalistId = options.datalist ? `${attr}-datalist` : undefined

  return html`
    <label class="form-label" for=${options.id || attr}>${title}</label>
    ${options.type === 'date'
      ? html`<input
          type="date"
          id=${options.id || attr}
          name=${attr}
          class="form-control ${classMap({
            'is-invalid': !!invalidText,
            'form-control-sm': options.size === 'sm',
            'form-control-lg': options.size === 'lg',
          })}"
          data-format=${ifDefined(options.format)}
          ?disabled=${options.disabled}
          .valueAsDate=${value !== undefined ? value : null}
        />`
      : html`<input
            type=${options.type || 'text'}
            id=${options.id || attr}
            name=${attr}
            class="form-control ${classMap({
              'is-invalid': !!invalidText,
              'form-control-sm': options.size === 'sm',
              'form-control-lg': options.size === 'lg',
            })}"
            list=${ifDefined(datalistId)}
            data-format=${ifDefined(options.format)}
            ?disabled=${options.disabled}
            .value=${value !== undefined ? value : null}
          />
          ${datalistId
            ? html`
                <datalist id=${datalistId}>
                  ${options.datalist.map((item) => html` <option>${item}</option> `)}
                </datalist>
              `
            : ''}`}
    ${invalidText && html`<div class="invalid-feedback">${invalidText}</div>`}
  `
}
