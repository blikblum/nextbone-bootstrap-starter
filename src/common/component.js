import { LitElement, html, customElement, property } from 'lit'
import { classMap } from 'lit/directives/class-map'
import { styleMap } from 'lit/directives/style-map'
import { ifDefined } from 'lit/directives/if-defined'

class Component extends LitElement {
  createRenderRoot() {
    // disable shadow dom
    return this
  }
}

export { Component, customElement, html, property, classMap, styleMap, ifDefined }
