---
to: <%- path%><%- tagName %>.stories.js
---
import { html } from 'lit'
import './<%- tagName %>.js'

export default {
  title: 'Components/<%- componentName %>',
  parameters: {
    actions: {
      handles: [],
    },
  },
}

const Template = ({ }) => {
  return html`<<%- tagName %>></<%- tagName %>>`
}

export const Default = Template.bind({})

Default.args = {}