import { Box, Flex, Heading } from "@chakra-ui/react"
import { PageContainer } from "components"
import { IPageProps, UserRole } from "interfaces"
import { FormSignIn } from "modules/auth/components"
import { GetStaticPropsContext, GetStaticPropsResult } from "next"

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<IPageProps>> {
  return {
    props: {
      title: "Đăng nhập",
      roles: [UserRole.GUEST],
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
