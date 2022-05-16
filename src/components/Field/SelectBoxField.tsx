import { HStack } from "@chakra-ui/react"
import StyledButton from "components/chakra/StyledButton"
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
        <StyledButton
          minW="60px"
          colorScheme={option.value === selected ? "primary" : "gray"}
          onClick={() => handleChangeSelect(option.value)}
          key={idx}
        >
          {option.label}
        </StyledButton>
      ))}
    </HStack>
  )
}
