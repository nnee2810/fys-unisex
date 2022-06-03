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
import { isEmail, isPhoneNumber } from "class-validator"
import Button from "components/Button"
import Field from "components/Field"
import TextField from "components/Field/TextField"
import NextLink from "components/NextLink"
import { formSchema } from "configs/formSchema"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
  AiOutlineUser,
} from "react-icons/ai"
import { Color } from "styles/theme"
import {
  getValidateInvalidMessage,
  getValidateRequiredMessage,
} from "utils/getValidateMessage"
import * as yup from "yup"
import { SignInByPasswordDto } from "../dto/sign-in-by-password.dto"
import useAuth from "../hooks/useAuth"

interface FormValues {
  signInKey: string
  password: string
}

const schema = yup.object().shape({
  signInKey: yup
    .string()
    .label("Email/Số điện thoại")
    .required(({ label }) => getValidateRequiredMessage(label))
    .test({
      test: (value) =>
        value ? isEmail(value) || isPhoneNumber(value, "VN") : false,
      message: ({ label }) => getValidateInvalidMessage(label),
    }),
  password: formSchema.password,
})

export default function FormSignIn() {
  const methods = useForm<FormValues>({
    defaultValues: {
      signInKey: "",
      password: "",
    },
    resolver: yupResolver(schema),
  })
  const {
    signInByPassword: { mutate, isLoading },
  } = useAuth()
  const [passwordVisible, setPasswordVisible] = useBoolean(false)

  const handleSubmit = ({ signInKey, password }: FormValues) => {
    const submitData: SignInByPasswordDto = {
      password,
    }
    if (isEmail(signInKey)) submitData.email = signInKey
    if (isPhoneNumber(signInKey, "VN")) submitData.phone = signInKey

    mutate(submitData)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Stack spacing="4">
          <Field
            name="signInKey"
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
          <Button type="submit" isLoading={isLoading}>
            Đăng nhập
          </Button>
          <HStack>
            <Divider />
            <Text color={Color.GRAY}>hoặc</Text>
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
