import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react"
import React, { forwardRef, ReactElement } from "react"
import { colors } from "styles/theme"

export interface TextFieldProps extends InputProps {
  icon?: {
    before?: ReactElement
    after?: ReactElement
  }
}
const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ icon, ...props }, ref) => (
    <InputGroup>
      {icon?.before && <InputLeftElement>{icon.before}</InputLeftElement>}
      <Input
        h="38px"
        focusBorderColor={colors.primary}
        borderColor={colors.lightGray}
        {...props}
        ref={ref}
      />
      {icon?.after && <InputRightElement>{icon?.after}</InputRightElement>}
    </InputGroup>
  )
)
export default TextField
