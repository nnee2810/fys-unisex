import { Skeleton, Td, Tr } from "@chakra-ui/react"
import { getArrayNumber } from "utils"

interface TableSkeletonProps {
  rows: number
  columns?: number
}

export function TableSkeleton({ rows, columns }: TableSkeletonProps) {
  return (
    <>
      {getArrayNumber(columns || 10).map((column) => (
        <Tr key={column}>
          {getArrayNumber(rows).map((row) => (
            <Td key={row}>
              <Skeleton h="36px" borderRadius="6" />
            </Td>
          ))}
        </Tr>
      ))}
    </>
  )
}
