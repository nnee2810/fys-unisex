import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Grid,
  useBoolean,
} from "@chakra-ui/react"
import Logo from "components/Logo"
import NextLink from "components/NextLink"
import { responsiveW } from "configs/constants"
import { navItems } from "modules/home/constants"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { AiOutlineMenu } from "react-icons/ai"
import styled from "styled-components"
import { Color } from "styles/theme"
import { HeaderProps } from "."
import HeaderActions from "./HeaderActions"

export default function HeaderMobile({ path }: HeaderProps) {
  const router = useRouter()
  const [navOpen, setNavOpen] = useBoolean()

  useEffect(() => {
    setNavOpen.off()
  }, [router.asPath])

  return (
    <Box display={{ base: "block", lg: "none" }}>
      <Grid
        templateColumns="repeat(3, 1fr)"
        w={{ ...responsiveW }}
        h="54px"
        mx="auto"
        alignItems="center"
      >
        <AiOutlineMenu fontSize="22" cursor="pointer" onClick={setNavOpen.on} />
        <Center>
          <Logo />
        </Center>
        <HeaderActions />
      </Grid>
      <Drawer placement="left" isOpen={navOpen} onClose={setNavOpen.off}>
        <DrawerOverlay />
        <DrawerContent>
          <Accordion allowToggle>
            {navItems.map((item, idx) =>
              item.childs ? (
                <AccordionItem>
                  <Flex>
                    <Box flex="1">
                      <NextLink href={item.href}>
                        <NavItemLink active={path === item.href}>
                          {item.name}
                        </NavItemLink>
                      </NextLink>
                    </Box>
                    <AccordionButton w="auto">
                      <AccordionIcon />
                    </AccordionButton>
                  </Flex>
                  <AccordionPanel p="0">
                    {item.childs.map((child, idx) => (
                      <NextLink href={child.href} key={idx}>
                        <NavItemLink p="0 32px">{child.name}</NavItemLink>
                      </NextLink>
                    ))}
                  </AccordionPanel>
                </AccordionItem>
              ) : (
                <NextLink href={item.href} key={idx}>
                  <NavItemLink active={path === item.href}>
                    {item.name}
                  </NavItemLink>
                </NextLink>
              )
            )}
          </Accordion>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

const NavItemLink = styled(Box)<{ active: boolean }>`
  display: flex;
  align-items: center;
  height: 54px;
  padding: 0 16px;
  font-weight: 700;
  color: ${({ active }) => active && "#fff"};
  background-color: ${({ active }) => active && "#000"};
  transition: all 0.2s;

  &:hover {
    background-color: ${({ active }) => (active ? "#000" : Color.LIGHT_GRAY)};
  }
`
