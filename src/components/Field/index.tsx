import { Box, Text } from "@chakra-ui/react"
import { ISelectOption } from "interfaces/ISelectOption"
import React, {
  ChangeEventHandler,
  FocusEventHandler,
  ReactElement,
} from "react"
import { Controller, useFormContext } from "react-hook-form"
import LongTextField from "./LongTextField"
import SelectField from "./SelectField"
import TextField from "./TextField"

export interface BaseFieldProps {
  placeholder?: string
  isDisabled?: boolean
  isInvalid?: boolean
}

export interface FieldProps extends BaseFieldProps {
  variant: "TEXT" | "LONGTEXT" | "SELECT" | "FILE"
  name: string
  label?: string
  defaultValue?: number | string | null
  type?: string
  icon?: {
    before?: ReactElement
    after?: ReactElement
  }
  options?: ISelectOption[]
  onChange?: ChangeEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
}

export default function Field({
  variant,
  name,
  type,
  label,
  placeholder,
  options,
  isDisabled,
  icon,
  onChange,
  onFocus,
  onBlur,
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
