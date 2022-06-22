import { Box, Grid, Heading, HStack, Skeleton, Text } from "@chakra-ui/react"
import { responsiveW } from "configs/constants"
import { ProductCard } from "modules/products/components"
import { useGetProductList } from "modules/products/hooks"
import { IoFlashOutline } from "react-icons/io5"
import { Color } from "styles/theme"
import { Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { getArrayNumber } from "utils"

export function FlashSale() {
  const { data, isLoading } = useGetProductList({
    in_sale: true,
    take: 10,
  })

  return (
    <Box>
      <Heading color={Color.RED}>
        <HStack justifyContent="center">
          <Text>Deal sốc</Text> <IoFlashOutline />
        </HStack>
      </Heading>

      <Box w={{ ...responsiveW }} mt="6" mx="auto">
        {isLoading ? (
          <Grid gridTemplateColumns="repeat(4, 1fr)" gap="5">
            {getArrayNumber(4).map((item) => (
              <Skeleton h="300px" borderRadius="8" key={item} />
            ))}
          </Grid>
        ) : (
          data?.data?.length && (
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
              {data?.data?.map((product) => (
                <SwiperSlide key={product.id}>
                  <Box w="270px">
                    <ProductCard data={product} layout="vertical" />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          )
        )}
      </Box>
    </Box>
  )
}
