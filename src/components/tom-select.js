import TomSelect from 'tom-select'
import { isEqual } from 'lodash-es'
import { Component, html } from 'component'

function stopPropagation(e) {
  e.stopPropagation()
}

class TomSelectElement extends Component {
  static properties = {
    config: { type: Object },
    invalid: { type: Boolean },
    multiple: { type: Boolean },
    create: { type: Boolean },
    name: { type: String },
    placeholder: { type: String },
    items: { attribute: false },
    value: { attribute: false },
  }

  firstUpdated() {
    const { create = !this.items, config = {}, placeholder } = this
    const items = this.getValue()
    const maxItems = this.multiple ? config.maxItems : 1
    const mergedConfig = {
      options: this.items || [],
      create,
      items,
      placeholder,
      maxItems,
      labelField: 'name',
      searchField: ['name'],
      ...config,
    }

    // ensure items exists in the options
    if (mergedConfig.create && items) {
      for (const item of items) {
        if (!mergedConfig.options.some((option) => option.value === item)) {
          mergedConfig.options.push({ name: item, value: item })
        }
      }
    }

    this._tomSelect = new TomSelect(this.querySelector('input'), mergedConfig)
    this._tomSelect.on('change', () => {
      this.value = this.getControlValue()
      this.dispatchEvent(new InputEvent('input', { bubbles: true }))
    })
  }

  willUpdate(changed) {
    if (this._tomSelect) {
      if (changed.has('items')) {
        this._tomSelect.clearOptions(() => true)
        this._tomSelect.addOptions(this.items)
      }
      if (changed.has('value')) {
        const value = this.getValue()
        const controlValue = this.getControlValue()
        if (!isEqual(value, controlValue)) {
          this._tomSelect.clear(true)
          // todo: implement multiple
          this._tomSelect.addItem(this.value, true)
        }
      }
      if (changed.has('invalid')) {
        this._tomSelect.wrapper.classList.toggle('is-invalid', this.invalid)
      }
    }
  }

  getValue() {
    return this.multiple ? this.value || [] : [this.value]
  }

  getValueName(value) {
    const { options } = this._tomSelect
    return Object.values(options).find((option) => option.value === value)?.name || value
  }

  getControlValue() {
    const controlItems = this._tomSelect.items || []
    return this.multiple ? controlItems : controlItems[0]
  }

  render() {
    return html`<input class="form-select" @change=${stopPropagation} @input=${stopPropagation} />`
  }
}

customElements.define('tom-select', TomSelectElement)

export { TomSelectElement }
