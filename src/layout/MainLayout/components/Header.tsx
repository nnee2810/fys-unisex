import {
  Box,
  Center,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Grid,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Popover,
  PopoverContent,
  useBoolean,
} from "@chakra-ui/react"
import Badge from "components/Badge"
import Logo from "components/Logo"
import { MenuItem } from "components/Menu"
import NextLink from "components/NextLink"
import PopoverTrigger from "components/PopoverTrigger"
import { responsiveW, zIndex } from "configs/constants"
import { useAuth } from "modules/auth/hooks/useAuth"
import { headerNavItems } from "modules/home/constants"
import { useRouter } from "next/router"
import React, { useCallback, useEffect, useRef } from "react"
import {
  AiOutlineFileText,
  AiOutlineMenu,
  AiOutlinePoweroff,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineSolution,
  AiOutlineUser,
} from "react-icons/ai"
import { AuthStatus } from "store/reducers/auth"
import styled from "styled-components"
import { Color } from "styles/theme"
import ModalSearchProducts from "./ModalSearchProducts"

interface HeaderProps {
  path: string
}
function HeaderActions() {
  const { status, signOut } = useAuth()
  const [openSearch, setOpenSearch] = useBoolean()

  return (
    <>
      <HStack spacing="3" justifyContent="flex-end">
        <Box cursor="pointer" onClick={setOpenSearch.on}>
          <AiOutlineSearch fontSize="24" />
        </Box>

        <NextLink href="/cart">
          <Badge value={100} max={9}>
            <AiOutlineShoppingCart fontSize="24" />
          </Badge>
        </NextLink>

        {status === AuthStatus.AUTHENTICATED ? (
          <Menu placement="bottom-end">
            <MenuButton>
              <AiOutlineUser fontSize="24" />
            </MenuButton>
            <MenuList>
              <NextLink href="/user/profile">
                <MenuItem icon={<AiOutlineSolution fontSize="20" />}>
                  Tài khoản của tôi
                </MenuItem>
              </NextLink>
              <NextLink href="/user/orders">
                <MenuItem icon={<AiOutlineFileText fontSize="20" />}>
                  Đơn mua
                </MenuItem>
              </NextLink>
              <MenuItem
                icon={<AiOutlinePoweroff fontSize="20" />}
                onClick={signOut}
              >
                Đăng xuất
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <NextLink href="/auth/sign-in">
            <AiOutlineUser fontSize="24" />
          </NextLink>
        )}
      </HStack>
      <ModalSearchProducts isOpen={openSearch} onClose={setOpenSearch.off} />
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
        <HStack spacing="4" justifyContent="center">
          {headerNavItems.map((item, idx) => (
            <Popover
              trigger="hover"
              gutter={0}
              placement="bottom-start"
              key={idx}
            >
              <NextLink href={item.href}>
                <PopoverTrigger>
                  <StyledHeaderItem $active={path === item.href}>
                    {item.name}
                  </StyledHeaderItem>
                </PopoverTrigger>
              </NextLink>
              {item.childs?.length && (
                <PopoverContent overflow="hidden">
                  {item.childs.map((child, idx) => (
                    <NextLink href={child.href} key={idx}>
                      <StyledHeaderItem>{child.name}</StyledHeaderItem>
                    </NextLink>
                  ))}
                </PopoverContent>
              )}
            </Popover>
          ))}
        </HStack>
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
              <NextLink href={item.href} key={idx}>
                <StyledHeaderItem
                  $active={path === item.href}
                  onClick={setNavOpen.off}
                >
                  {item.name}
                </StyledHeaderItem>
              </NextLink>
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
      py="2"
      bg="white"
      boxShadow="md"
      transform={`translateY(${visible ? 0 : -80}px)`}
      transition="all .4s"
      zIndex={zIndex.HEADER}
    >
      <HeaderDesktop path={router.pathname} />
      <HeaderMobile path={router.pathname} />
    </Box>
  )
}

const StyledHeaderItem = styled(Box)`
  position: relative;
  font-weight: 500;
  transition: all 0.2s;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ $active }) => ($active ? "100%" : 0)};
    height: 2px;
    background-color: ${Color.PRIMARY};
    transition: all 0.2s;
  }
  &:hover::before {
    width: 100%;
  }
`
