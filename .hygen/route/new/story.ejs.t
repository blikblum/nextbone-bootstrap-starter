---
to: src/routes/<%- path %>/<%- tagName %>.stories.js
---
import './<%- tagName %>.js'

export default {
  title: 'Views/<%- componentName %>',
  component: '<%- tagName %>',
  parameters: {
    actions: {
      handles: [],
    },
  },
  args: {},
}


export const Default = {
  args: {
  
  },
}