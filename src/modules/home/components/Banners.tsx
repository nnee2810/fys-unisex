import { Box } from "@chakra-ui/react"
import { ImageBox } from "components"
import { Autoplay, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { getArrayNumber, getImageFallback } from "utils"

const bannerItems = getArrayNumber(5).map(() => getImageFallback(1000))

export function Banners() {
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
