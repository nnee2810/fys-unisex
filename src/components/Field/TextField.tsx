import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react"
import React, {
  ChangeEventHandler,
  FocusEventHandler,
  ReactElement,
} from "react"
import { ControllerRenderProps } from "react-hook-form"
import { colors } from "styles/colors"

interface TextFieldProps {
  placeholder?: string
  isDisabled?: boolean
  isInvalid: boolean
  type?: string
  icon?: {
    before?: ReactElement
    after?: ReactElement
  }
  field?: ControllerRenderProps
  onChange?: ChangeEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
}

export default function TextField({
  placeholder,
  isDisabled,
  isInvalid,
  type,
  icon,
  field,
  onChange,
  onFocus,
  onBlur,
}: TextFieldProps) {
  return (
    <InputGroup>
      {icon?.before && <InputLeftElement>{icon.before}</InputLeftElement>}
      <Input
        type={type}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        focusBorderColor={colors.green}
        {...field}
        onChange={(e) => {
          field?.onChange(e)
          onChange && onChange(e)
        }}
        onFocus={onFocus}
        onBlur={(e) => {
          field?.onBlur()
          onBlur && onBlur(e)
        }}
      />
      {icon?.after && <InputRightElement>{icon?.after}</InputRightElement>}
    </InputGroup>
  )
}
