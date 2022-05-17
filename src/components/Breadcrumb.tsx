import {
  Breadcrumb as B,
  BreadcrumbItem as BItem,
  Text,
} from "@chakra-ui/react"
import { ILinkItem } from "interfaces/ILinkItem"
import React from "react"
import { BiChevronRight } from "react-icons/bi"
import NextLink from "./NextLink"

interface BreadcrumbProps {
  data: ILinkItem[]
}

export default function Breadcrumb({ data }: BreadcrumbProps) {
  return (
    <B separator={<BiChevronRight />} mb="20px" fontSize="16">
      {data.map((item, idx) => (
        <BItem key={idx}>
          <NextLink href={item.href}>
            <Text _hover={{ textDecoration: "underline" }}>{item.name}</Text>
          </NextLink>
        </BItem>
      ))}
    </B>
  )
}
