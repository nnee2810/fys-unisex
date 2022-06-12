import { Box, Center } from "@chakra-ui/react"
import { ReactNode } from "react"
import { Color } from "styles/theme"

interface BadgeProps {
  children: ReactNode
  value: number
  max?: number
}

export function Badge({ children, value, max }: BadgeProps) {
  return (
    <Box pos="relative">
      {children}
      <Center
        pos="absolute"
        top="-8px"
        right="-8px"
        minW="20px"
        h="20px"
        px="1"
        border="2px solid white"
        borderRadius="10"
        bg={Color.RED}
        color="white"
        fontSize="11"
        fontWeight="500"
      >
        {max ? (value > max ? max + "+" : value) : value}
      </Center>
    </Box>
  )
}
