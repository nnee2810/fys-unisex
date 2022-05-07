import { Checkbox, CheckboxProps, Text } from "@chakra-ui/react"
import { ControllerRenderProps } from "react-hook-form"

interface CheckboxFieldProps extends CheckboxProps {
  field?: ControllerRenderProps
  label: string
}

export default function CheckboxField({
  field,
  label,
  ...props
}: CheckboxFieldProps) {
  return (
    <Checkbox {...field} {...props} size="lg">
      <Text fontSize="14" fontWeight="500">
        {label}
      </Text>
    </Checkbox>
  )
}
