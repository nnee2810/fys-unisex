import React from "react"
import { ControllerRenderProps } from "react-hook-form"
import Select from "react-select"
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager"
import { colors } from "styles/theme"

interface SelectFieldProps extends StateManagerProps {
  field?: ControllerRenderProps
}

export default function SelectField({
  field,
  placeholder,
  ...props
}: SelectFieldProps) {
  return (
    <Select
      {...field}
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
