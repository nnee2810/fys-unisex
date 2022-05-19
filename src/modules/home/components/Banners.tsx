import { Box } from "@chakra-ui/react"
import ImageBox from "components/ImageBox"
import React from "react"
import { Autoplay, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import generateArrayNumber from "utils/getArrayNumber"
import { getFallbackImage } from "utils/getFallbackImage"

const bannerItems = generateArrayNumber(5).map(() => getFallbackImage(1000))

export default function Banner() {
  return (
    <Box>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay, Pagination]}
        loop
      >
        {bannerItems.map((item, idx) => (
          <SwiperSlide key={idx}>
            <ImageBox
              h={{ base: "calc(100vh - 56px)", lg: "calc(100vh - 53px)" }}
              src={item}
              alt={"banner" + idx}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}
