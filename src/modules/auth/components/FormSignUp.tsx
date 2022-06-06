import { Box, Divider, HStack, Stack, Text, useBoolean } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "components/Button"
import Field from "components/Field"
import TextField from "components/Field/TextField"
import NextLink from "components/NextLink"
import { formSchema } from "helpers/formSchema"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai"
import { IoPhonePortraitOutline } from "react-icons/io5"
import { Color } from "styles/theme"
import { deleteWhiteSpace } from "utils/deleteWhiteSpace"
import { getValidateNotMatchMessage } from "utils/getValidateMessage"
import * as yup from "yup"
import { useAuth } from "../hooks/useAuth"

interface FormValues {
  fullName: string
  phone: string
  email: string
  password: string
  repeatPassword: string
}

const schema = yup.object().shape({
  fullName: formSchema.fullName,
  email: formSchema.email,
  phone: formSchema.phone,
  password: formSchema.password,
  repeatPassword: yup
    .string()
    .label("Nhập lại mật khẩu")
    .oneOf([yup.ref("password")], ({ label }) =>
      getValidateNotMatchMessage(label)
    ),
})

export default function FormSignUp() {
  const methods = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      repeatPassword: "",
    },
    resolver: yupResolver(schema),
  })
  const {
    signUp: { mutate, isLoading },
  } = useAuth()
  const [passwordVisible, setPasswordVisible] = useBoolean(false)
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useBoolean(false)

  const handleSubmit = ({
    fullName,
    phone,
    repeatPassword,
    ...data
  }: FormValues) => {
    mutate({
      ...data,
      fullName: deleteWhiteSpace(fullName),
      phone: deleteWhiteSpace(phone),
    })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Stack spacing="4">
          <Field
            name="fullName"
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
