import { Box, Flex, Heading } from "@chakra-ui/react"
import PageContainer from "components/PageContainer"
import { UserRole } from "interfaces/IUser"
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
      roles: [UserRole.GUEST],
    },
  }
}
export default function SignUp() {
  return (
    <PageContainer>
      <Flex flexDir="column" alignItems="center">
        <Heading>Đăng ký</Heading>
        <Box w={{ base: "100%", md: "600px" }} mt="8">
          <FormSignUp />
        </Box>
      </Flex>
    </PageContainer>
  )
}
