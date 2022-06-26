import { Box, Flex, Heading } from "@chakra-ui/react"
import { ReactNode } from "react"

interface PageHeaderProps {
  label: string
  actions?: ReactNode
}

export function PageHeader({ label, actions }: PageHeaderProps) {
  return (
    <Box>
      <Flex mb="4" justifyContent="space-between" alignItems="center">
        <Heading size="lg">{label}</Heading>
        {actions && <Box>{actions}</Box>}
      </Flex>
    </Box>
  )
}
