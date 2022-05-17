import {
  Box,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
  useBoolean,
} from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "components/Button"
import Field from "components/Field"
import TextField from "components/Field/TextField"
import NextLink from "components/NextLink"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { colors } from "styles/theme"
import { generateValidateError } from "utils/generateValidateError"
import * as yup from "yup"

interface FormValues {
  signInKey: string
  password: string
}

const schema = yup.object().shape({
  signInKey: yup
    .string()
    .required(generateValidateError("Email/Số điện thoại", "required")),
  password: yup
    .string()
    .required(generateValidateError("Mật khẩu", "required")),
})

export default function FormSignIn() {
  const methods = useForm<FormValues>({
    defaultValues: {
      signInKey: "",
      password: "",
    },
    resolver: yupResolver(schema),
  })
  const [passwordVisible, setPasswordVisible] = useBoolean(false)

  const handleSubmit = (data: FormValues) => {}

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Stack spacing="4">
          <Field
            name="signInKey"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                onChange={onChange}
                value={value}
                isInvalid={!!error}
                placeholder="Email/Số điện thoại"
              />
            )}
          />
          <Stack>
            <Field
              name="password"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  isInvalid={!!error}
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
            <Flex justifyContent="space-between">
              <NextLink href="/auth/forgot-password">
                <Text>Quên mật khẩu</Text>
              </NextLink>
              <NextLink href="/auth/sms">
                <Text>Đăng nhập với SMS</Text>
              </NextLink>
            </Flex>
          </Stack>
          <Button type="submit">Đăng nhập</Button>
          <HStack>
            <Divider />
            <Text color={colors.gray}>hoặc</Text>
            <Divider />
          </HStack>
          <NextLink href="/auth/sign-up">
            <Button w="100%" colorScheme="gray">
              Chưa có tài khoản, đăng ký ngay!
            </Button>
          </NextLink>
        </Stack>
      </form>
    </FormProvider>
  )
}
