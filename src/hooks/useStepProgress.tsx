import { useState } from "react"

export function useStepProgress() {
  const [activeStep, setActiveStep] = useState(0)

  const prevStep = () => setActiveStep(activeStep - 1)

  const nextStep = () => setActiveStep(activeStep + 1)

  return {
    activeStep,
    prevStep,
    nextStep,
  }
}
