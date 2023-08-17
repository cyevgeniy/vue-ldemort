<script setup lang="ts">
import { inject, useSlots } from 'vue'
import { key } from '../utils/wizzardContext'

const context = inject(key)

if (!context)
  throw new Error('Steps component should have parent KWizzard component')

const slots = useSlots()

// TODO: handle Fragments and Comments
function getStepsArray(): string[] {
  return slots.default?.().map(item => item.props?.id ) ?? []
}

context.steps = getStepsArray()

// automagically set current page to the first step
context.currentStep.value = context.steps.length > 0 ? context.steps[0] : undefined

</script>

<template>
  <div>
    <slot />
  </div>
</template>
