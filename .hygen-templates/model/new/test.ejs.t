import { expect } from '@esm-bundle/chai'
import { <%- name %> } from './<%- name.toLowerCase() %>.js'

describe('<%- name %>', () => {
  let model
  beforeEach(() => {
    model = new <%- name %>()
  })

  it('should xx', () => {
    expect(model).to.be.equal(model)
  })
})
