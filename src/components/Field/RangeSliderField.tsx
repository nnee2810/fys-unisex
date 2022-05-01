import {
  Box,
  Flex,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from "@chakra-ui/react"
import React, { useState } from "react"

interface RangeSliderFieldProps {
  min: number
  max: number
  defaultValue?: number[]
  formatValue?: (value: number) => string
  step?: number
}

export default function RangeSliderField({
  min,
  max,
  step,
  defaultValue,
  formatValue,
}: RangeSliderFieldProps) {
  const [value, setValue] = useState(defaultValue || [min, max])

  const handleChange = (value: number[]) => {
    setValue(value)
  }

  return (
    <Box>
      <Flex justifyContent="space-between" fontWeight="500">
        <Text>{formatValue ? formatValue(value[0]) : value[0]}</Text>
        <Text>{formatValue ? formatValue(value[1]) : value[1]}</Text>
      </Flex>
      <RangeSlider
        aria-label={["min", "max"]}
        colorScheme="green"
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue || [min, max]}
        onChange={handleChange}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </Box>
  )
}
