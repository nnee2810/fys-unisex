import {
  Box,
  Flex,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderProps,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { ControllerRenderProps } from "react-hook-form"

interface RangeSliderFieldProps extends RangeSliderProps {
  field?: ControllerRenderProps
  min: number
  max: number
  formatValue?: (value: number) => string
}

export default function RangeSliderField({
  field,
  min,
  max,
  value,
  formatValue,
  onChange,
  ...props
}: RangeSliderFieldProps) {
  const [range, setRange] = useState(value || [min, max])

  const handleChange = (value: number[]) => {
    setRange(value)
  }

  return (
    <Box>
      <Flex justifyContent="space-between" fontWeight="500">
        <Text>{formatValue ? formatValue(range[0]) : range[0]}</Text>
        <Text>{formatValue ? formatValue(range[1]) : range[1]}</Text>
      </Flex>
      <RangeSlider
        {...field}
        {...props}
        onChange={(value) => {
          onChange && onChange(value)
          handleChange(value)
        }}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} zIndex="0" />
        <RangeSliderThumb index={1} zIndex="0" />
      </RangeSlider>
    </Box>
  )
}
