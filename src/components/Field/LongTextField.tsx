import { Textarea, TextareaProps } from "@chakra-ui/react"

interface LongTextFieldProps extends TextareaProps {}

export function TextareaField(props: LongTextFieldProps) {
  return <Textarea {...props} />
}
