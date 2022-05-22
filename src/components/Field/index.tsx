import { Box, Text } from "@chakra-ui/react"
import styled from "@emotion/styled"
import React, { cloneElement, ReactElement } from "react"
import { Controller, useFormContext } from "react-hook-form"

interface FieldProps {
  name: string
  component: ReactElement
  label?: string
}

export default function Field({ name, component, label }: FieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Box>
      {label && <FieldLabel>{label}</FieldLabel>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) =>
          cloneElement(component, {
            name,
            value,
            onChange(e: any) {
              if (component.props?.onChange) component.props?.onChange(e)
              onChange(e)
            },
            isInvalid: !!errors?.[name],
          })
        }
      />
      {errors?.[name]?.message && (
        <Text mt="2px" color="red" fontSize="12">
          {errors[name].message}
        </Text>
      )}
    </Box>
  )
}
export const FieldLabel = styled(Text)`
  margin-bottom: 2px;
  font-size: 12px;
  font-weight: 700;
`
