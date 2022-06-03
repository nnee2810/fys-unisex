import { Box } from "@chakra-ui/react"
import { responsiveW } from "configs/constants"
import React, { ReactNode } from "react"

interface PageContainerProps {
  children: ReactNode
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <Box w={{ ...responsiveW }} mx="auto" py="30px">
      {children}
    </Box>
  )
}
