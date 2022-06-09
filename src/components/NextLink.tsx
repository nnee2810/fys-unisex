import Link, { LinkProps } from "next/link"
import React, { ReactNode } from "react"
import styled from "styled-components"

interface NextLinkProps extends LinkProps {
  children?: ReactNode
  styleOnHover?: boolean
}

export default function NextLink({
  as,
  href,
  children,
  styleOnHover,
}: NextLinkProps) {
  return (
    <Link as={as} href={href} passHref>
      <StyledLink styleOnHover={styleOnHover}>{children}</StyledLink>
    </Link>
  )
}

const StyledLink = styled.a<{ styleOnHover?: boolean }>`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 0;
    height: 1px;
    background-color: currentcolor;
    transition: all 0.2s;
  }

  &:hover::before {
    width: ${({ styleOnHover }) => styleOnHover && "100%"};
  }
`
