import { Box, Divider, HStack, Stack, Text, useBoolean } from "@chakra-ui/react"
import Button from "components/Button"
import Field from "components/Field"
import TextField from "components/Field/TextField"
import NextLink from "components/NextLink"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { colors } from "styles/theme"

interface FormValues {
  name: string
  phone: string
  email: string
  password: string
  rePassword: string
}

export default function FormSignUp() {
  const methods = useForm<FormValues>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
  })
  const [passwordVisible, setPasswordVisible] = useBoolean(false)

  const handleSubmit = (data: FormValues) => {}

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Stack spacing="4">
          <Field
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                placeholder="Họ tên"
              />
            )}
          />
          <Field
            name="phone"
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                placeholder="Số điện thoại"
              />
            )}
          />
          <Field
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                placeholder="Email"
              />
            )}
          />
          <Field
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                icon={{
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
            )}
          />
          <Field
            name="rePassword"
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                icon={{
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
            )}
          />
          <Button type="submit">Đăng ký</Button>
          <HStack>
            <Divider />
            <Text color={colors.gray}>hoặc</Text>
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
