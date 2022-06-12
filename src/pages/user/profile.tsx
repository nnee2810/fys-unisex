import { Grid, Heading } from "@chakra-ui/react"
import { PageContainer } from "components"
import { IPageProps, UserRole } from "interfaces"
import UserLayout from "layout/UserLayout"
import { FormUpdateAvatar, FormUpdateProfile } from "modules/users/components"
import { GetStaticPropsContext, GetStaticPropsResult } from "next"

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<IPageProps>> {
  return {
    props: {
      title: "Tài khoản của tôi",
      roles: [UserRole.CUSTOMER, UserRole.MOD, UserRole.ADMIN],
    },
  }
}

export default function UserProfile() {
  return (
    <PageContainer>
      <UserLayout>
        <Heading size="lg">Tài khoản của tôi</Heading>
        <Grid mt="5" templateColumns="auto 200px" gap="10">
          <FormUpdateProfile />
          <FormUpdateAvatar />
        </Grid>
      </UserLayout>
    </PageContainer>
  )
}
