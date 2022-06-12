import { Box, Grid, HStack, Text } from "@chakra-ui/react"
import { ImageBox, Rate } from "components"
import { IReview } from "interfaces"
import moment from "moment"
import { Color } from "styles/theme"

interface ProductReviewProps {
  data: IReview
}

export function ProductReview({ data }: ProductReviewProps) {
  return (
    <Grid templateColumns="40px auto" gap="2">
      <ImageBox
        src={data.user.image}
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
          <Rate allowHalf disabled value={data.rate} />
          <Text>|</Text>
          <Text>{moment(data.createdAt).format("DD/MM/YYYY HH:mm")}</Text>
        </HStack>
        <Text mt="2">{data.content}</Text>
      </Box>
    </Grid>
  )
}
