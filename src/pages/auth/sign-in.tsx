import { Box, Divider, Heading, HStack, Stack } from "@chakra-ui/react"
import { NextButton, NextLink, PageContainer } from "components"
import { PageTitle } from "configs/constants"
import { PageProps } from "layout"
import { FormSignIn } from "modules/auth/components"
import { UserRole } from "modules/users/interfaces"
import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import { Color } from "styles/theme"
import { getAwsCloudFrontUrl } from "utils"

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
    <Box
      pos="absolute"
      w="100%"
      h="100%"
      bgImg={getAwsCloudFrontUrl("static/sign-in-bg.jpg")}
      bgSize="cover"
      bgPos="center"
    >
      <PageContainer>
        <Box
          maxW="500px"
          mx="auto"
          mt="10"
          p="6"
          bg="#fff"
          border={`1px solid ${Color.LIGHT_GRAY}`}
          borderRadius="16"
          boxShadow="2xl"
        >
          <Heading size="lg">Đăng nhập</Heading>
          <Stack mt="8">
            <FormSignIn />
            <HStack>
              <Divider />
              <Box color={Color.DARK_GRAY}>hoặc</Box>
              <Divider />
            </HStack>
            <NextLink href="/auth/sign-up">
              <NextButton w="100%" colorScheme="gray">
                Chưa có tài khoản, tạo tài khoản ngay!
              </NextButton>
            </NextLink>
          </Stack>
        </Box>
      </PageContainer>
    </Box>
  )
}
