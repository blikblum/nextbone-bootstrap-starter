---
to: stories/components/<%- tagName %>.stories.js
---
import { html } from 'lit-element'
import '../../<%- path%><%- tagName %>.js'

export default {
  title: 'Components/<%- componentName %>',
}

const Template = ({ }) => {
  return html`<<%- tagName %>></<%- tagName %>>`
}

export const Default = Template.bind({})

Default.args = {}