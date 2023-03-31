import { html } from 'lit'
import './generic-view.js'

export default {
  title: 'View/GenericView',
}

const Template = ({ title }) => html`<generic-view title=${title}></generic-view>`

export const Default = Template.bind({})

Default.args = {
  title: 'Default',
}
