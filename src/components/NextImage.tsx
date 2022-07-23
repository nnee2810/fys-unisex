import { AspectRatio, Box, BoxProps } from "@chakra-ui/react"
import Image, { ImageProps } from "next/image"
import { getImageFallback } from "utils"

interface NextImageProps extends BoxProps {
  src?: string
  ratio?: number
}

export function NextImage({ src, ratio, ...props }: NextImageProps) {
  const imageProps: ImageProps = {
    src: src || getImageFallback(300),
    layout: "fill",
    objectFit: "cover",
    blurDataURL: src || getImageFallback(300),
    placeholder: "blur",
  }

  return (
    <Box position="relative" overflow="hidden" {...props}>
      {ratio ? (
        <AspectRatio ratio={ratio}>
          <Image {...imageProps} alt="" />
        </AspectRatio>
      ) : (
        <Image {...imageProps} alt="" />
      )}
    </Box>
  )
}
