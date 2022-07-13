import { useBoolean } from "@chakra-ui/react"
import {
  NextBreadcrumb,
  NextButton,
  PageContainer,
  PageHeader,
} from "components"
import { PageTitle } from "configs/constants"
import { PageProps, UserLayout } from "layout"
import {
  AddressList,
  ModalCreateAddress,
} from "modules/users/components/address"
import { UserRole } from "modules/users/interfaces"
import { GetStaticPropsResult } from "next"

export async function getStaticProps(): Promise<
  GetStaticPropsResult<PageProps>
> {
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
          label="Địa chỉ"
          actions={
            <NextButton onClick={setOpenCreateAddress.on}>
              Thêm địa chỉ
            </NextButton>
          }
        />
        <AddressList />
      </UserLayout>
      <ModalCreateAddress
        isOpen={openCreateAddress}
        onClose={setOpenCreateAddress.off}
      />
    </PageContainer>
  )
}
