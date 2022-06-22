import { Checkbox, CheckboxProps, Text } from "@chakra-ui/react"

interface CheckboxFieldProps extends CheckboxProps {
  label: string
}

export function CheckboxField({ label, value, ...props }: CheckboxFieldProps) {
  return (
    <Checkbox size="lg" isChecked={!!value} {...props}>
      <Text fontSize="14" fontWeight="500">
        {label}
      </Text>
    </Checkbox>
  )
}
