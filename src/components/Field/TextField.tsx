import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react"
import React, { ReactElement } from "react"
import { ControllerRenderProps } from "react-hook-form"
import { colors } from "styles/theme"

export interface TextFieldProps extends InputProps {
  field?: ControllerRenderProps
  icon?: {
    before?: ReactElement
    after?: ReactElement
  }
}

export default function TextField({ field, icon, ...props }: TextFieldProps) {
  return (
    <InputGroup>
      {icon?.before && <InputLeftElement>{icon.before}</InputLeftElement>}
      <Input
        {...field}
        h="38px"
        focusBorderColor={colors.primary}
        borderColor={colors.lightGray}
        {...props}
      />
      {icon?.after && <InputRightElement>{icon?.after}</InputRightElement>}
    </InputGroup>
  )
}
