import { Box, Text } from "@chakra-ui/react"
import styled from "@emotion/styled"
import React from "react"
import { Controller, ControllerProps, useFormContext } from "react-hook-form"

interface FieldProps extends ControllerProps {
  name: string
  label?: string
}

export default function Field({
  name,
  render,
  label,
  defaultValue,
}: FieldProps) {
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
        render={render}
        defaultValue={defaultValue}
      />
      {errors?.[name]?.message && (
        <Text color="red" fontSize="12">
          {errors[name].message}
        </Text>
      )}
    </Box>
  )
}
export const FieldLabel = styled(Text)`
  font-size: 12px;
  font-weight: 700;
  color: gray;
`
