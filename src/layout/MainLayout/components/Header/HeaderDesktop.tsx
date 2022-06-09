import { Box, Grid, HStack, Stack, Text } from "@chakra-ui/react"
import Logo from "components/Logo"
import NextLink from "components/NextLink"
import { responsiveW } from "configs/constants"
import { navItems } from "modules/home/constants"
import styled from "styled-components"
import { Color } from "styles/theme"
import { HeaderProps } from "."
import HeaderActions from "./HeaderActions"

export default function HeaderDesktop({ path }: HeaderProps) {
  return (
    <Box pos="relative" display={{ base: "none", lg: "block" }}>
      <Grid
        w={{ ...responsiveW }}
        mx="auto"
        templateColumns="1fr auto 1fr"
        alignItems="center"
      >
        <Logo />
        <HStack spacing="4" justifyContent="center">
          {navItems.map((item, idx) => (
            <NavItemContainer>
              <NextLink href={item.href} key={idx}>
                <NavItemLink active={path === item.href}>
                  {item.name}
                </NavItemLink>
              </NextLink>
              {item.childs && (
                <NavChildsContainer
                  boxShadow="md"
                  className="nav-childs-container"
                >
                  <HStack
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing="60px"
                  >
                    {item.childs.map((category, idx) => (
                      <Stack alignItems="flex-start">
                        <Text fontWeight="700" key={idx}>
                          {category.name}
                        </Text>
                        {category?.childs?.map((child, idx) => (
                          <NextLink href={child.href} styleOnHover key={idx}>
                            <Text color="#7a7a7a" fontSize="14">
                              {child.name}
                            </Text>
                          </NextLink>
                        ))}
                      </Stack>
                    ))}
                  </HStack>
                </NavChildsContainer>
              )}
            </NavItemContainer>
          ))}
        </HStack>
        <HeaderActions />
      </Grid>
    </Box>
  )
}
const NavItemContainer = styled(Box)`
  &:hover {
    .nav-childs-container {
      visibility: visible;
      opacity: 1;
    }
  }
`
const NavItemLink = styled(Box)<{ active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  height: 54px;
  font-weight: 700;
  transition: all 0.2s;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ active }) => (active ? "100%" : 0)};
    height: 2px;
    background-color: ${Color.PRIMARY};
    transition: all 0.2s;
  }
  &:hover::before {
    width: 100%;
  }
`
const NavChildsContainer = styled(Box)`
  position: absolute;
  left: 0;
  width: 100vw;
  padding: 24px 0;
  background-color: #fff;
  visibility: hidden;
  opacity: 0;
  transition: all 0.2s;
`
