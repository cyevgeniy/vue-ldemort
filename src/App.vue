<script setup lang="ts">
import KWizzard from './components/KWizzard.vue'
import KSteps from './components/KSteps.vue'
import KStep from './components/KStep.vue'
import type { WizzardState } from './utils/wizzardContext'

function next(context: WizzardState ) {
  context.nextStep()  
}

function prev(context: WizzardState ) {
  //context.setStep('two')
  context.prevStep()
}
</script>

<template>
  <div>
    <KWizzard cycled v-slot="{context}" class="wizzard">
      <KSteps>
        <KStep id="one">
          <h2> Slide one </h2>
        </KStep>
        <KStep id="two">
          <h2> Slide two </h2>
        </KStep>
        <KStep id="three">
          <h2> Slide three </h2>
        </KStep>
        <KStep id="four">
          <h2> Slide four </h2>
          <h2> Slide four </h2>
          <h2> Slide four </h2>
        </KStep>
      </KSteps>

      <button @click="prev(context)"> Prev </button>
      <button @click="next(context)"> Next </button>
    </KWizzard>
  </div>
</template>

<style scoped>
.wizzard {
  padding: 2rem;
  background-color: #fafafa;
  height: 400px;
  overflow-y: auto;
  display: fixed;
  height: 100vh;
  width: 100vw;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
