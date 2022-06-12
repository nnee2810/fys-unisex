import { Grid, Stack } from "@chakra-ui/react"
import { Field, ModalConfirm, TextField } from "components"
import { IModalProps } from "interfaces"
import { FormProvider, useForm } from "react-hook-form"

export function ModalCreateUserAddress(props: IModalProps) {
  const methods = useForm()

  const handleSubmit = () => {}

  return (
    <ModalConfirm title="Thêm địa chỉ mới" size="2xl" {...props}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Stack spacing="4">
            <Grid templateColumns="1fr 1fr" gap="2">
              <Field name="name" label="Họ tên" component={<TextField />} />
              <Field
                name="phone"
                label="Số điện thoại"
                component={<TextField />}
              />
            </Grid>
            <Field name="address" label="Địa chỉ" component={<TextField />} />
          </Stack>
        </form>
      </FormProvider>
    </ModalConfirm>
  )
}
