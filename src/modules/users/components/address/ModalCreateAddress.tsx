import {
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react"
import {
  CheckboxField,
  Field,
  FieldEnterAddress,
  NextButton,
  TextField,
} from "components"
import { ModalBaseProps } from "interfaces"
import { useFormCreateAddress } from "modules/users/hooks"
import { useEffect } from "react"
import { FormProvider } from "react-hook-form"

export function ModalCreateAddress({ isOpen, onClose }: ModalBaseProps) {
  const { methods, handleSubmit, isLoading } = useFormCreateAddress(onClose)

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
        <ModalCloseButton />
        <ModalHeader>Thêm địa chỉ</ModalHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit}>
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
                <FieldEnterAddress />
                <Field
                  name="is_default"
                  component={<CheckboxField label="Đặt làm địa chỉ mặc định" />}
                />
              </Stack>
            </ModalBody>
            <ModalFooter>
              <NextButton w="100%" type="submit" isLoading={isLoading}>
                Thêm
              </NextButton>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  )
}
