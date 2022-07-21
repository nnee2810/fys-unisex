import { Box, Grid } from "@chakra-ui/react"
import { LoadingPage } from "components"
import { canAccess } from "helpers"
import { UserRole } from "interfaces/entities"
import { useAuth } from "modules/auth/hooks"
import Head from "next/head"
import { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"
import { AuthStatus } from "store/reducers/auth"
import { getTitle } from "utils"
import { BackToTop } from "./components/BackToTop"
import {
  Footer as CustomerFooter,
  Header as CustomerHeader,
} from "./components/customer"
import {
  Header as DashboardHeader,
  Sidebar as DashboardSidebar,
} from "./components/dashboard"

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
        <title>{getTitle(title, isDashboard)}</title>
      </Head>

      {isDashboard ? (
        <Grid h="100vh" templateColumns="300px auto">
          <DashboardSidebar />
          <Box>
            <DashboardHeader title={title} />
            <Box h="calc(100vh - 59.5px)" px="8" overflow="auto">
              {children}
            </Box>
          </Box>
        </Grid>
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
