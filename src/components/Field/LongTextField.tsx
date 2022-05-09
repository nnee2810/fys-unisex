import { Textarea, TextareaProps } from "@chakra-ui/react"
import React from "react"

export interface LongTextFieldProps extends TextareaProps {}

export default function TextareaField(props: LongTextFieldProps) {
  return <Textarea {...props} />
}
