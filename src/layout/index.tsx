import { Box } from "@chakra-ui/react"
import LoadingPage from "components/LoadingPage"
import { canAccess } from "helpers/canAccess"
import { Role } from "interfaces/IUser"
import useAuth from "modules/auth/hooks/useAuth"
import Head from "next/head"
import { useRouter } from "next/router"
import React, { ReactNode, useEffect } from "react"
import { AuthStatus } from "store/reducers/auth"
import { getTitle } from "utils/getTitle"
import BackToTop from "./components/BackToTop"
import Footer from "./components/Footer"
import Header from "./components/Header"

export interface PageProps {
  title: string
  roles?: Role[]
}
interface LayoutProps {
  children: ReactNode
  pageProps: PageProps
}

export default function Layout({ children, pageProps }: LayoutProps) {
  const router = useRouter()
  const { status, profile, fetchProfile } = useAuth()

  useEffect(() => {
    if (status === AuthStatus.LOADING) fetchProfile()
  }, [])

  if (pageProps?.roles?.length) {
    if (status === AuthStatus.LOADING) return <LoadingPage />
    if (
      !canAccess({
        userRole: profile?.role,
        pageRoles: pageProps.roles,
      })
    ) {
      router.push("/")
      return <LoadingPage />
    }
  }

  return (
    <>
      <Head>
        <title>{getTitle(pageProps.title)}</title>
      </Head>
      <Box mt="54px">
        <Header />
        <Box minH="calc(100vh - 54px)">{children}</Box>
        <Footer />
        <BackToTop />
      </Box>
    </>
  )
}
