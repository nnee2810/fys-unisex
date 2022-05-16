import { Box, Fade, useBoolean } from "@chakra-ui/react"
import { zIndex } from "configs/constants"
import React, { useCallback, useEffect } from "react"
import { BsArrowUp } from "react-icons/bs"
import { colors } from "styles/theme"

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
        bg={colors.lightGray}
        borderRadius="8"
        cursor="pointer"
        zIndex={zIndex.backToTop}
        transition="all .2s"
        _hover={{
          bg: colors.primary,
          color: "white",
        }}
        onClick={scrollToTop}
      >
        <BsArrowUp fontSize="24" />
      </Box>
    </Fade>
  )
}
