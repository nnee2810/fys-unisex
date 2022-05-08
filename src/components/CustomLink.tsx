import Link, { LinkProps } from "next/link"
import React, { ReactNode } from "react"

interface CustomLinkProps extends LinkProps {
  children?: ReactNode
}

export default function CustomLink({ as, href, children }: CustomLinkProps) {
  return (
    <Link as={as} href={href} passHref>
      <a>{children}</a>
    </Link>
  )
}
