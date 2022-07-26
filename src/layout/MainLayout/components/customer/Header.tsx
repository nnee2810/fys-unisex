import { Box, useBoolean } from "@chakra-ui/react"
import { zIndex } from "configs/constants"
import { useRouter } from "next/router"
import { useCallback, useEffect, useRef } from "react"
import { HeaderDesktop, HeaderMobile } from "."

export interface HeaderProps {
  path: string
}

export function Header() {
  const router = useRouter()
  const [visible, setVisible] = useBoolean(true)
  const lastScrollY = useRef(0)

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    if (scrollY < 300) return
    if (scrollY > lastScrollY.current) setVisible.off()
    else setVisible.on()

    lastScrollY.current = Math.max(0, scrollY)
  }, [setVisible])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])
  useEffect(() => {
    if (!visible) setVisible.on()
  }, [router.asPath])

  return (
    <Box
      pos="fixed"
      top="0"
      w="100%"
      bgColor="white"
      boxShadow="md"
      transform={`translateY(${visible ? 0 : -54}px)`}
      transition="all .4s"
      zIndex={zIndex.HEADER}
    >
      <HeaderDesktop path={router.pathname} />
      <HeaderMobile path={router.pathname} />
    </Box>
  )
}
