import {
  Collapse,
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
  Field,
  FieldEnterOTP,
  NextButton,
  StepBar,
  TextField,
} from "components"
import { ModalBaseProps } from "interfaces"
import { ActionOTP } from "modules/auth/dto"
import { useFormUpdatePhone } from "modules/users/hooks"
import { FormProvider } from "react-hook-form"
import { IoPhonePortraitOutline } from "react-icons/io5"

export function ModalUpdatePhone({ isOpen, onClose }: ModalBaseProps) {
  const { methods, handleSubmit, isLoading } = useFormUpdatePhone(onClose)
  const watchStep = methods.watch("step")

  return (
    <Modal
      isOpen={isOpen}
      closeOnOverlayClick={false}
      size="xl"
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Thay đổi số điện thoại</ModalHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <ModalBody>
              <StepBar
                steps={["Nhập số điện thoại mới", "Nhập mã xác minh"]}
                activeStep={watchStep}
              />
              <Collapse in={watchStep === 1} unmountOnExit>
                <Field
                  name="new_phone"
                  component={
                    <TextField
                      type="number"
                      placeholder="Số điện thoại mới"
                      before={<IoPhonePortraitOutline fontSize="18" />}
                    />
                  }
                />
              </Collapse>
              <Collapse in={watchStep === 2} unmountOnExit>
                <Stack>
                  <FieldEnterOTP
                    field_phone="new_phone"
                    action={ActionOTP.UPDATE_PHONE}
                  />
                </Stack>
              </Collapse>
            </ModalBody>
            <ModalFooter>
              <NextButton w="100%" type="submit" isLoading={isLoading}>
                {watchStep < 2 ? "Tiếp theo" : "Xong"}
              </NextButton>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  )
}
