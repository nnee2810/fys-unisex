import { Checkbox, CheckboxProps, Text } from "@chakra-ui/react"

interface CheckboxFieldProps extends CheckboxProps {
  label: string
}

export function CheckboxField({ label, ...props }: CheckboxFieldProps) {
  return (
    <Checkbox size="lg" {...props}>
      <Text fontSize="14" fontWeight="500">
        {label}
      </Text>
    </Checkbox>
  )
}
