import { Breadcrumb, BreadcrumbItem, Text } from "@chakra-ui/react"
import { PageTitle } from "configs/constants"
import { ILink } from "interfaces"
import { BiChevronRight } from "react-icons/bi"
import { NextLink } from "./NextLink"

interface NextBreadcrumbProps {
  data: ILink[]
}

export function NextBreadcrumb({ data }: NextBreadcrumbProps) {
  return (
    <Breadcrumb separator={<BiChevronRight />} mb="4" fontSize="16">
      <BreadcrumbItem>
        <NextLink href="/">
          <Text _hover={{ textDecoration: "underline" }}>{PageTitle.HOME}</Text>
        </NextLink>
      </BreadcrumbItem>
      {data.map((item, idx) => (
        <BreadcrumbItem key={idx}>
          <NextLink href={item.href}>
            <Text _hover={{ textDecoration: "underline" }}>{item.name}</Text>
          </NextLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}
