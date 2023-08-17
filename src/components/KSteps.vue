<script setup lang="ts">
import { Comment, Fragment ,inject, useSlots } from 'vue'
import type { VNode } from 'vue'
import { key } from '../utils/wizzardContext'

const context = inject(key)

if (!context)
  throw new Error('Steps component should have parent KWizzard component')

const slots = useSlots()

function getChilds(children: VNode[]): VNode[] {
  let res: VNode[] = []
  for (const node of children) {
    if (node.type === Comment)
      continue

    if (node.type === Fragment) {
      res = [...res, ...getChilds(node.children as VNode[])]
    } else {
      res.push(node)
    }
  }

  return res
}

function getStepsArray(): string[] {
  return getChilds(slots.default?.() ?? []).map(item => item.props?.id ) ?? []
}

context.steps.value = getStepsArray()

// automagically set current page to the first step
context.currentStep.value = context.steps.value.length > 0 ? context.steps.value[0] : undefined

</script>

<template>
  <div>
    <slot />
  </div>
</template>
