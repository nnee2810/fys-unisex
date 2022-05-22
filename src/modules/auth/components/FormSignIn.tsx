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
import { REGEX } from "configs/constants"
import useUser from "modules/users/hooks/useUser"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
  AiOutlineUser,
} from "react-icons/ai"
import { colors } from "styles/theme"
import { getValidateError } from "utils/getValidateError"
import * as yup from "yup"
import { SignInByPasswordDto } from "../dto/sign-in-by-password.dto"

interface FormValues {
  signInKey: string
  password: string
}

const schema = yup.object().shape({
  signInKey: yup
    .string()
    .required(getValidateError("Email/Số điện thoại", "required"))
    .test({
      test(value?: string) {
        if (!value) return false
        if (REGEX.EMAIL.test(value) || REGEX.PHONE.test(value)) return true
        return false
      },
      message: getValidateError("Email/Số điện thoại", "invalid"),
    }),
  password: yup
    .string()
    .required(getValidateError("Mật khẩu", "required"))
    .matches(REGEX.PASSWORD, getValidateError("Mật khẩu", "invalid")),
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
  } = useUser()
  const [passwordVisible, setPasswordVisible] = useBoolean(false)

  const handleSubmit = ({ signInKey, password }: FormValues) => {
    const submitData: SignInByPasswordDto = {
      password,
    }
    if (REGEX.EMAIL.test(signInKey)) submitData.email = signInKey
    if (REGEX.PHONE.test(signInKey)) submitData.phone = signInKey

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
