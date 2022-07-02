import {
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react"
import { NextButton, NextLink } from "components"
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
    <Center
      pos="absolute"
      w="100%"
      h="100%"
      p="4"
      bgImg={getAwsCloudFrontUrl("static/sign-in-bg.jpg")}
      bgSize="cover"
      bgPos="center"
    >
      <Box
        w={{ base: "100%", md: "600px" }}
        p="8"
        bg="#fff"
        border={`1px solid ${Color.LIGHT_GRAY}`}
        borderRadius="16"
        boxShadow="2xl"
      >
        <Heading>Đăng nhập</Heading>
        <Stack mt="10">
          <FormSignIn />
          <HStack>
            <Divider />
            <Text color={Color.DARK_GRAY}>hoặc</Text>
            <Divider />
          </HStack>
          <NextLink href="/auth/sign-up">
            <NextButton w="100%" colorScheme="gray">
              Chưa có tài khoản, tạo tài khoản ngay!
            </NextButton>
          </NextLink>
        </Stack>
      </Box>
    </Center>
  )
}
