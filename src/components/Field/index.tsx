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
        <Text mt="2px" color="red" fontSize="12">
          {errors[name].message}
        </Text>
      )}
    </Box>
  )
}
export const FieldLabel = styled.label`
  font-size: 12px;
  font-weight: 700;
`
