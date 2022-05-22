import { Box, Divider, HStack, Stack, Text, useBoolean } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { AxiosError } from "axios"
import Button from "components/Button"
import Field from "components/Field"
import TextField from "components/Field/TextField"
import NextLink from "components/NextLink"
import { MESSAGE, REGEX } from "configs/constants"
import useUser from "modules/users/hooks/useUser"
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
import { deleteWhiteSpace } from "utils/deleteWhiteSpace"
import { getValidateError } from "utils/getValidateError"
import * as yup from "yup"

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
    .matches(REGEX.PHONE, getValidateError("Số điện thoại", "invalid")),
  email: yup
    .string()
    .required(getValidateError("Email", "required"))
    .matches(REGEX.EMAIL, getValidateError("Email", "invalid")),
  password: yup
    .string()
    .required(getValidateError("Mật khẩu", "required"))
    .matches(
      REGEX.PASSWORD,
      "Mật khẩu chứa ít nhất 8 kí tự, chứa chữ in hoa, chữ thường và số"
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
  const {
    signUp: { mutate, isLoading },
  } = useUser()
  const [passwordVisible, setPasswordVisible] = useBoolean(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useBoolean(false)

  const handleSubmit = ({
    fullName,
    phone,
    confirmPassword,
    ...data
  }: FormValues) => {
    mutate(
      {
        ...data,
        fullName: deleteWhiteSpace(fullName),
        phone: deleteWhiteSpace(phone),
      },
      {
        onSuccess() {
          toast.success(MESSAGE.SIGN_UP_SUCCESS)
          router.push("/auth/sign-in")
        },
        onError(error) {
          if (error instanceof AxiosError) {
            toast.error(error.response?.data?.message || MESSAGE.ERROR)
          } else toast.error(MESSAGE.ERROR)
        },
      }
    )
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
            name="phone"
            component={
              <TextField
                placeholder="Số điện thoại"
                icon={{ before: <IoPhonePortraitOutline fontSize="18" /> }}
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
            name="confirmPassword"
            component={
              <TextField
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
            }
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
