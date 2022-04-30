import { Textarea } from "@chakra-ui/react"
import React from "react"
import { ControllerRenderProps } from "react-hook-form"
import { colors } from "styles/colors"
import { BaseFieldProps } from "."

interface LongTextFieldProps extends BaseFieldProps {
  field: ControllerRenderProps
}

export default function LongTextField({
  placeholder,
  isDisabled,
  isInvalid,
  field,
}: LongTextFieldProps) {
  return (
    <Textarea
      placeholder={placeholder}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      focusBorderColor={colors.green}
      {...field}
    />
  )
}
