import { Box, Flex, Heading } from "@chakra-ui/react"
import { ILink } from "interfaces"
import { ReactNode } from "react"
import { NextBreadcrumb } from "./NextBreadcrumb"

interface PageHeaderProps {
  title: string
  actions?: ReactNode
  crumbs?: ILink[]
}

export function PageHeader({ title, actions, crumbs }: PageHeaderProps) {
  return (
    <Box>
      {crumbs && <NextBreadcrumb data={crumbs} />}
      <Flex mb="6" justifyContent="space-between">
        <Heading size="lg">{title}</Heading>
        {actions && <Box>{actions}</Box>}
      </Flex>
    </Box>
  )
}
