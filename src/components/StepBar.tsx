import { Box } from "@chakra-ui/react"
import { Color } from "styles/theme"

interface StepBarProps {
  steps: string[]
  activeStep: number
}

export function StepBar({ steps, activeStep }: StepBarProps) {
  return (
    <Box mb="4">
      <Box color={Color.GREEN} fontWeight="500">
        {steps[activeStep - 1]} ({activeStep}/{steps.length})
      </Box>
      <Box pos="relative" h="2" bg={Color.LIGHT_GRAY} overflow="hidden">
        <Box
          pos="absolute"
          w={`${(100 / steps.length) * activeStep}%`}
          h="100%"
          bg={Color.GREEN}
          transition="all .5s"
        />
      </Box>
    </Box>
  )
}
