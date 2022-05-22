import { Box, Flex, Heading } from "@chakra-ui/react"
import { PAGE_PADDING, responsiveW } from "configs/constants"
import { PageProps } from "layout"
import FormSignUp from "modules/auth/components/FormSignUp"
import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import React from "react"

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<PageProps>> {
  return {
    props: {
      title: "Đăng ký",
      protected: false,
    },
  }
}
export default function SignUp() {
  return (
    <Flex
      w={{ ...responsiveW }}
      mx="auto"
      py={PAGE_PADDING}
      flexDir="column"
      alignItems="center"
    >
      <Heading>Đăng ký</Heading>
      <Box w={{ base: "100%", md: "600px" }} mt="8">
        <FormSignUp />
      </Box>
    </Flex>
  )
}
