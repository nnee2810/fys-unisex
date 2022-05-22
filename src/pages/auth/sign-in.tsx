import { Box, Flex, Heading } from "@chakra-ui/react"
import { PAGE_PADDING, responsiveW } from "configs/constants"
import { useAppSelector } from "hooks/useAppStore"
import { PageProps } from "layout"
import FormSignIn from "modules/auth/components/FormSignIn"
import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { historySelector } from "store/reducers/history"
import { userSelector } from "store/reducers/user"

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<PageProps>> {
  return {
    props: {
      title: "Đăng nhập",
      protected: false,
    },
  }
}
export default function SignIn() {
  const router = useRouter()
  const { isAuth } = useAppSelector(userSelector)
  const { from } = useAppSelector(historySelector)

  useEffect(() => {
    if (isAuth) {
      if (from) router.push(from)
      else router.push("/")
    }
  }, [isAuth])

  return (
    <Flex
      w={{ ...responsiveW }}
      mx="auto"
      py={PAGE_PADDING}
      flexDir="column"
      alignItems="center"
    >
      <Heading>Đăng nhập</Heading>
      <Box w={{ base: "100%", md: "600px" }} mt="8">
        <FormSignIn />
      </Box>
    </Flex>
  )
}
