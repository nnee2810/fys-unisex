import { MenuItem as MI } from "@chakra-ui/react"
import styled from "styled-components"
import { Color } from "styles/theme"

export const MenuItem = styled(MI)`
  &:hover {
    background: ${Color.LIGHT_GRAY};
  }
  &:active {
    background: ${Color.GRAY};
  }
`
