<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { key } from '../utils/wizardContext'
import type { WizardState } from '../utils/wizardContext'

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

const currentStep = ref()

const steps = ref<string[]>([])

const len = computed(() => steps.value.length)

function setStep(id: string) {
  if (currentStep.value)
    currentStep.value = id
}

function makeStep(type: 'prev' | 'next') {
  if (len.value === 0)
    return

  // If current step is not set,
  // switch to the first step
  if (!currentStep.value) {
    setStep(steps.value[0])
    return
  }

  const idx = steps.value.indexOf(currentStep.value)

  if (idx !== -1) {
    if (type === 'next')
      setStep(steps.value[idx < len.value - 1 ? idx + 1 : props.cycled ? 0 : idx])
    else
      setStep(steps.value[idx > 0 ? idx - 1 : props.cycled ? len.value - 1 : idx])
  }

}

function nextStep() {
  makeStep('next')
}

function prevStep() {
  makeStep('prev')
}

const wizardContext: WizardState = {
  currentStep,
  steps,
  nextStep,
  prevStep,
  setStep,
}

provide(key, wizardContext)
</script>

<template>
  <div data-test="kwizard-wrapper">
    <slot :context="wizardContext" />
  </div>
</template>
