import { Box } from "@chakra-ui/react"
import Image from "next/image"
import React from "react"
import { Autoplay, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import generateArrayNumber from "utils/generateArrayNumber"
import { getFallbackImage } from "utils/getFallbackImage"

const bannerItems = generateArrayNumber(5).map(() => getFallbackImage(1000))

export default function Banner() {
  return (
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
        <SwiperSlide key={"banner" + idx}>
          <Box h={{ base: "calc(100vh - 56px)", lg: "calc(100vh - 53px)" }}>
            <Image src={item} layout="fill" objectFit="cover" />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
