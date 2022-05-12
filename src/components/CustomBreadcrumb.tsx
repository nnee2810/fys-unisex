import { Breadcrumb, BreadcrumbItem, Text } from "@chakra-ui/react"
import { ILinkItem } from "interfaces/ILinkItem"
import React from "react"
import { BiChevronRight } from "react-icons/bi"
import CustomLink from "./CustomLink"

interface CustomBreadcrumbProps {
  data: ILinkItem[]
}

export default function CustomBreadcrumb({ data }: CustomBreadcrumbProps) {
  return (
    <Breadcrumb separator={<BiChevronRight />} mb="20px" fontSize="16">
      {data.map((item, idx) => (
        <BreadcrumbItem key={idx}>
          <CustomLink href={item.href}>
            <Text _hover={{ textDecoration: "underline" }}>{item.name}</Text>
          </CustomLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}
