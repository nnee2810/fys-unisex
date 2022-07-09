import { Box, Grid, HStack, Text } from "@chakra-ui/react"
import { NextImage, NextRate } from "components"
import { IProductReview } from "modules/products/interfaces"
import moment from "moment"
import { Color } from "styles/theme"

interface ProductReviewProps {
  data: IProductReview
}

export function ProductReview({ data }: ProductReviewProps) {
  return (
    <Grid templateColumns="40px auto" gap="2">
      <NextImage
        src={data.user.avatar?.src}
        alt="avatar"
        w="40px"
        h="40px"
        borderRadius="50%"
      />
      <Box>
        <Text fontSize="12" fontWeight="700">
          {data.user.name}
        </Text>
        <HStack color={Color.GRAY} fontSize="12">
          <NextRate allowHalf disabled value={data.rate} />
          <Text>|</Text>
          <Text>{moment(data.created_at).format("DD/MM/YYYY HH:mm")}</Text>
        </HStack>
        <Text mt="2">{data.content}</Text>
      </Box>
    </Grid>
  )
}
