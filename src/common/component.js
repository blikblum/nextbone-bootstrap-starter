import { LitElement, html, css } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'
import { repeat } from 'lit/directives/repeat.js'
import { when } from 'lit/directives/when.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { ref, createRef } from 'lit/directives/ref.js'
import { view } from 'nextbone'
import { withContext } from 'wc-context/lit.js'

class Component extends withContext(view(LitElement)) {
  createRenderRoot() {
    // disable shadow dom
    return this
  }
}

class LightComponent extends LitElement {
  createRenderRoot() {
    // disable shadow dom
    return this
  }
}

export {
  Component,
  LightComponent,
  customElement,
  html,
  css,
  property,
  classMap,
  styleMap,
  ifDefined,
  query,
  when,
  repeat,
  ref,
  createRef,
}
