import { Box, Text } from "@chakra-ui/react"
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
      {label && (
        <Text fontSize="12" fontWeight="700" color="gray">
          {label}
        </Text>
      )}
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
