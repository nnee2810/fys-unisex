import { HStack } from "@chakra-ui/react"
import { NextButton } from "components"
import { ISelectOption } from "interfaces"

interface SelectBoxFieldProps<T> {
  options: ISelectOption<T>[]
  onChange?: (value: T) => void
  value?: T
}

export function SelectBoxField<T>({
  options,
  onChange,
  value,
}: SelectBoxFieldProps<T>) {
  const handleChangeSelect = (selected: T) => {
    if (!onChange) return
    if (selected !== value) onChange(selected)
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
