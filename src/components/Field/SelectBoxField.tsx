import { HStack } from "@chakra-ui/react"
import Button from "components/Button"
import { ISelectOption } from "interfaces/ISelectOption"
import React, { useState } from "react"

type OptionValueType = number | string

interface SelectBoxFieldProps {
  options: ISelectOption<OptionValueType>[]
  onChange?: (value: OptionValueType) => void
  defaultValue?: string | null
}

export default function SelectBoxField({
  options,
  onChange,
  defaultValue,
}: SelectBoxFieldProps) {
  const [selected, setSelected] = useState<OptionValueType | null | undefined>(
    defaultValue
  )

  const handleChangeSelect = (value: OptionValueType) => {
    if (onChange) onChange(value)
    setSelected(value)
  }

  return (
    <HStack>
      {options.map((option, idx) => (
        <Button
          minW="60px"
          colorScheme={option.value === selected ? "primary" : "gray"}
          onClick={() => handleChangeSelect(option.value)}
          key={idx}
        >
          {option.label}
        </Button>
      ))}
    </HStack>
  )
}
