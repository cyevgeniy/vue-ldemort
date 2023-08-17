import type { InjectionKey, Ref } from 'vue'

export type DivElementRef = Ref<HTMLDivElement | undefined>

export interface WizzardState {
  /*
   * Array of step's ids
   */
  steps: string[]

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

  /**
   * Function that closes current wizzard
   */
  close(): void
}

export const key = Symbol() as InjectionKey<WizzardState>
