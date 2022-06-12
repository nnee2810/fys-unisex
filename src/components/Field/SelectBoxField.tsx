import { HStack } from "@chakra-ui/react"
import { Button } from "components"
import { ISelectOption } from "interfaces"

interface SelectBoxFieldProps {
  options: ISelectOption[]
  onChange?: (value: string) => void
  value?: string
}

export function SelectBoxField({
  options,
  onChange,
  value,
}: SelectBoxFieldProps) {
  const handleChangeSelect = (newValue: string) => {
    newValue = newValue === value ? "" : newValue
    if (onChange) onChange(newValue)
  }

  return (
    <HStack>
      {options.map((option, idx) => (
        <Button
          minW="60px"
          colorScheme={option.value === value ? "primary" : "gray"}
          onClick={() => handleChangeSelect(option.value)}
          key={idx}
        >
          {option.label}
        </Button>
      ))}
    </HStack>
  )
}
