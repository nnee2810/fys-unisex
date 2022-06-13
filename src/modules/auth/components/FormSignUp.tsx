import { Box, Divider, HStack, Stack, Text, useBoolean } from "@chakra-ui/react"
import { Button, Field, NextLink, TextField } from "components"
import { FormProvider } from "react-hook-form"
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai"
import { IoPhonePortraitOutline } from "react-icons/io5"
import { Color } from "styles/theme"

import { useFormSignUp } from "../hooks"

export function FormSignUp() {
  const { methods, handleSubmit, isLoading } = useFormSignUp()
  const [passwordVisible, setPasswordVisible] = useBoolean(false)
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useBoolean(false)

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Stack spacing="4">
          <Field
            name="name"
            component={
              <TextField
                placeholder="Họ tên"
                icon={{
                  before: <AiOutlineUser fontSize="18" />,
                }}
              />
            }
          />
          <Field
            name="email"
            component={
              <TextField
                placeholder="Email"
                icon={{ before: <AiOutlineMail fontSize="18" /> }}
              />
            }
          />
          <Field
            name="phone"
            component={
              <TextField
                placeholder="Số điện thoại"
                icon={{ before: <IoPhonePortraitOutline fontSize="18" /> }}
              />
            }
          />
          <Field
            name="password"
            component={
              <TextField
                icon={{
                  before: <AiOutlineLock fontSize="18" />,
                  after: (
                    <Box
                      fontSize="20"
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
          <Field
            name="repeatPassword"
            component={
              <TextField
                icon={{
                  before: <AiOutlineLock fontSize="18" />,
                  after: (
                    <Box
                      fontSize="20"
                      cursor="pointer"
                      onClick={setRepeatPasswordVisible.toggle}
                    >
                      {repeatPasswordVisible ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </Box>
                  ),
                }}
                type={repeatPasswordVisible ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
              />
            }
          />
          <Button type="submit" isLoading={isLoading}>
            Đăng ký
          </Button>
          <HStack>
            <Divider />
            <Text color={Color.GRAY}>hoặc</Text>
            <Divider />
          </HStack>
          <NextLink href="/auth/sign-in">
            <Button w="100%" colorScheme="gray">
              Đã có tài khoản, đăng nhập ngay!
            </Button>
          </NextLink>
        </Stack>
      </form>
    </FormProvider>
  )
}
