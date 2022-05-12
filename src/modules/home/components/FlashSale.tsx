import { Box, HStack, Text } from "@chakra-ui/react"
import { responsiveW } from "configs/constants"
import { IProduct } from "interfaces/IProduct"
import { SectionTitle } from "modules/home/components/SectionTitle"
import ProductCard from "modules/products/components/ProductCard"
import React from "react"
import { IoFlashOutline } from "react-icons/io5"
import { colors } from "styles/theme"
import { Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

interface FlashSaleProps {
  products: IProduct[]
}

export default function FlashSale({ products }: FlashSaleProps) {
  return (
    <Box>
      <SectionTitle color={colors.red}>
        <HStack justifyContent="center">
          <Text>Deal sốc</Text> <IoFlashOutline />
        </HStack>
      </SectionTitle>

      <Box w={{ ...responsiveW }} mx="auto">
        {products.length ? (
          <Swiper
            centeredSlides
            slidesPerView="auto"
            spaceBetween={20}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Autoplay]}
            loop
            className="swiper-slide-fit"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <Box w="270px">
                  <ProductCard data={product} layout="vertical" />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </Box>
    </Box>
  )
}
