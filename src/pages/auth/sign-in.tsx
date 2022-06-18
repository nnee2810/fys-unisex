import { Box, Flex, Heading } from "@chakra-ui/react"
import { PageContainer } from "components"
import { PageTitle } from "configs/constants"
import { PageProps } from "layout/MainLayout"
import { FormSignIn } from "modules/auth/components"
import { UserRole } from "modules/users/interfaces"
import { GetStaticPropsContext, GetStaticPropsResult } from "next"

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<PageProps>> {
  return {
    props: {
      title: PageTitle.SIGN_IN,
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
