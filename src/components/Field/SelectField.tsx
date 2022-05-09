import React from "react"
import Select from "react-select"
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager"
import { colors } from "styles/theme"

interface SelectFieldProps extends StateManagerProps {}

export default function SelectField({
  placeholder,
  ...props
}: SelectFieldProps) {
  return (
    <Select
      {...props}
      placeholder={placeholder || "Chọn ..."}
      isClearable
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          neutral20: colors.lightGray,
          primary25: colors.lightGray,
          primary50: colors.gray,
          primary: colors.primary,
        },
      })}
    />
  )
}
