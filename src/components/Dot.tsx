import { Box } from "@chakra-ui/react"
import { Color } from "styles/theme"

interface DotProps {
  value: boolean
  size?: number
}

export function Dot({ value, size }: DotProps) {
  return (
    <Box
      w={size ? size + "px" : "8px"}
      h={size ? size + "px" : "8px"}
      bg={value ? Color.GREEN : Color.RED}
      borderRadius="100%"
    />
  )
}
