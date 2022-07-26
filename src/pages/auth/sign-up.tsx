import { Box, Center, Collapse, Heading, Stack } from "@chakra-ui/react"
import { Field, NextButton, StepBar, TextField } from "components"
import { FieldEnterOTP } from "components/FieldEnterOTP"
import { PageTitle } from "configs/constants"
import { firebaseAuth } from "configs/firebase"
import { RecaptchaVerifier } from "firebase/auth"
import { UserRole } from "interfaces/entities"
import { PageProps } from "layout"
import {
  FormCreatePassword,
  FormCreateProfile,
  SignUpSuccess,
} from "modules/auth/components/sign-up"
import { ActionOTP } from "modules/auth/dto"
import { useFormSignUp } from "modules/auth/hooks"
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
      title: PageTitle.SIGN_UP,
      roles: [UserRole.GUEST],
    },
  }
}

export default function SignUp() {
  const { methods, handleSubmit, isLoading } = useFormSignUp()

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
      bgImg={getAwsCloudFrontUrl("static/sign-up-bg.jpg")}
      bgSize="cover"
      bgPos="center"
    >
      <Box
        w={{ base: "100%", md: "600px" }}
        p="8"
        bgColor="#fff"
        border={`1px solid ${Color.LIGHT_GRAY}`}
        borderRadius="16"
        boxShadow="2xl"
      >
        <Heading size="lg">{PageTitle.SIGN_UP}</Heading>
        <Box mt="10">
          <StepBar
            steps={[
              "Nhập thông tin tài khoản",
              "Tạo mật khẩu",
              "Nhập số điện thoại",
              "Xác minh số điện thoại",
              "Hoàn thành",
            ]}
            activeStep={watchStep}
          />
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <Collapse in={watchStep === 1} unmountOnExit>
                <FormCreateProfile />
              </Collapse>
              <Collapse in={watchStep === 2} unmountOnExit>
                <FormCreatePassword />
              </Collapse>
              <Collapse in={watchStep === 3} unmountOnExit>
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
              <Collapse in={watchStep === 4} unmountOnExit>
                <Stack>
                  <FieldEnterOTP
                    field_phone="phone"
                    action={ActionOTP.SIGN_UP}
                  />
                </Stack>
              </Collapse>
              <Collapse in={watchStep === 5} unmountOnExit>
                <SignUpSuccess />
              </Collapse>
              {watchStep < 5 && (
                <NextButton w="100%" mt="2" type="submit" isLoading={isLoading}>
                  {watchStep < 4 ? "Tiếp theo" : "Xong"}
                </NextButton>
              )}
              <div id="recaptcha" />
            </form>
          </FormProvider>
          {/* <NextButton onClick={() => methods.setValue("step", watchStep - 1)}>
            -
          </NextButton>
          <NextButton onClick={() => methods.setValue("step", watchStep + 1)}>
            +
          </NextButton> */}
        </Box>
      </Box>
    </Center>
  )
}
