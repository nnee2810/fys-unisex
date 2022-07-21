import { AspectRatio, Box, Center, Spinner, Text } from "@chakra-ui/react"
import { BsFillCheckCircleFill, BsImages } from "react-icons/bs"
import { Color } from "styles/theme"
import { useUploadProductImage } from "../hooks"

interface ProductImageDropzoneProps {
  id?: string
}

export function ProductImageDropzone({ id }: ProductImageDropzoneProps) {
  const { getRootProps, progress, queue } = useUploadProductImage(id)

  return (
    <>
      {progress ? (
        <AspectRatio ratio={3 / 4}>
          <Center
            pos="relative"
            border={`2px dashed ${
              progress === 100 ? Color.GREEN : Color.DARK_GRAY
            }`}
            borderRadius="16"
          >
            <Text
              fontSize="28"
              color={progress === 100 ? Color.GREEN : "#000"}
              zIndex="1"
            >
              {progress === 100 ? <BsFillCheckCircleFill /> : progress + "%"}
            </Text>
            <Box
              pos="absolute"
              left="0"
              w={progress + "%"}
              h="100%"
              bgColor={progress === 100 ? Color.GREEN + "40" : Color.LIGHT_GRAY}
              transition="all .5s"
            />
          </Center>
        </AspectRatio>
      ) : null}
      {queue.map((_, idx) => (
        <AspectRatio ratio={3 / 4} key={idx}>
          <Center border={`2px dashed ${Color.DARK_GRAY}`} borderRadius="16">
            <Spinner />
          </Center>
        </AspectRatio>
      ))}
      <AspectRatio ratio={3 / 4}>
        <Center
          flexDirection="column"
          color={Color.DARK_GRAY}
          border={`2px dashed ${Color.DARK_GRAY}`}
          borderRadius="16"
          cursor="pointer"
          {...getRootProps()}
        >
          <BsImages fontSize="40" />
          <Text mt="2">Thêm ảnh</Text>
        </Center>
      </AspectRatio>
    </>
  )
}
