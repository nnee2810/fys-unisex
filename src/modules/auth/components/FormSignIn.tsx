import {
  Box,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
  useBoolean,
} from "@chakra-ui/react"
import { Field, NextButton, NextLink, TextField } from "components"
import { FormProvider } from "react-hook-form"
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
  AiOutlineUser,
} from "react-icons/ai"
import { Color } from "styles/theme"
import { useFormSignIn } from "../hooks"

export function FormSignIn() {
  const { methods, handleSubmit, isLoading } = useFormSignIn()
  const [passwordVisible, setPasswordVisible] = useBoolean(false)

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Stack spacing="4">
          <Field
            name="key"
            component={
              <TextField
                placeholder="Email/Số điện thoại"
                icon={{
                  before: <AiOutlineUser fontSize="18" />,
                }}
              />
            }
          />
          <Stack>
            <Field
              name="password"
              component={
                <TextField
                  icon={{
                    before: <AiOutlineLock fontSize="18" />,
                    after: (
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
                    ),
                  }}
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Mật khẩu"
                />
              }
            />
            <Flex justifyContent="space-between">
              <NextLink href="/auth/forgot-password">
                <Text>Quên mật khẩu</Text>
              </NextLink>
              <NextLink href="/auth/sms">
                <Text>Đăng nhập với SMS</Text>
              </NextLink>
            </Flex>
          </Stack>
          <NextButton type="submit" isLoading={isLoading}>
            Đăng nhập
          </NextButton>
          <HStack>
            <Divider />
            <Text color={Color.GRAY}>hoặc</Text>
            <Divider />
          </HStack>
          <NextLink href="/auth/sign-up">
            <NextButton w="100%" colorScheme="gray">
              Chưa có tài khoản, đăng ký ngay!
            </NextButton>
          </NextLink>
        </Stack>
      </form>
    </FormProvider>
  )
}
