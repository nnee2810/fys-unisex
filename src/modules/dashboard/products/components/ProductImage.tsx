import { Box, Center, HStack } from "@chakra-ui/react"
import { NextImage } from "components"
import { IProductImageEntity } from "interfaces/entities"
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai"
import { Color } from "styles/theme"
import { getAwsCloudFrontUrl } from "utils"

interface ProductImageProps {
  data: IProductImageEntity
  onSelectView(id: string): void
}

export function ProductImage({ data, onSelectView }: ProductImageProps) {
  return (
    <Box pos="relative" borderRadius="16" overflow="hidden">
      <NextImage src={getAwsCloudFrontUrl(data.key)} alt="" ratio={3 / 4} />
      <Center
        pos="absolute"
        top="0"
        w="100%"
        h="100%"
        bgColor={Color.GRAY + "BF"}
        opacity="0"
        transition="all .25s"
        _hover={{ opacity: "1" }}
      >
        <HStack spacing="4" fontSize="24">
          <AiOutlineEye
            cursor="pointer"
            onClick={() => onSelectView(data.id)}
          />
          <AiOutlineDelete cursor="pointer" />
        </HStack>
      </Center>
    </Box>
  )
}
