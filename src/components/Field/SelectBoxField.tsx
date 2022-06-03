import { HStack } from "@chakra-ui/react"
import Button from "components/Button"
import { ISelectOption } from "interfaces/ISelectOption"
import React from "react"

interface SelectBoxFieldProps {
  options: ISelectOption[]
  onChange?: (value: string) => void
  value?: string
}

export default function SelectBoxField({
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
