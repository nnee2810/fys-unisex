import { Box, Heading } from "@chakra-ui/react"
import { NextButton, PageContainer, StepBar } from "components"
import { PageTitle } from "configs/constants"
import { PageProps } from "layout"
import {
  FormCheckOtp,
  FormCreatePassword,
  FormCreateProfile,
  FormEnterPhone,
  SignUpSuccess,
} from "modules/auth/components"
import { useFormSignUp } from "modules/auth/hooks"
import { UserRole } from "modules/users/interfaces"
import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import { FormProvider } from "react-hook-form"
import { Color } from "styles/theme"
import { getAwsCloudFrontUrl } from "utils"

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<PageProps>> {
  return {
    props: {
      title: PageTitle.SIGN_UP,
      roles: [UserRole.GUEST],
    },
  }
}

export default function SignUp() {
  const { methods, handleSubmit, isLoading } = useFormSignUp()
  const watchStep = methods.watch("step")

  return (
    <Box
      pos="absolute"
      w="100%"
      h="100%"
      bgImg={getAwsCloudFrontUrl("static/sign-up-bg.jpg")}
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
          <Heading size="lg">Tạo tài khoản</Heading>
          <Box mt="8">
            <StepBar
              steps={[
                "Nhập số điện thoại",
                "Xác minh số điện thoại",
                "Tạo mật khẩu",
                "Tạo hồ sơ",
                "Hoàn thành",
              ]}
              activeStep={watchStep}
            />

            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleSubmit)}>
                {watchStep === 1 && <FormEnterPhone />}
                {watchStep === 2 && <FormCheckOtp />}
                {watchStep === 3 && <FormCreatePassword />}
                {watchStep === 4 && <FormCreateProfile />}
                {watchStep === 5 && <SignUpSuccess />}
              </form>
            </FormProvider>
          </Box>
          <NextButton onClick={() => methods.setValue("step", watchStep - 1)}>
            -
          </NextButton>
          <NextButton onClick={() => methods.setValue("step", watchStep + 1)}>
            +
          </NextButton>
        </Box>
      </PageContainer>
    </Box>
  )
}
