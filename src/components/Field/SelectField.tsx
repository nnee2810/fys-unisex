import { ISelectOption } from "interfaces"
import Select, { Props as SelectProps, Theme } from "react-select"
import styled from "styled-components"
import { Color } from "styles/theme"

interface SelectFieldProps<T> {
  options: ISelectOption<T>[]
  value?: T
  placeholder?: string
  isClearable?: boolean
  onChange?: (value?: T) => void
}

export function SelectField<T>({
  options,
  value,
  placeholder,
  isClearable,
  onChange,
}: SelectFieldProps<T>) {
  const handleChange = (selected: unknown) => {
    if (!onChange) return
    if (!selected) return onChange(undefined)
    onChange((selected as ISelectOption<T>).value)
  }

  return (
    <StyledSelect
      options={options}
      value={options.filter((option) => option.value === value)}
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
