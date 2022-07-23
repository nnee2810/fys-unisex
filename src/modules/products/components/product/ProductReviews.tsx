import { Box, Heading, Stack } from "@chakra-ui/react"
import { NextRate } from "components"

export function ProductReviews() {
  return (
    <Box id="reviews">
      <Heading size="md">
        50 đánh giá (5/5{" "}
        <Box as="span">
          <NextRate count={1} value={1} size={28} />
        </Box>
        )
      </Heading>
      <Stack spacing="6" mt="6"></Stack>
    </Box>
  )
}
