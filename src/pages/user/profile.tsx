import { Grid } from "@chakra-ui/react"
import { NextBreadcrumb, PageContainer, PageHeader } from "components"
import { PageTitle } from "configs/constants"
import { firebaseAuth } from "configs/firebase"
import { RecaptchaVerifier } from "firebase/auth"
import { PageProps, UserLayout } from "layout"
import {
  FormUpdateAvatar,
  FormUpdateProfile,
} from "modules/users/components/profile"
import { UserRole } from "modules/users/interfaces"
import { GetStaticPropsResult } from "next"
import { useEffect } from "react"

export async function getStaticProps(): Promise<
  GetStaticPropsResult<PageProps>
> {
  return {
    props: {
      title: PageTitle.USER_PROFILE,
      roles: [UserRole.CUSTOMER, UserRole.MOD, UserRole.ADMIN],
    },
  }
}

export default function UserProfile() {
  useEffect(() => {
    //@ts-ignore
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
      },
      firebaseAuth
    )

    return () => {
      //@ts-ignore
      ;(window.recaptchaVerifier as RecaptchaVerifier).clear()
    }
  }, [])

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
      <div id="recaptcha" />
    </PageContainer>
  )
}
