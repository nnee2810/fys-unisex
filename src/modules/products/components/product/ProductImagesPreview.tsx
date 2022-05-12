import { Box, BoxProps, Tag } from "@chakra-ui/react"
import ImageBox from "components/ImageBox"
import { IProduct } from "interfaces/IProduct"
import React, { useCallback, useState } from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import styled from "styled-components"
import { colors } from "styles/theme"
import { Swiper, SwiperSlide } from "swiper/react"

interface ProductImagesPreviewProps {
  data: IProduct
}

export default function ProductImagesPreview({
  data: { images, isSale },
}: ProductImagesPreviewProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  const handleSelectImage = useCallback((value: number) => {
    if (value >= images.length) return setSelectedImage(0)
    if (value < 0) return setSelectedImage(images.length - 1)
    setSelectedImage(value)
  }, [])

  return (
    <Box pos="relative">
      <ImageBox
        h="700px"
        borderRadius="16"
        src={images[selectedImage]}
        alt={"productImage" + selectedImage}
      />
      <Box pos="absolute" bottom="4" w="100%" px="4">
        <Swiper
          slidesPerView="auto"
          spaceBetween={12}
          className="swiper-slide-fit"
        >
          {images.map((image, idx) => (
            <SwiperSlide key={idx}>
              <ImageBox
                w="50px"
                h="50px"
                border={`1px solid ${colors.primary}`}
                borderRadius="8"
                opacity={idx === selectedImage ? 1 : 0.5}
                transition="all .25s"
                cursor="pointer"
                src={image}
                alt={"productImage" + idx}
                onClick={() => setSelectedImage(idx)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      {isSale && (
        <Box position="absolute" top="4" left="4">
          <Tag fontWeight="500" color="#fff" backgroundColor={colors.red}>
            SALE
          </Tag>
        </Box>
      )}
      <IconContainer
        left="4"
        onClick={() => handleSelectImage(selectedImage - 1)}
      >
        <BiChevronLeft fontSize="28" color="black" />
      </IconContainer>
      <IconContainer
        right="4"
        onClick={() => handleSelectImage(selectedImage + 1)}
      >
        <BiChevronRight fontSize="28" color="black" />
      </IconContainer>
    </Box>
  )
}
const IconContainer = styled(Box)<BoxProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  border-radius: 6px;
  opacity: 0.5;
  transition: all 0.25s;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`
