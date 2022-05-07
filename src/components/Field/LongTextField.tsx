import { Textarea, TextareaProps } from "@chakra-ui/react"
import React from "react"
import { ControllerRenderProps } from "react-hook-form"

export interface LongTextFieldProps extends TextareaProps {
  field?: ControllerRenderProps
}

export default function TextareaField({ field, ...props }: LongTextFieldProps) {
  return <Textarea {...field} {...props} />
}
