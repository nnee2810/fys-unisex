import {
  Grid,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react"
import {
  CheckboxField,
  Field,
  NextButton,
  SelectField,
  TextField,
} from "components"
import { ISelectOption, ModalBaseProps } from "interfaces"
import { getDistricts, getProvinces, getWards } from "modules/location/services"
import { useFormUpdateAddress } from "modules/users/hooks"
import { IAddressEntity } from "modules/users/interfaces"
import { useEffect, useState } from "react"
import { FormProvider } from "react-hook-form"

interface ModalUpdateAddressProps extends ModalBaseProps {
  data: IAddressEntity
}

export default function ModalUpdateAddress({
  isOpen,
  data,
  onClose,
}: ModalUpdateAddressProps) {
  const { methods, handleSubmit, isLoading } = useFormUpdateAddress({
    data,
    onClose,
  })
  const [provinceOptions, setProvinceOptions] = useState<ISelectOption[]>([])
  const [districtOptions, setDistrictOptions] = useState<ISelectOption[]>([])
  const [wardOptions, setWardOptions] = useState<ISelectOption[]>([])

  const watchProvinceCode = methods.watch("province_code")
  const watchDistrictCode = methods.watch("district_code")

  useEffect(() => {
    getProvinces().then((provinces) =>
      setProvinceOptions(
        provinces.map((province) => ({
          label: province.name,
          value: province.code,
        }))
      )
    )
  }, [])

  useEffect(() => {
    methods.setValue("district_code", undefined)
    setDistrictOptions([])
    if (watchProvinceCode)
      getDistricts(watchProvinceCode).then((districts) =>
        setDistrictOptions(
          districts.map((district) => ({
            label: district.name,
            value: district.code,
          }))
        )
      )
  }, [watchProvinceCode])

  useEffect(() => {
    methods.setValue("ward_code", undefined)
    setWardOptions([])
    if (watchDistrictCode)
      getWards(watchDistrictCode).then((wards) =>
        setWardOptions(
          wards.map((ward) => ({
            label: ward.name,
            value: ward.code,
          }))
        )
      )
  }, [watchDistrictCode])

  useEffect(() => {
    if (!isOpen) methods.reset()
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      closeOnOverlayClick={false}
      size="3xl"
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <ModalHeader>Sửa địa chỉ</ModalHeader>
            <ModalBody>
              <Stack>
                <Grid templateColumns="1fr 1fr" gap="2">
                  <Field name="name" label="Họ tên" component={<TextField />} />
                  <Field
                    name="phone"
                    label="Số điện thoại"
                    component={<TextField type="number" />}
                  />
                </Grid>
                <Grid templateColumns="repeat(3, 1fr)" gap="2">
                  <Field
                    name="province_code"
                    label="Tỉnh/Thành phố"
                    component={<SelectField options={provinceOptions} />}
                  />
                  <Field
                    name="district_code"
                    label="Quận/Huyện"
                    component={<SelectField options={districtOptions} />}
                  />
                  <Field
                    name="ward_code"
                    label="Phường/Xã"
                    component={<SelectField options={wardOptions} />}
                  />
                </Grid>
                <Field
                  name="address_detail"
                  label="Địa chỉ cụ thể"
                  component={
                    <TextField placeholder="Số nhà, đường, ... (nếu có)" />
                  }
                />
                <Field
                  name="is_default"
                  component={<CheckboxField label="Đặt làm địa chỉ mặc định" />}
                />
              </Stack>
            </ModalBody>
            <ModalFooter>
              <HStack>
                <NextButton
                  colorScheme="blackAlpha"
                  variant="outline"
                  onClick={onClose}
                >
                  Đóng
                </NextButton>
                <NextButton type="submit" isLoading={isLoading}>
                  Xong
                </NextButton>
              </HStack>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  )
}
