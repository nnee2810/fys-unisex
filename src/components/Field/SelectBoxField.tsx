import { HStack } from "@chakra-ui/react"
import { NextButton } from "components"
import { ISelectOption } from "interfaces"

interface SelectBoxFieldProps {
  options: ISelectOption[]
  onChange?: (value: number | string) => void
  value?: number | string
}

export function SelectBoxField({
  options,
  onChange,
  value,
}: SelectBoxFieldProps) {
  const handleChangeSelect = (newValue: number | string) => {
    newValue = newValue === value ? "" : newValue
    if (onChange) onChange(newValue)
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
