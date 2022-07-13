import { Box, Center, Collapse, Heading } from "@chakra-ui/react"
import { Field, NextButton, StepBar, TextField } from "components"
import { PageTitle } from "configs/constants"
import { firebaseAuth } from "configs/firebase"
import { RecaptchaVerifier } from "firebase/auth"
import { PageProps } from "layout"
import {
  FormResetPassword,
  ResetPasswordSuccess,
} from "modules/auth/components/reset-password"
import { useFormResetPassword } from "modules/auth/hooks"
import { UserRole } from "modules/users/interfaces"
import { GetStaticPropsResult } from "next"
import { useEffect } from "react"
import { FormProvider } from "react-hook-form"
import { IoPhonePortraitOutline } from "react-icons/io5"
import { Color } from "styles/theme"
import { getAwsCloudFrontUrl } from "utils"

export async function getStaticProps(): Promise<
  GetStaticPropsResult<PageProps>
> {
  return {
    props: {
      title: PageTitle.SIGN_IN,
      roles: [UserRole.GUEST],
    },
  }
}

export default function ResetPassword() {
  const { methods, handleSubmit, isLoading } = useFormResetPassword()
  const watchStep = methods.watch("step")

  useEffect(() => {
    //@ts-ignore
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
      },
      firebaseAuth
    )

    return () => {
      //@ts-ignore
      ;(window.recaptchaVerifier as RecaptchaVerifier).clear()
    }
  }, [])

  return (
    <Center
      pos="absolute"
      w="100%"
      h="100%"
      p="4"
      bgImg={getAwsCloudFrontUrl("static/reset-password-bg.jpg")}
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
        <Heading>{PageTitle.RESET_PASSWORD}</Heading>
        <Box mt="10">
          <StepBar
            steps={["Nhập số điện thoại", "Tạo mật khẩu mới", "Hoàn thành"]}
            activeStep={watchStep}
          />
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <Collapse in={watchStep === 1} unmountOnExit>
                <Field
                  name="phone"
                  component={
                    <TextField
                      type="number"
                      placeholder="Số điện thoại"
                      before={<IoPhonePortraitOutline fontSize="18" />}
                    />
                  }
                />
              </Collapse>
              <Collapse in={watchStep === 2} unmountOnExit>
                <FormResetPassword />
              </Collapse>
              <Collapse in={watchStep === 3} unmountOnExit>
                <ResetPasswordSuccess />
              </Collapse>

              {watchStep < 3 && (
                <NextButton w="100%" mt="2" type="submit" isLoading={isLoading}>
                  {watchStep < 2 ? "Tiếp theo" : "Xong"}
                </NextButton>
              )}
              <div id="recaptcha" />
            </form>
          </FormProvider>
        </Box>
      </Box>
    </Center>
  )
}
