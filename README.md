# Vue-ldemort

Vue-ldemort is a headless component for Vue 3 which helps you
to create wizards in your own way, handling navigation implementation for you.
It's inspired by the [react-albus](https://github.com/americanexpress/react-albus)
component library.

## Installation

```
npm i vue-ldemort
```

## Components

- KWizard. The root wrapper.
- KSteps. Wrapper for pages. Accepts only KStep components as childs.
- KStep. Wrapper for a page. Has a required `id` prop.

The top node of each of these components is a `div`, so you can
freely style them whatever you like.

## Basic example

```
<script setup lang="ts">
import { KWizard, KSteps, KStep, WizardState } from 'vue-ldemort'
</script>

<template>
    <KWizard cycled v-slot="{context}">
      <h2> Wizard demo </h2>
      <KSteps>
        <KStep id="1">
          Step one
        </KStep>
        <KStep id="2">
          Step two
        </KStep>
        <KStep id="3">
          Step three
        </KStep>
      </KSteps>
      <button @click="onPrev(context)"> Prev page </button>
      <button @click="context.nextStep()"> Next page </button>
      <button @click="context.setStep('2')"> Go to the second page </button>
  </KWizard>
</template>
```

`KWizard` exposes a `WizardState` object via a scoped slot. This object implements
basic navigation functions:

```
export interface WizardState {
  /*
   * Array of step's ids
   */
  steps: Ref<string[]>

  /**
   * currently active step
   */
  currentStep: Ref<string | undefined>,

  /**
   * Sets current page
   */
  setStep(id: string): void

  /**
   * Go to next slide
   */
  nextStep(): void

  /**
   * Go to prev slide
   */
  prevStep(): void
}
```
