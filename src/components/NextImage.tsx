import { AspectRatio, Box, BoxProps } from "@chakra-ui/react"
import Image from "next/image"
import { getImageFallback } from "utils"

interface NextImageProps extends BoxProps {
  src?: string
  alt: string
  ratio?: number
}

export function NextImage({ src, alt, ratio, ...props }: NextImageProps) {
  return (
    <Box position="relative" overflow="hidden" {...props}>
      {ratio ? (
        <AspectRatio ratio={ratio}>
          <Image
            src={src || getImageFallback(300)}
            layout="fill"
            objectFit="cover"
            alt={alt || "image"}
          />
        </AspectRatio>
      ) : (
        <Image
          src={src || getImageFallback(300)}
          layout="fill"
          objectFit="cover"
          alt={alt || "image"}
        />
      )}
    </Box>
  )
}
