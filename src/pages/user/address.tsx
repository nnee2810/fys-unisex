import { useBoolean } from "@chakra-ui/react"
import { NextBreadcrumb, NextButton, PageContainer } from "components"
import { PageHeader } from "components/PageHeader"
import { PageTitle } from "configs/constants"
import { PageProps } from "layout/MainLayout"
import UserLayout from "layout/UserLayout"
import { ModalCreateAddress } from "modules/users/components"
import { UserRole } from "modules/users/interfaces"
import { GetStaticPropsContext, GetStaticPropsResult } from "next"

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<PageProps>> {
  return {
    props: {
      title: PageTitle.USER_ADDRESS,
      roles: [UserRole.CUSTOMER, UserRole.MOD, UserRole.ADMIN],
    },
  }
}

export default function UserAddress() {
  const [openCreateAddress, setOpenCreateAddress] = useBoolean()

  return (
    <PageContainer>
      <NextBreadcrumb
        data={[
          {
            href: `/user/address`,
            name: PageTitle.USER_ADDRESS,
          },
        ]}
      />
      <UserLayout>
        <PageHeader
          title="Địa chỉ"
          actions={
            <NextButton onClick={setOpenCreateAddress.on}>
              Thêm địa chỉ
            </NextButton>
          }
        />
      </UserLayout>
      <ModalCreateAddress
        isOpen={openCreateAddress}
        onClose={setOpenCreateAddress.off}
      />
    </PageContainer>
  )
}
