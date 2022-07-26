import { Box, Center, HStack, Spinner, Text } from "@chakra-ui/react"
import { NextImage } from "components"
import { IProductImageEntity } from "interfaces/entities"
import { useDeleteProductImage } from "modules/products/hooks"
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai"
import { useQueryClient } from "react-query"
import { toast } from "react-toastify"
import { Color } from "styles/theme"
import { getAwsCloudFrontUrl } from "utils"

interface ProductImageProps {
  data: IProductImageEntity
  onPreview(): void
}

export function ProductImage({ data, onPreview }: ProductImageProps) {
  const queryClient = useQueryClient()
  const { mutate: mutateDelete, isLoading: isLoadingDelete } =
    useDeleteProductImage()

  const handleDelete = () => {
    mutateDelete(data.id, {
      onSuccess() {
        toast.success("Xóa hình ảnh thành công")
        queryClient.invalidateQueries("get-products")
      },
    })
  }

  return (
    <Box pos="relative" borderRadius="16" overflow="hidden">
      <Text>
        {data.id} - {data.position}
      </Text>
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
            <AiOutlineEye cursor="pointer" onClick={onPreview} />
            <AiOutlineDelete cursor="pointer" onClick={handleDelete} />
          </HStack>
        )}
      </Center>
    </Box>
  )
}
