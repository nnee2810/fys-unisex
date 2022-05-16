import React from "react"
import Select from "react-select"
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager"
import styled from "styled-components"
import { colors } from "styles/theme"

interface SelectFieldProps extends StateManagerProps {}

export default function SelectField({
  placeholder,
  ...props
}: SelectFieldProps) {
  return (
    <StyledSelect
      {...props}
      placeholder={placeholder || "Chọn ..."}
      isClearable
      classNamePrefix="react-select"
    />
  )
}
const StyledSelect = styled(Select)<StateManagerProps>`
  .react-select {
    &__control {
      height: 40px;
      border-color: ${colors.lightGray};
      border-radius: 6px;

      &:hover {
        border-color: ${colors.gray};
      }

      &--is-focused {
        box-shadow: 0 0 0 1px ${colors.primary};
        border-color: ${colors.primary} !important;
      }
    }
  }
`
