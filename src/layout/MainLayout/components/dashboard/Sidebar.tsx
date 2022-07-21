import { Box, Center, Flex, HStack, Stack, Tag, Text } from "@chakra-ui/react"
import { Logo, NextImage, NextLink } from "components"
import { dashboardSidebarItems } from "layout/MainLayout/constants"
import { useAuth } from "modules/auth/hooks"
import { useRouter } from "next/router"
import { AiOutlinePoweroff } from "react-icons/ai"
import { Color } from "styles/theme"

export function Sidebar() {
  const router = useRouter()
  const { profile, signOut } = useAuth()

  return (
    <Flex
      px="6"
      py="4"
      flexDirection="column"
      justifyContent="space-between"
      borderRight={`2px solid ${Color.LIGHT_GRAY}`}
    >
      <Box>
        <Center>
          <Logo />
        </Center>
        <Stack spacing="1" mt="6">
          {dashboardSidebarItems.map((item, idx) => (
            <Box pos="relative" key={idx}>
              <NextLink href={item.href}>
                <Flex
                  px="3"
                  py="2"
                  justifyContent="space-between"
                  bgColor={
                    item.href === router.pathname ? Color.PRIMARY : "#fff"
                  }
                  color={item.href === router.pathname ? "#fff" : "#000"}
                  borderRadius="6"
                  transition="all .2s"
                  _hover={{
                    bg:
                      item.href === router.pathname
                        ? Color.PRIMARY
                        : Color.LIGHT_GRAY,
                  }}
                >
                  <HStack>
                    {item.icon} <Text fontWeight="500">{item.name}</Text>
                  </HStack>
                  {item.name === "Đơn hàng" && <Tag colorScheme="red">100</Tag>}
                </Flex>
              </NextLink>
              {item.href === router.pathname && (
                <Box
                  pos="absolute"
                  top="3px"
                  left="-8px"
                  w="4px"
                  h="29px"
                  bgColor={Color.PRIMARY}
                  borderRadius="2"
                />
              )}
            </Box>
          ))}
        </Stack>
      </Box>
      <Flex justifyContent="space-between" alignItems="center">
        <NextLink href="/user/profile">
          <HStack>
            <NextImage
              w="40px"
              h="40px"
              src={profile?.avatar}
              alt="avatar"
              borderRadius="6"
            />
            <Box>
              <Text fontWeight="500">{profile?.name}</Text>
              <Tag colorScheme="green">{profile?.role}</Tag>
            </Box>
          </HStack>
        </NextLink>
        <AiOutlinePoweroff fontSize="20" cursor="pointer" onClick={signOut} />
      </Flex>
    </Flex>
  )
}
