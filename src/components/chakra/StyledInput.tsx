import { Input, InputProps } from "@chakra-ui/react"
import React from "react"
import { colors } from "styles/theme"

export default function StyledInput(props: InputProps) {
  return (
    <Input
      h="40px"
      focusBorderColor={colors.primary}
      _hover={{ borderColor: colors.gray }}
      {...props}
    />
  )
}
