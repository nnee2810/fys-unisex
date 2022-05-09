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
      {icon?.before && <InputLeftElement>{icon.before}</InputLeftElement>}
      <Input
        h="38px"
        focusBorderColor={colors.primary}
        borderColor={colors.lightGray}
        {...props}
      />
      {icon?.after && <InputRightElement>{icon?.after}</InputRightElement>}
    </InputGroup>
  )
}
