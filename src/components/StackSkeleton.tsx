import { Skeleton, Stack } from "@chakra-ui/react"
import { getArrayNumber } from "utils"

interface StackSkeletonProps {
  value: number
  spacing?: string
  h?: string
}

export function StackSkeleton({ value, spacing, h }: StackSkeletonProps) {
  return (
    <Stack spacing={spacing}>
      {getArrayNumber(value).map((i) => (
        <Skeleton h={h} borderRadius="6" key={i} />
      ))}
    </Stack>
  )
}
