import { Flex, Heading, useBoolean } from "@chakra-ui/react"
import { Button, PageContainer } from "components"
import { IPageProps, UserRole } from "interfaces"
import UserLayout from "layout/UserLayout"
import { ModalCreateUserAddress } from "modules/users/components"
import { GetStaticPropsContext, GetStaticPropsResult } from "next"

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<IPageProps>> {
  return {
    props: {
      title: "Địa chỉ",
      roles: [UserRole.CUSTOMER, UserRole.MOD, UserRole.ADMIN],
    },
  }
}

export default function UserAddress() {
  const [openCreateUserAddress, setOpenCreateUserAddress] = useBoolean()
  return (
    <PageContainer>
      <UserLayout>
        <Flex justifyContent="space-between">
          <Heading size="lg">Địa chỉ</Heading>
          <Button onClick={setOpenCreateUserAddress.on}>
            Thêm địa chỉ mới
          </Button>
        </Flex>
      </UserLayout>
      <ModalCreateUserAddress
        isOpen={openCreateUserAddress}
        onClose={setOpenCreateUserAddress.off}
      />
    </PageContainer>
  )
}
