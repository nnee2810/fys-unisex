import { Grid, Heading } from "@chakra-ui/react"
import PageContainer from "components/PageContainer"
import { Role } from "interfaces/IUser"
import { PageProps } from "layout"
import UserLayout from "layout/UserLayout"
import FormUpdateAvatar from "modules/users/components/profile/FormUpdateAvatar"
import FormUpdateProfile from "modules/users/components/profile/FormUpdateProfile"
import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import React from "react"

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<PageProps>> {
  return {
    props: {
      title: "Tài khoản của tôi",
      roles: [Role.Customer, Role.Mod, Role.Admin],
    },
  }
}

export default function Profile() {
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
