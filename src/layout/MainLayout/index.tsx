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
import { BackToTop } from "./components/BackToTop"
import { CustomerFooter, CustomerHeader } from "./components/customer"

export interface PageProps {
  title: string
  roles: UserRole[]
  isDashboard?: boolean
}

interface MainLayoutProps {
  children: ReactNode
  pageProps: PageProps
}

export function MainLayout({
  children,
  pageProps: { isDashboard, roles, title },
}: MainLayoutProps) {
  const router = useRouter()
  const { status, profile, fetchProfile } = useAuth()

  useEffect(() => {
    if (status === AuthStatus.LOADING) fetchProfile()
  }, [])

  if (roles?.length) {
    if (status === AuthStatus.LOADING) return <LoadingPage />
    if (
      !canAccess({
        userRole: profile?.role,
        pageRoles: roles,
      })
    ) {
      router.push("/")
      return <LoadingPage />
    }
  }

  return (
    <>
      <Head>
        <title>{getTitle(title)}</title>
      </Head>

      {isDashboard ? (
        children
      ) : (
        <Box mt="54px">
          <CustomerHeader />
          <Box pos="relative" minH="calc(100vh - 54px)">
            {children}
          </Box>
          <CustomerFooter />
        </Box>
      )}
      <BackToTop />
    </>
  )
}
