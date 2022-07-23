import { Box, Center, HStack, Spinner } from "@chakra-ui/react"
import { NextImage } from "components"
import { IProductImageEntity } from "interfaces/entities"
import { useDeleteProductImage } from "modules/products/hooks"
import { useState } from "react"
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai"
import { useQueryClient } from "react-query"
import { toast } from "react-toastify"
import { Color } from "styles/theme"
import { getAwsCloudFrontUrl } from "utils"

interface ProductImageProps {
  data: IProductImageEntity
}

export function ProductImage({ data }: ProductImageProps) {
  const queryClient = useQueryClient()
  const { mutate: mutateDelete, isLoading: isLoadingDelete } =
    useDeleteProductImage()
  const [preview, setPreview] = useState(false)

  const handleDelete = () => {
    mutateDelete(data.id, {
      onSuccess() {
        toast.success("Xóa hình ảnh thành công")
        queryClient.invalidateQueries("get-product-list")
      },
    })
  }

  return (
    <Box>
      <Box pos="relative" borderRadius="16" overflow="hidden">
        <NextImage src={getAwsCloudFrontUrl(data.key)} ratio={3 / 4} />
        <Center
          pos="absolute"
          top="0"
          w="100%"
          h="100%"
          bgColor={isLoadingDelete ? Color.RED + "40" : Color.GRAY + "BF"}
          opacity={isLoadingDelete ? 1 : 0}
          transition="all .25s"
          _hover={{ opacity: 1 }}
        >
          {isLoadingDelete ? (
            <Spinner color="#fff" />
          ) : (
            <HStack spacing="4" fontSize="24">
              <AiOutlineEye cursor="pointer" onClick={() => setPreview(true)} />
              <AiOutlineDelete cursor="pointer" onClick={handleDelete} />
            </HStack>
          )}
        </Center>
      </Box>
    </Box>
  )
}
