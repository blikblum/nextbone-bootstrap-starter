import { html, classMap, ifDefined } from 'component'

export function textarea(form, attr, title, options = {}) {
  const value = form.getValue(attr, options.model)

  const invalidText = form.touched[attr] && form.errors[attr]

  return html`
    <div class=${ifDefined(options.class)}>
      <label class="form-label ${title ? '' : 'd-none'}" for=${options.id || attr}>${title}</label>
      <textarea
        id=${options.id || attr}
        name=${attr}
        class="form-control ${classMap({
          'is-invalid': !!invalidText,
        })}"
        rows=${ifDefined(options.rows)}
        data-format=${ifDefined(options.format)}
        .value=${value || null}
      ></textarea>
      ${invalidText && html` <div class="invalid-feedback">${invalidText}</div> `}
    </div>
  `
}
