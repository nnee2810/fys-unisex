import { Box, Flex, Heading } from "@chakra-ui/react"
import { PageContainer } from "components"
import { IPageProps, UserRole } from "interfaces"
import { FormSignUp } from "modules/auth/components"
import { GetStaticPropsContext, GetStaticPropsResult } from "next"

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<IPageProps>> {
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
