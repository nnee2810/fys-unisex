import { Box, Flex, Heading } from "@chakra-ui/react"
import PageContainer from "components/PageContainer"
import { Role } from "interfaces/IUser"
import { PageProps } from "layout"
import FormSignIn from "modules/auth/components/FormSignIn"
import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import React from "react"

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<PageProps>> {
  return {
    props: {
      title: "Đăng nhập",
      roles: [Role.Guest],
    },
  }
}
export default function SignIn() {
  return (
    <PageContainer>
      <Flex flexDir="column" alignItems="center">
        <Heading>Đăng nhập</Heading>
        <Box w={{ base: "100%", md: "600px" }} mt="8">
          <FormSignIn />
        </Box>
      </Flex>
    </PageContainer>
  )
}
