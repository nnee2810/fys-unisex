import { Box, Center, Spinner, Text } from "@chakra-ui/react"
import ImageBox from "components/ImageBox"
import { Message } from "configs/constants"
import useAuth from "modules/auth/hooks/useAuth"
import useUser from "modules/users/hooks/useUser"
import React from "react"
import { FileRejection, useDropzone } from "react-dropzone"
import { AiOutlineCamera } from "react-icons/ai"
import { toast } from "react-toastify"
import { Color } from "styles/theme"
import { getAvatarFallback } from "utils/getAvatarFallback"

export default function FormUpdateAvatar() {
  const { profile } = useAuth()
  const {
    updateUserAvatar: { mutate, isLoading },
  } = useUser()

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length) {
      fileRejections[0].errors.forEach((err) => {
        if (err.code === "file-invalid-type")
          toast.error(Message.FILE_INVALID_TYPE + " (.jpg, .jpeg, .png)")
        if (err.code === "file-too-large")
          toast.error(Message.FILE_TOO_LARGE + " (<1MB)")
      })
    }
    if (acceptedFiles.length) {
      const formData = new FormData()
      formData.append("avatar", acceptedFiles[0])
      mutate(formData as any)
    }
  }
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpg": [],
      "image/jpeg": [],
      "image/png": [],
    },
    multiple: false,
    maxSize: 1024 * 1024,
  })

  return (
    <Box>
      <Box pos="relative">
        <ImageBox
          src={profile?.avatar || getAvatarFallback(profile?.fullName)}
          alt="avatar"
          borderRadius="50%"
          ratio={1}
        />

        <Center
          pos="absolute"
          top="0"
          w="100%"
          h="100%"
          bgColor="#00000033"
          borderRadius="50%"
          opacity={isLoading ? 1 : 0}
          cursor="pointer"
          transition="all .2s"
          _hover={{ opacity: 1 }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isLoading ? (
            <Spinner size="lg" />
          ) : (
            <AiOutlineCamera fontSize="32" />
          )}
        </Center>
      </Box>
      <Box mt="2" textAlign="center" color={Color.DARK_GRAY}>
        <Text>Định dạng: .jpg, .jpeg, .png</Text>
        <Text>Dung lượng file tối đa 1 MB</Text>
      </Box>
    </Box>
  )
}
