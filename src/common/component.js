import { LitElement, html, css } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'

class Component extends LitElement {
  static finalizeStyles(styles) {
    // check styles property
    // remove when / if https://github.com/lit/lit/issues/2881 is resolved
    if (this.hasOwnProperty('styles')) {
      const elementStyles = super.finalizeStyles(styles)
      const styleRoot = document.head
      // WARNING: This break component encapsulation and applies styles to the document.
      // These styles should be manually scoped.

      elementStyles.forEach((s) => {
        const style = document.createElement('style')
        style.textContent = s.cssText
        styleRoot.appendChild(style)
      })
    }

    return []
  }
  createRenderRoot() {
    // disable shadow dom
    return this
  }
}

export { Component, customElement, html, css, property, classMap, styleMap, ifDefined, query }
