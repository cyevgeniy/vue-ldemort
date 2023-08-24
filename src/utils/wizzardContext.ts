import type { InjectionKey, Ref } from 'vue'

export type DivElementRef = Ref<HTMLDivElement | undefined>

export interface WizzardState {
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

export const key = Symbol() as InjectionKey<WizzardState>
