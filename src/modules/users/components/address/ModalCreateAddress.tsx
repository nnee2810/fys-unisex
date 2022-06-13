import { Grid, Stack } from "@chakra-ui/react"
import { Field, ModalConfirm, SelectField, TextField } from "components"
import { IModalProps } from "interfaces"
import { useGetProvinces } from "modules/location/hooks/useGetProvinces"
import { useFormCreateAddress } from "modules/users/hooks"
import { FormProvider } from "react-hook-form"

export function ModalCreateAddress(props: IModalProps) {
  const { methods, handleSubmit } = useFormCreateAddress()
  const { data } = useGetProvinces()

  return (
    <ModalConfirm title="Thêm địa chỉ" size="3xl" {...props}>
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
            <Grid templateColumns="repeat(3, 1fr)" gap="2">
              <Field
                name="province"
                label="Tỉnh/Thành phố"
                component={<SelectField options={[]} />}
              />
              <Field
                name="district"
                label="Quận/Huyện"
                component={<SelectField options={[]} />}
              />
              <Field
                name="ward"
                label="Phường/Xã"
                component={<SelectField options={[]} />}
              />
            </Grid>
            <Field
              name="detail"
              label="Địa chỉ cụ thể"
              component={
                <TextField placeholder="Số nhà, đường, ... (nếu có)" />
              }
            />
          </Stack>
        </form>
      </FormProvider>
    </ModalConfirm>
  )
}
