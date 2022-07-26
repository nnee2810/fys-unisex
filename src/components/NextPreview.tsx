import { Box, CloseButton, Flex, Text } from "@chakra-ui/react"
import { ModalBaseProps } from "interfaces"
import { useEffect, useRef } from "react"
import ReactFocusLock from "react-focus-lock"
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch"
import { Swiper, SwiperSlide } from "swiper/react"
import { NextImage } from "./NextImage"

interface NextPreviewProps extends ModalBaseProps {
  data: string[]
  position: number
  onChange(position: number): void
}

export function NextPreview({
  isOpen,
  data,
  position,
  onChange,
  onClose,
}: NextPreviewProps) {
  const zoomRef = useRef<ReactZoomPanPinchRef>(null)

  useEffect(() => {
    zoomRef.current?.centerView(1)
  }, [position])

  return isOpen ? (
    <ReactFocusLock>
      <Box
        pos="fixed"
        top="0"
        left="0"
        w="100vw"
        h="100vh"
        color="#fff"
        bgColor="#000000bf"
        zIndex="2000"
      >
        <Flex
          pos="absolute"
          w="100%"
          p="2"
          justifyContent="space-between"
          alignItems="center"
          zIndex="2001"
        >
          <Text>
            {position} / {data.length}
          </Text>
          <CloseButton onClick={onClose} />
        </Flex>
        <TransformWrapper ref={zoomRef} centerOnInit minScale={0.5}>
          <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
            <img src={data[position - 1]} alt="" />
          </TransformComponent>
        </TransformWrapper>
        <Box pos="absolute" bottom="0" w="100%" p="2" zIndex="2001">
          <Swiper
            centeredSlides
            slidesPerView="auto"
            spaceBetween={6}
            className="swiper-slide-fit"
          >
            {data.map((src, idx) => (
              <SwiperSlide key={idx}>
                <NextImage
                  src={src}
                  w="50px"
                  h="50px"
                  borderRadius="8"
                  opacity={idx === position - 1 ? 1 : 0.5}
                  transition="all .2s"
                  cursor="pointer"
                  onClick={() => onChange(idx + 1)}
                  _hover={{
                    opacity: 1,
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </ReactFocusLock>
  ) : null
}
