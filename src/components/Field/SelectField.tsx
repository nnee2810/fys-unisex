import { ISelectOption } from "interfaces"
import Select, { Props as SelectProps, Theme } from "react-select"
import styled from "styled-components"
import { Color } from "styles/theme"

interface SelectFieldProps {
  options: ISelectOption[]
  value?: number | string | null
  placeholder?: string
  isClearable?: boolean
  onChange?: (value?: number | string) => void
}

export function SelectField({
  options,
  value,
  placeholder,
  isClearable,
  onChange,
}: SelectFieldProps) {
  const handleChange = (newValue: unknown) => {
    if (!onChange) return
    if (!newValue) return onChange(undefined)
    onChange((newValue as ISelectOption).value)
  }

  return (
    <StyledSelect
      options={options}
      value={
        value ? options.find((option) => option.value === value) || null : null
      }
      placeholder={placeholder || "Chọn..."}
      isClearable={isClearable}
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
      height: 38px;
      min-height: 38px;
    }
    &__menu {
      z-index: 999;
    }
    &__indicator {
      padding: 7px;
    }
  }
`
