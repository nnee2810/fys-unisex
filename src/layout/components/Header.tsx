import {
  Box,
  Center,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Grid,
  HStack,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  useBoolean,
} from "@chakra-ui/react"
import styled from "@emotion/styled"
import Badge from "components/Badge"
import CustomLink from "components/CustomLink"
import Logo from "components/Logo"
import { responsiveW, zIndex } from "configs/constants"
import { headerNavItems } from "modules/home/constants"
import { useRouter } from "next/router"
import React, { useCallback, useEffect, useRef } from "react"
import { AiOutlineHeart, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai"
import { BsCart2 } from "react-icons/bs"
import { colors } from "styles/theme"
import ModalSearch from "./ModalSearch"

interface HeaderProps {
  path: string
}
function HeaderActions() {
  const [openSearch, setOpenSearch] = useBoolean()
  return (
    <>
      <HStack spacing="3" justifyContent="flex-end">
        <Tooltip label="Tìm kiếm">
          <Box cursor="pointer" onClick={setOpenSearch.on}>
            <AiOutlineSearch fontSize="24" />
          </Box>
        </Tooltip>
        <CustomLink href="#">
          <Badge value={1}>
            <Tooltip label="Yêu thích">
              <Box>
                <AiOutlineHeart fontSize="24" />
              </Box>
            </Tooltip>
          </Badge>
        </CustomLink>
        <CustomLink href="#">
          <Badge value={100} max={9}>
            <Tooltip label="Giỏ hàng">
              <Box transform="translateY(-1px)">
                <BsCart2 fontSize="24" />
              </Box>
            </Tooltip>
          </Badge>
        </CustomLink>
      </HStack>
      <ModalSearch isOpen={openSearch} onClose={setOpenSearch.off} />
    </>
  )
}
function HeaderDesktop({ path }: HeaderProps) {
  return (
    <Box display={{ base: "none", lg: "block" }}>
      <Grid
        w={{ ...responsiveW }}
        mx="auto"
        templateColumns="1fr auto 1fr"
        alignItems="center"
      >
        <Logo />
        <Flex justifyContent="center">
          {headerNavItems.map((item, idx) => (
            <Popover
              trigger="hover"
              gutter={0}
              placement="bottom-start"
              key={"header" + idx}
            >
              <CustomLink href={item.href}>
                <PopoverTrigger>
                  <HeaderItemStyled isActive={path === item.href}>
                    {item.name}
                  </HeaderItemStyled>
                </PopoverTrigger>
              </CustomLink>

              {item.childs?.length && (
                <PopoverContent overflow="hidden">
                  {item.childs.map((child, idx) => (
                    <CustomLink href={child.href} key={"headerChild" + idx}>
                      <HeaderItemStyled>{child.name}</HeaderItemStyled>
                    </CustomLink>
                  ))}
                </PopoverContent>
              )}
            </Popover>
          ))}
        </Flex>
        <HeaderActions />
      </Grid>
    </Box>
  )
}
function HeaderMobile({ path }: HeaderProps) {
  const [navOpen, setNavOpen] = useBoolean()
  return (
    <Box display={{ base: "block", lg: "none" }}>
      <Grid
        templateColumns="repeat(3, 1fr)"
        w={{ ...responsiveW }}
        mx="auto"
        py="2"
        alignItems="center"
      >
        <Box>
          <AiOutlineMenu
            fontSize="22"
            cursor="pointer"
            onClick={setNavOpen.on}
          />
        </Box>
        <Center>
          <Logo />
        </Center>
        <HeaderActions />
      </Grid>
      <Drawer placement="left" isOpen={navOpen} onClose={setNavOpen.off}>
        <DrawerOverlay />
        <DrawerContent>
          <Box>
            {headerNavItems.map((item, idx) => (
              <CustomLink href={item.href} key={"header" + idx}>
                <HeaderItemStyled
                  isActive={path === item.href}
                  isMobile
                  onClick={setNavOpen.off}
                >
                  {item.name}
                </HeaderItemStyled>
              </CustomLink>
            ))}
          </Box>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default function Header() {
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
      bg="white"
      boxShadow="md"
      transform={`translateY(${visible ? 0 : -125}px)`}
      transition="all .4s"
      zIndex={zIndex.header}
    >
      <HeaderDesktop path={router.pathname} />
      <HeaderMobile path={router.pathname} />
    </Box>
  )
}
const HeaderItemStyled = styled(Box)`
  padding: 16px;
  font-weight: 500;
  transition: all 0.25s;

  background: ${({ isActive }) => (isActive ? colors.primary : "#fff")};
  color: ${({ isActive }) => (isActive ? "#fff" : colors.primary)};

  &:hover {
    background: ${colors.primary};
    color: white;
  }
`
