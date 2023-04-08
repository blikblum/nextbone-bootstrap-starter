---
to: <%- path%><%- tagName %>.stories.js
---
import './<%- tagName %>.js'

export default {
  title: 'Components/<%- componentName %>',
  component: '<%- tagName %>',
  parameters: {
    actions: {
      handles: [],
    },
  },
}


export const Default = {
  args: {
  
  },
}