import { usePrevious } from "@chakra-ui/react"
import { ISelectOption } from "interfaces/ISelectOption"
import React, { useEffect } from "react"
import Select, { Props as SelectProps, Theme } from "react-select"
import styled from "styled-components"
import { Color } from "styles/theme"

interface SelectFieldProps {
  options: ISelectOption[]
  value?: string | string[]
  placeholder?: string
  isMultiple?: boolean
  onChange?: (value: string | string[] | undefined) => void
}

export default function SelectField({
  options,
  value,
  placeholder,
  isMultiple,
  onChange,
}: SelectFieldProps) {
  const optionsPrev = usePrevious(options)

  const handleChange = (newValue: unknown) => {
    if (!onChange) return
    if (!newValue) return onChange("")
    if (isMultiple)
      return onChange(
        (newValue as ISelectOption[])?.map((option) => option.value)
      )
    if ((newValue as ISelectOption).value !== value)
      onChange((newValue as ISelectOption).value)
  }

  useEffect(() => {
    if (!optionsPrev || !onChange) return
    if (optionsPrev.length !== options.length) return onChange("")
    if (JSON.stringify(optionsPrev) !== JSON.stringify(options)) onChange("")
  }, [options])

  return (
    <StyledSelect
      options={options}
      value={
        isMultiple
          ? options.filter((option) => value?.includes(option.value))
          : options.find((option) => option.value === value) || null
      }
      placeholder={placeholder || "Chọn..."}
      isMulti={isMultiple}
      onChange={handleChange}
      classNamePrefix="react-select"
      theme={(theme: Theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: Color.LIGHT_GRAY,
          primary50: Color.GRAY,
          primary: Color.PRIMARY,
          neutral20: Color.GRAY,
          neutral30: Color.DARK_GRAY,
        },
      })}
    />
  )
}
const StyledSelect = styled(Select)<SelectProps>`
  .react-select {
    &__control {
      min-height: 40px;
    }
  }
`
