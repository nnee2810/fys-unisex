import { Box } from "@chakra-ui/react"
import { LoadingPage } from "components"
import { canAccess } from "helpers"
import { useAuth } from "modules/auth/hooks"
import { UserRole } from "modules/users/interfaces"
import Head from "next/head"
import { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"
import { AuthStatus } from "store/reducers/auth"
import { getTitle } from "utils"
import BackToTop from "./components/BackToTop"
import Footer from "./components/Footer"
import Header from "./components/Header"

export interface PageProps {
  title: string
  roles: UserRole[]
}

interface MainLayoutProps {
  children: ReactNode
  pageProps: PageProps
}

export default function MainLayout({ children, pageProps }: MainLayoutProps) {
  const router = useRouter()
  const { status, profile, fetchProfile } = useAuth()

  useEffect(() => {
    if (status === AuthStatus.LOADING) fetchProfile()
  }, [])
  useEffect(() => {
    if (!pageProps?.roles?.length) return
  }, [status])

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
