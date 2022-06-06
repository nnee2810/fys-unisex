import { Grid, Heading } from "@chakra-ui/react"
import PageContainer from "components/PageContainer"
import { IPageProps } from "interfaces/IPageProps"
import { UserRole } from "interfaces/IUser"
import UserLayout from "layout/UserLayout"
import FormUpdateAvatar from "modules/users/components/profile/FormUpdateAvatar"
import FormUpdateProfile from "modules/users/components/profile/FormUpdateProfile"
import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import React from "react"

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
