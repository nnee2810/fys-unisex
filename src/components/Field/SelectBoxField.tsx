import { HStack } from "@chakra-ui/react"
import { NextButton } from "components"
import { ISelectOption } from "interfaces"

interface SelectBoxFieldProps {
  options: ISelectOption[]
  onChange?: (value: unknown) => void
  value?: unknown
}

export function SelectBoxField({
  options,
  onChange,
  value,
}: SelectBoxFieldProps) {
  const handleChangeSelect = (newValue: unknown) => {
    if (!onChange) return
    if (newValue !== value) onChange(newValue)
  }

  return (
    <HStack>
      {options.map((option, idx) => (
        <NextButton
          minW="60px"
          colorScheme={option.value === value ? "primary" : "gray"}
          onClick={() => handleChangeSelect(option.value)}
          key={idx}
        >
          {option.label}
        </NextButton>
      ))}
    </HStack>
  )
}
