import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react"
import React, { ReactElement } from "react"
import { colors } from "styles/theme"

interface TextFieldProps extends InputProps {
  icon?: {
    before?: ReactElement
    after?: ReactElement
  }
}

export default function TextField({ icon, ...props }: TextFieldProps) {
  return (
    <InputGroup>
      {icon?.before && (
        <InputLeftElement h="100%">{icon.before}</InputLeftElement>
      )}
      <Input
        h="40px"
        focusBorderColor={colors.primary}
        _hover={{ borderColor: colors.gray }}
        {...props}
      />
      {icon?.after && (
        <InputRightElement h="100%">{icon?.after}</InputRightElement>
      )}
    </InputGroup>
  )
}
