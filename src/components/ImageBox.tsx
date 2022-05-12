import { Box, BoxProps } from "@chakra-ui/react"
import Image from "next/image"
import React from "react"

interface ImageBoxProps extends BoxProps {
  src: string
  alt: string
}

export default function ImageBox({ src, alt, ...props }: ImageBoxProps) {
  return (
    <Box position="relative" overflow="hidden" {...props}>
      <Image src={src} layout="fill" objectFit="cover" />
    </Box>
  )
}
