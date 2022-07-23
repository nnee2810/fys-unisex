import { Box, Center, Spinner, Text } from "@chakra-ui/react"
import { NextImage } from "components"
import { acceptImage } from "configs/constants"
import { useAppDispatch, useUpload } from "hooks"
import { useAuth } from "modules/auth/hooks"
import { AiOutlineCamera } from "react-icons/ai"
import { toast } from "react-toastify"
import { SET_AVATAR } from "store/reducers/auth"
import { Color } from "styles/theme"
import { getAwsCloudFrontUrl } from "utils"

export function AvatarDropzone() {
  const dispatch = useAppDispatch()
  const { profile } = useAuth()
  const { getRootProps, isLoading } = useUpload<string>({
    url: "/user/upload-avatar",
    accept: acceptImage,
    maxSize: 1 * 1024 * 1024,
    onSuccess({ data: { data } }) {
      toast.success("Cập nhật ảnh đại điện thành công")
      dispatch(SET_AVATAR(data))
    },
  })

  return (
    <Box>
      <Box pos="relative">
        <NextImage
          src={getAwsCloudFrontUrl(profile.avatar)}
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
