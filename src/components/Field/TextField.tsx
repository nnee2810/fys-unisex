import {
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react"
import StyledInput from "components/chakra/StyledInput"
import React, { ReactElement } from "react"

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
      <StyledInput {...props} />
      {icon?.after && (
        <InputRightElement h="100%">{icon?.after}</InputRightElement>
      )}
    </InputGroup>
  )
}
