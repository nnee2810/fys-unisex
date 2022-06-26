import { Grid } from "@chakra-ui/react"
import { NextBreadcrumb, PageContainer, PageHeader } from "components"
import { PageTitle } from "configs/constants"
import { PageProps, UserLayout } from "layout"
import { FormUpdateAvatar, FormUpdateProfile } from "modules/users/components"
import { UserRole } from "modules/users/interfaces"
import { GetStaticPropsContext, GetStaticPropsResult } from "next"

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<PageProps>> {
  return {
    props: {
      title: PageTitle.USER_PROFILE,
      roles: [UserRole.CUSTOMER, UserRole.MOD, UserRole.ADMIN],
    },
  }
}

export default function UserProfile() {
  return (
    <PageContainer>
      <NextBreadcrumb
        data={[
          {
            href: `/user/profile`,
            name: PageTitle.USER_PROFILE,
          },
        ]}
      />
      <UserLayout>
        <PageHeader label="Tài khoản của tôi" />
        <Grid templateColumns="auto 200px" gap="10">
          <FormUpdateProfile />
          <FormUpdateAvatar />
        </Grid>
      </UserLayout>
    </PageContainer>
  )
}
