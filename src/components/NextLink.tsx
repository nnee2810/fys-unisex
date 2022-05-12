import Link, { LinkProps } from "next/link"
import React, { ReactNode } from "react"

interface NextLinkProps extends LinkProps {
  children?: ReactNode
}

export default function NextLink({ as, href, children }: NextLinkProps) {
  return (
    <Link as={as} href={href} passHref>
      <a>{children}</a>
    </Link>
  )
}
