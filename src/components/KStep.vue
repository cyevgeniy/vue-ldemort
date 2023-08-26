<script setup lang="ts">
import { computed, inject } from 'vue'
import { key } from '../utils/wizardContext'

const props = defineProps<{
  id: string
}>()

const context = inject(key)

if (!context)
  throw new Error('Step component should have parent KWizard component')

const isActive = computed(() => {
  return context.currentStep?.value === props.id
})

</script>

<template>
  <div v-if="isActive">
    <slot />
  </div>
</template>
