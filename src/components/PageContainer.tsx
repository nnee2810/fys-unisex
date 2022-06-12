import { Box } from "@chakra-ui/react"
import { responsiveW } from "configs/constants"
import { ReactNode } from "react"

interface PageContainerProps {
  children: ReactNode
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <Box w={{ ...responsiveW }} mx="auto" py="30px">
      {children}
    </Box>
  )
}
