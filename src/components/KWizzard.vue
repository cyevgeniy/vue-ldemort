<script setup lang="ts">
import { provide, ref } from 'vue'
import { key } from '../utils/wizzardContext'
import type { WizzardState } from '../utils/wizzardContext'

const props = withDefaults(defineProps<{
  /**
   * If true, nextStep and prevStep will
   * switch to the first/last step when current
   * step is last/first
   */
  cycled?: boolean
}>(), {
  cycled: false,
})

const isOpen = ref(true)

const wizzardContext: WizzardState = {
  currentStep: ref(),
  setStep(id: string) {
    if (this.currentStep.value)
      this.currentStep.value = id
  },
  nextStep() {
    const len = this.steps.length
    if (len === 0)
      return

    // If current step is not set, 
    // switch to the first step
    if (!this.currentStep.value) {
      this.setStep(this.steps[0])
      return
    }

    const idx = this.steps.indexOf(this.currentStep.value)


    if (idx !== -1)
      this.setStep(this.steps[idx < len - 1 ? idx + 1 : props.cycled ? 0 : idx])
      
  },
  prevStep() {
    const len = this.steps.length
    if (len === 0)
      return

    // If current step is not set, 
    // switch to the first step
    if (!this.currentStep.value) {
      this.setStep(this.steps[0])
      return
    }

    const idx = this.steps.indexOf(this.currentStep.value)
      
    if (idx !== -1)
      this.setStep(this.steps[idx > 0 ? idx - 1 : props.cycled ? len - 1 : idx])

  },
  steps: [],
  close: () => isOpen.value = false,
}

provide(key, wizzardContext)
</script>

<template>
  <div v-if="isOpen">
    <slot :context="wizzardContext" />
  </div>
</template>
