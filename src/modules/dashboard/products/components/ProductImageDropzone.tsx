import { AspectRatio, Center, Spinner, Text } from "@chakra-ui/react"
import { acceptImage } from "configs/constants"
import { useUpload } from "hooks"
import { BsImages } from "react-icons/bs"
import { useQueryClient } from "react-query"
import { toast } from "react-toastify"
import { Color } from "styles/theme"

interface ProductImageDropzoneProps {
  id: string
}

const containerStyle = {
  border: `2px dashed ${Color.DARK_GRAY}`,
  borderRadius: "16",
}

export function ProductImageDropzone({ id }: ProductImageDropzoneProps) {
  const queryClient = useQueryClient()
  const { getRootProps, isLoading, queue } = useUpload({
    url: `/product/upload-product-image/${id}`,
    accept: acceptImage,
    maxSize: 5,
    multiple: true,
    onSuccess() {
      toast.success("Thêm hình ảnh thành công")
      queryClient.invalidateQueries("get-products")
    },
  })

  return (
    <>
      {isLoading ? (
        <AspectRatio ratio={3 / 4}>
          <Center pos="relative" {...containerStyle}>
            <Spinner />
          </Center>
        </AspectRatio>
      ) : null}
      {queue.length ? (
        <AspectRatio ratio={3 / 4}>
          <Center {...containerStyle}>
            <Text>{queue.length} đang chờ...</Text>
          </Center>
        </AspectRatio>
      ) : null}
      <AspectRatio ratio={3 / 4}>
        <Center
          flexDirection="column"
          color={Color.DARK_GRAY}
          cursor="pointer"
          {...containerStyle}
          {...getRootProps()}
        >
          <BsImages fontSize="40" />
          <Text mt="2">Thêm ảnh</Text>
        </Center>
      </AspectRatio>
    </>
  )
}
