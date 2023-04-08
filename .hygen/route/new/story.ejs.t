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
}


export const Default = {
  args: {
  
  },
}