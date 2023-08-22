import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import KWizzard from './KWizzard.vue'

describe('KWizzard component', () => {
  it('renders', () => {
    const wrapper = mount(KWizzard)


    expect(wrapper.find('[data-test="kwizzard-wrapper"]').exists()).toBe(true)
  })
})