import React, { forwardRef } from "react"
import Select from "react-select"
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager"
import { colors } from "styles/theme"

interface SelectFieldProps extends StateManagerProps {}
const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ placeholder, ...props }, ref) => (
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
)
SelectField.displayName = "SelectField"
export default SelectField
