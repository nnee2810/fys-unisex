import { Box } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { cloneElement, ReactElement } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Color } from "styles/theme"

interface FieldProps {
  name: string
  component: ReactElement
  label?: string
}

export function Field({ name, component, label }: FieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Box>
      {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) =>
          cloneElement(component, {
            id: name,
            name,
            value,
            onChange(e: any) {
              if (component.props?.onChange) component.props?.onChange(e)
              onChange(e)
            },
          })
        }
      />
      {errors?.[name]?.message && (
        <FieldError>{errors[name].message}</FieldError>
      )}
    </Box>
  )
}
export const FieldLabel = styled.label`
  font-size: 12px;
  font-weight: 700;
`
export const FieldError = styled.div`
  margin-top: 2px;
  color: ${Color.RED};
  font-size: 12px;
`

export * from "./CheckboxField"
export * from "./LongTextField"
export * from "./RangeSliderField"
export * from "./SelectBoxField"
export * from "./SelectField"
export * from "./TextField"
