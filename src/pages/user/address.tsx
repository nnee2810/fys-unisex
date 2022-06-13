import { Flex, Heading, useBoolean } from "@chakra-ui/react"
import { Button, PageContainer } from "components"
import { IPageProps, UserRole } from "interfaces"
import UserLayout from "layout/UserLayout"
import { ModalCreateAddress } from "modules/users/components"
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
  const [openCreateAddress, setOpenCreateAddress] = useBoolean()
  return (
    <PageContainer>
      <UserLayout>
        <Flex justifyContent="space-between">
          <Heading size="lg">Địa chỉ</Heading>
          <Button onClick={setOpenCreateAddress.on}>Thêm địa chỉ</Button>
        </Flex>
      </UserLayout>
      <ModalCreateAddress
        isOpen={openCreateAddress}
        onClose={setOpenCreateAddress.off}
      />
    </PageContainer>
  )
}
