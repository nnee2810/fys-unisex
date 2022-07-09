import {
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBoolean,
} from "@chakra-ui/react"
import { Badge, NextLink } from "components"
import { isStaff } from "helpers"
import { useAuth } from "modules/auth/hooks"
import {
  AiOutlineAppstore,
  AiOutlineFileText,
  AiOutlinePoweroff,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineSolution,
  AiOutlineUser,
} from "react-icons/ai"
import { AuthStatus } from "store/reducers/auth"
import { ModalSearchProducts } from "."

export function CustomerHeaderActions() {
  const { status, profile, signOut } = useAuth()
  const [openSearch, setOpenSearch] = useBoolean()

  return (
    <Box>
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
              {isStaff(profile) && (
                <NextLink href="/dashboard/overview">
                  <MenuItem icon={<AiOutlineAppstore fontSize="20" />}>
                    Bảng điều khiển
                  </MenuItem>
                </NextLink>
              )}
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
    </Box>
  )
}
