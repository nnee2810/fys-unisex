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
import { Field, FieldEnterAddress, NextButton, TextField } from "components"
import { ModalBaseProps } from "interfaces"
import { IAddressEntity } from "interfaces/entities"
import { useFormUpdateAddress } from "modules/users/hooks"
import { useEffect } from "react"
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
                <FieldEnterAddress />
              </Stack>
            </ModalBody>
            <ModalFooter>
              <NextButton w="100%" type="submit" isLoading={isLoading}>
                Xong
              </NextButton>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  )
}
