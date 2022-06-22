import { Box, Flex, Heading } from "@chakra-ui/react"
import { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  actions?: ReactNode
}

export function PageHeader({ title, actions }: PageHeaderProps) {
  return (
    <Box>
      <Flex mb="4" justifyContent="space-between" alignItems="center">
        <Heading size="lg">{title}</Heading>
        {actions && <Box>{actions}</Box>}
      </Flex>
    </Box>
  )
}
