import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { h, nextTick } from 'vue'
import KWizard from './KWizard.vue'
import KSteps from './KSteps.vue'
import KStep from './KStep.vue'

describe('KWizard component', () => {
  it('renders', () => {
    const wrapper = mount(KWizard)


    expect(wrapper.find('[data-test="kwizard-wrapper"]').exists()).toBe(true)
  })

  it('renders first step by default', () => {
    const step1 = h(KStep, {id: '1'}, () => [h('h2', 'First step')])
    const step2 = h(KStep, {id: '2'}, () => [h('h2', 'Second step')])

    const wrapper = mount(KWizard, {
      slots: {
        default: h(KSteps, {}, [step1, step2])
      }
    })


    expect(wrapper.html()).toContain('<h2>First step</h2>')
    expect(wrapper.html()).not.toContain('<h2>Second step</h2>')
  })

  it('sets the step specified in `setStep` method', async () => {
    // https://github.com/vuejs/test-utils/blob/9d3c2a6526f3d8751d29b2f9112ad2a3332bbf52/tests/mountingOptions/slots.spec.ts#L5
    let assertParams

    const step1 = h(KStep, {id: '1'}, () => [h('h2', 'First step')])
    const step2 = h(KStep, {id: '2'}, () => [h('h2', 'Second step')])

    const wrapper = mount(KWizard, {
      slots: {
        default: (params) => {
          assertParams = params

          return h(KSteps, {}, [step1, step2])
        }
      }
    })

    assertParams!.context.setStep('2')
    await nextTick()


    expect(wrapper.html()).not.toContain('<h2>First step</h2>')
    expect(wrapper.html()).toContain('<h2>Second step</h2>')
  })

  it('changes steps when `nextStep` method is called', async () => {
    // https://github.com/vuejs/test-utils/blob/9d3c2a6526f3d8751d29b2f9112ad2a3332bbf52/tests/mountingOptions/slots.spec.ts#L5
    let assertParams

    const step1 = h(KStep, {id: '1'}, () => [h('h2', 'First step')])
    const step2 = h(KStep, {id: '2'}, () => [h('h2', 'Second step')])

    const wrapper = mount(KWizard, {
      slots: {
        default: (params) => {
          assertParams = params

          return h(KSteps, {}, [step1, step2])
        }
      }
    })


    expect(wrapper.html()).toContain('<h2>First step</h2>')
    expect(wrapper.html()).not.toContain('<h2>Second step</h2>')

    assertParams!.context.nextStep()
    await nextTick()


    expect(wrapper.html()).not.toContain('<h2>First step</h2>')
    expect(wrapper.html()).toContain('<h2>Second step</h2>')
  })

  it('changes steps when `prevStep` method is called', async () => {
    // https://github.com/vuejs/test-utils/blob/9d3c2a6526f3d8751d29b2f9112ad2a3332bbf52/tests/mountingOptions/slots.spec.ts#L5
    let assertParams

    const step1 = h(KStep, {id: '1'}, () => [h('h2', 'First step')])
    const step2 = h(KStep, {id: '2'}, () => [h('h2', 'Second step')])

    const wrapper = mount(KWizard, {
      slots: {
        default: (params) => {
          assertParams = params

          return h(KSteps, {}, [step1, step2])
        }
      }
    })

    assertParams!.context.setStep('2')
    await nextTick()

    // go back to the first page
    assertParams!.context.prevStep()
    await nextTick()


    expect(wrapper.html()).toContain('<h2>First step</h2>')
    expect(wrapper.html()).not.toContain('<h2>Second step</h2>')
  })

  it('doesn\'t change steps on `nextStep` if the current step is the last', async () => {
    // https://github.com/vuejs/test-utils/blob/9d3c2a6526f3d8751d29b2f9112ad2a3332bbf52/tests/mountingOptions/slots.spec.ts#L5
    let assertParams

    const step1 = h(KStep, {id: '1'}, () => [h('h2', 'First step')])
    const step2 = h(KStep, {id: '2'}, () => [h('h2', 'Second step')])

    const wrapper = mount(KWizard, {
      slots: {
        default: (params) => {
          assertParams = params

          return h(KSteps, {}, [step1, step2])
        }
      }
    })

    assertParams!.context.setStep('2')
    await nextTick()

    assertParams!.context.nextStep()
    await nextTick()


    expect(wrapper.html()).not.toContain('<h2>First step</h2>')
    expect(wrapper.html()).toContain('<h2>Second step</h2>')
  })

  it('doesn\'t change steps on `prevStep` if the current step is the first', async () => {
    // https://github.com/vuejs/test-utils/blob/9d3c2a6526f3d8751d29b2f9112ad2a3332bbf52/tests/mountingOptions/slots.spec.ts#L5
    let assertParams

    const step1 = h(KStep, {id: '1'}, () => [h('h2', 'First step')])
    const step2 = h(KStep, {id: '2'}, () => [h('h2', 'Second step')])

    const wrapper = mount(KWizard, {
      slots: {
        default: (params) => {
          assertParams = params

          return h(KSteps, {}, [step1, step2])
        }
      }
    })

    assertParams!.context.prevStep()
    await nextTick()


    expect(wrapper.html()).toContain('<h2>First step</h2>')
    expect(wrapper.html()).not.toContain('<h2>Second step</h2>')
  })

  it('changes steps on `prevStep` when `cycled` prop is passed', async () => {
    // https://github.com/vuejs/test-utils/blob/9d3c2a6526f3d8751d29b2f9112ad2a3332bbf52/tests/mountingOptions/slots.spec.ts#L5
    let assertParams

    const step1 = h(KStep, {id: '1'}, () => [h('h2', 'First step')])
    const step2 = h(KStep, {id: '2'}, () => [h('h2', 'Second step')])

    const wrapper = mount(KWizard, {
      props: {
        cycled: true,
      },
      slots: {
        default: (params) => {
          assertParams = params

          return h(KSteps, {}, [step1, step2])
        }
      }
    })

    assertParams!.context.prevStep()
    await nextTick()


    expect(wrapper.html()).not.toContain('<h2>First step</h2>')
    expect(wrapper.html()).toContain('<h2>Second step</h2>')
  })

  it('changes steps on `nextStep` when `cycled` prop is passed', async () => {
    // https://github.com/vuejs/test-utils/blob/9d3c2a6526f3d8751d29b2f9112ad2a3332bbf52/tests/mountingOptions/slots.spec.ts#L5
    let assertParams

    const step1 = h(KStep, {id: '1'}, () => [h('h2', 'First step')])
    const step2 = h(KStep, {id: '2'}, () => [h('h2', 'Second step')])

    const wrapper = mount(KWizard, {
      props: {
        cycled: true,
      },
      slots: {
        default: (params) => {
          assertParams = params

          return h(KSteps, {}, [step1, step2])
        }
      }
    })

    assertParams!.context.setStep('2')
    assertParams!.context.nextStep()
    await nextTick()

    expect(wrapper.html()).toContain('<h2>First step</h2>')
    expect(wrapper.html()).not.toContain('<h2>Second step</h2>')
  })
})
