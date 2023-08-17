<script setup lang="ts">
import { computed, provide, ref } from 'vue'
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

const currentStep = ref()
let steps = ref<string[]>([])

const len = computed(() => steps.value.length)

function setStep(id: string) {
  if (currentStep.value)
    currentStep.value = id
}

function nextStep() {
  if (len.value === 0)
    return

  // If current step is not set, 
  // switch to the first step
  if (!currentStep.value) {
    setStep(steps.value[0])
    return
  }

  const idx = steps.value.indexOf(currentStep.value)

  if (idx !== -1)
    setStep(steps.value[idx < len.value - 1 ? idx + 1 : props.cycled ? 0 : idx])
    
}

function prevStep() {
  if (len.value === 0)
    return

  // If current step is not set, 
  // switch to the first step
  if (!currentStep.value) {
    setStep(steps.value[0])
    return
  }

  const idx = steps.value.indexOf(currentStep.value)
    
  if (idx !== -1)
    setStep(steps.value[idx > 0 ? idx - 1 : props.cycled ? len.value - 1 : idx])

}
const close = () => isOpen.value = false

const wizzardContext: WizzardState = {
  currentStep,
  steps,
  nextStep,
  prevStep,
  setStep,
  close
}

provide(key, wizzardContext)
</script>

<template>
  <div v-if="isOpen">
    <slot :context="wizzardContext" />
  </div>
</template>
