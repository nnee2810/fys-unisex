import { Box, Divider, HStack, Stack, Text, useBoolean } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { AxiosError } from "axios"
import Button from "components/Button"
import Field from "components/Field"
import TextField from "components/Field/TextField"
import NextLink from "components/NextLink"
import {
  EMAIL_USED_MESSAGE,
  ERROR_MESSAGE,
  PASSWORD_REGEX,
  PHONE_REGEX,
  PHONE_USED_MESSAGE,
} from "configs/constants"
import { useRouter } from "next/router"
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
import { toast } from "react-toastify"
import { colors } from "styles/theme"
import { getValidateError } from "utils/getValidateError"
import * as yup from "yup"
import { useSignUp } from "../hooks/useSignUp"

interface FormValues {
  fullName: string
  phone: string
  email: string
  password: string
  confirmPassword: string
}

const schema = yup.object().shape({
  fullName: yup.string().required(getValidateError("Họ tên", "required")),
  phone: yup
    .string()
    .required(getValidateError("Số điện thoại", "required"))
    .matches(PHONE_REGEX, getValidateError("Số điện thoại", "invalid")),
  email: yup
    .string()
    .required(getValidateError("Email", "required"))
    .email(getValidateError("Email", "invalid")),
  password: yup
    .string()
    .required(getValidateError("Mật khẩu", "required"))
    .matches(
      PASSWORD_REGEX,
      "Mật khẩu chứa ít nhất 8 kí tự, chứa chữ in hoa/chữ thường/số/kí tự đặc biệt"
    ),
  confirmPassword: yup
    .string()
    .required(getValidateError("Nhập lại mật khẩu", "required"))
    .oneOf(
      [yup.ref("password")],
      getValidateError("Mật khẩu nhập lại", "notMatch")
    ),
})

export default function FormSignUp() {
  const router = useRouter()
  const methods = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  })
  const { mutate, isLoading } = useSignUp()
  const [passwordVisible, setPasswordVisible] = useBoolean(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useBoolean(false)

  const handleSubmit = ({ confirmPassword, ...data }: FormValues) => {
    mutate(data, {
      onSuccess() {
        toast.success("Đăng ký tài khoản thành công, hãy đăng nhập")
        router.push("/auth/sign-in")
      },
      onError(error) {
        console.log(error)

        if (error instanceof AxiosError) {
          if (error.response?.data?.error?.code === "23505") {
            switch (error.response?.data?.error?.column) {
              case "phone":
                toast.error(PHONE_USED_MESSAGE)
                break
              case "email":
                toast.error(EMAIL_USED_MESSAGE)
                break
              default:
                toast.error(ERROR_MESSAGE)
            }
          } else toast.error(ERROR_MESSAGE)
        } else toast.error(ERROR_MESSAGE)
      },
    })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Stack spacing="4">
          <Field
            name="fullName"
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                placeholder="Họ tên"
                icon={{
                  before: <AiOutlineUser fontSize="18" />,
                }}
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
                icon={{ before: <IoPhonePortraitOutline fontSize="18" /> }}
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
                icon={{ before: <AiOutlineMail fontSize="18" /> }}
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
            )}
          />
          <Field
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                icon={{
                  before: <AiOutlineLock fontSize="18" />,
                  after: (
                    <Box
                      fontSize="20"
                      cursor="pointer"
                      onClick={setConfirmPasswordVisible.toggle}
                    >
                      {confirmPasswordVisible ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </Box>
                  ),
                }}
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
              />
            )}
          />
          <Button type="submit" isLoading={isLoading}>
            Đăng ký
          </Button>
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
