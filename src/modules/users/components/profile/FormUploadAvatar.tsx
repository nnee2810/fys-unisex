import { Box, Center, Spinner, Text } from "@chakra-ui/react"
import { NextImage } from "components"
import { useAuth } from "modules/auth/hooks"
import { useUploadAvatar } from "modules/users/hooks"
import { AiOutlineCamera } from "react-icons/ai"
import { Color } from "styles/theme"

export function FormUploadAvatar() {
  const { profile } = useAuth()
  const { isLoading, getRootProps } = useUploadAvatar()

  return (
    <Box>
      <Box pos="relative">
        <NextImage
          src={profile?.avatar}
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
