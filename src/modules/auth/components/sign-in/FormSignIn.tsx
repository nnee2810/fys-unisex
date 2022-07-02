import { Box, Flex, Stack, useBoolean } from "@chakra-ui/react"
import { Field, NextButton, NextLink, TextField } from "components"
import { FormProvider } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BsShieldLock } from "react-icons/bs"
import { IoPhonePortraitOutline } from "react-icons/io5"
import { useFormSignIn } from "../../hooks"

export function FormSignIn() {
  const { methods, handleSubmit, isLoading } = useFormSignIn()
  const [passwordVisible, setPasswordVisible] = useBoolean(false)

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Stack>
          <Field
            name="phone"
            component={
              <TextField
                placeholder="Số điện thoại"
                before={<IoPhonePortraitOutline fontSize="18" />}
              />
            }
          />
          <Stack>
            <Field
              name="password"
              component={
                <TextField
                  before={<BsShieldLock fontSize="18" />}
                  after={
                    <Box
                      fontSize="18"
                      cursor="pointer"
                      onClick={setPasswordVisible.toggle}
                    >
                      {passwordVisible ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </Box>
                  }
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Mật khẩu"
                />
              }
            />
            <Flex justifyContent="space-between">
              <NextLink href="/auth/forgot-password">Quên mật khẩu</NextLink>
              <NextLink href="/auth/sms">Đăng nhập với SMS</NextLink>
            </Flex>
          </Stack>
          <NextButton type="submit" isLoading={isLoading}>
            Đăng nhập
          </NextButton>
        </Stack>
      </form>
    </FormProvider>
  )
}
