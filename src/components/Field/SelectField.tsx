import { Select } from "@chakra-ui/react"
import { ISelectOption } from "interfaces/ISelectOption"
import React from "react"
import { ControllerRenderProps } from "react-hook-form"
import { colors } from "styles/colors"

interface SelectFieldProps {
  placeholder?: string
  isDisabled?: boolean
  isInvalid: boolean
  options: ISelectOption[]
  field: ControllerRenderProps
}

export default function SelectField({
  placeholder,
  options,
  isDisabled,
  isInvalid,
  field,
}: SelectFieldProps) {
  return (
    <Select
      placeholder={placeholder}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      focusBorderColor={colors.green}
      {...field}
    >
      {options?.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  )
}
