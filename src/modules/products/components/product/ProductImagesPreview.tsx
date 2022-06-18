import { Box, BoxProps, Tag } from "@chakra-ui/react"
import { NextImage } from "components"
import { IProductEntity } from "modules/products/interfaces"
import { useCallback, useState } from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import styled from "styled-components"
import { Color } from "styles/theme"
import { Swiper, SwiperSlide } from "swiper/react"
import { getImageFallback } from "utils"

interface ProductImagesPreviewProps {
  data: IProductEntity
}

export function ProductImagesPreview({
  data: { images, in_sale },
}: ProductImagesPreviewProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  const handleSelectImage = useCallback((value: number) => {
    if (value >= images.length) return setSelectedImage(0)
    if (value < 0) return setSelectedImage(images.length - 1)
    setSelectedImage(value)
  }, [])

  return (
    <Box pos="relative">
      <NextImage
        h="650px"
        borderRadius="16"
        src={images[selectedImage] || getImageFallback(500)}
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
              <NextImage
                w="50px"
                h="50px"
                border={`1px solid ${Color.PRIMARY}`}
                borderRadius="8"
                opacity={idx === selectedImage ? 1 : 0.5}
                transition="all .2s"
                cursor="pointer"
                src={image}
                alt={"productImage" + idx}
                onClick={() => setSelectedImage(idx)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      {in_sale && (
        <Box position="absolute" top="4" left="4">
          <Tag fontWeight="500" color="#fff" backgroundColor={Color.RED}>
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
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`
