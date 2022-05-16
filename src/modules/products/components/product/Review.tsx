import { Box, Grid, HStack, Text } from "@chakra-ui/react"
import ImageBox from "components/ImageBox"
import Rate from "components/Rate"
import { IReview } from "interfaces/IReview"
import moment from "moment"
import React from "react"
import { colors } from "styles/theme"

interface ReviewProps {
  data: IReview
}

export default function Review({ data }: ReviewProps) {
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
          {data.user.fullName}
        </Text>
        <HStack color={colors.gray} fontSize="12">
          <Rate allowHalf disabled value={data.rate} />
          <Text>|</Text>
          <Text>{moment(data.createdAt).format("DD/MM/YYYY HH:mm")}</Text>
        </HStack>
        <Text mt="2">{data.content}</Text>
      </Box>
    </Grid>
  )
}
