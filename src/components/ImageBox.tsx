import { AspectRatio, Box, BoxProps } from "@chakra-ui/react"
import Image from "next/image"
import React from "react"

interface ImageBoxProps extends BoxProps {
  src: string
  alt: string
  ratio?: number
}

export default function ImageBox({ src, alt, ratio, ...props }: ImageBoxProps) {
  return (
    <Box position="relative" overflow="hidden" {...props}>
      {ratio ? (
        <AspectRatio ratio={ratio}>
          <Image src={src} layout="fill" objectFit="cover" />
        </AspectRatio>
      ) : (
        <Image src={src} layout="fill" objectFit="cover" />
      )}
    </Box>
  )
}
