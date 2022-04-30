import { Box, Fade, useBoolean } from "@chakra-ui/react"
import { zIndex } from "configs/constants"
import React, { useCallback, useEffect } from "react"
import { BsArrowUp } from "react-icons/bs"

export default function BackToTop() {
  const [visible, setVisible] = useBoolean()

  const handleScroll = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop
    if (scrollTop > 500) setVisible.on()
    else setVisible.off()
  }, [setVisible])
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  return (
    <Fade in={visible}>
      <Box
        pos="fixed"
        bottom="4"
        right="4"
        p="2"
        bg="#ebebeb"
        borderRadius="8"
        cursor="pointer"
        zIndex={zIndex.backToTop}
        transition="all .25s"
        _hover={{
          bg: "black",
          color: "white",
        }}
        onClick={scrollToTop}
      >
        <BsArrowUp fontSize="24" />
      </Box>
    </Fade>
  )
}
