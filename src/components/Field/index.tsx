import { Box, Text } from "@chakra-ui/react"
import { ISelectOption } from "interfaces/ISelectOption"
import React, {
  ChangeEventHandler,
  FocusEventHandler,
  ReactElement,
} from "react"
import { Controller, useFormContext } from "react-hook-form"
import LongTextField from "./LongTextField"
import RangeSliderField from "./RangeSliderField"
import SelectField from "./SelectField"
import TextField from "./TextField"

export interface FieldProps {
  variant: "TEXT" | "LONGTEXT" | "SELECT" | "FILE" | "RANGE_SLIDER"
  name: string
  label?: string
  placeholder?: string

  defaultValue?: number | string | null
  type?: string
  icon?: {
    before?: ReactElement
    after?: ReactElement
  }
  options?: ISelectOption[]
  min?: number
  max?: number
  step?: number
  isDisabled?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
  formatValue?: (value: number) => string
}

export default function Field({
  variant,
  name,
  type,
  label,
  placeholder,
  options,
  min,
  max,
  step,
  icon,
  isDisabled,
  onChange,
  onFocus,
  onBlur,
  formatValue,
}: FieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Box>
      {label && (
        <Text fontSize="12" fontWeight="700" color="gray">
          {label}
        </Text>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            {variant === "TEXT" && (
              <TextField
                type={type}
                placeholder={placeholder}
                isDisabled={isDisabled}
                isInvalid={!!errors[name]}
                icon={icon}
                field={field}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            )}
            {variant === "LONGTEXT" && (
              <LongTextField
                placeholder={placeholder}
                isDisabled={isDisabled}
                isInvalid={!!errors[name]}
                field={field}
              />
            )}
            {variant === "SELECT" && (
              <SelectField
                placeholder={placeholder}
                isDisabled={isDisabled}
                isInvalid={!!errors[name]}
                options={options!}
                field={field}
              />
            )}
            {variant === "RANGE_SLIDER" && (
              <RangeSliderField
                min={min!}
                max={max!}
                step={step}
                formatValue={formatValue}
              />
            )}
          </>
        )}
      />
      {errors?.[name]?.message && (
        <Text color="red" fontSize="12">
          {errors[name].message}
        </Text>
      )}
    </Box>
  )
}
