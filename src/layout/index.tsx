import { Box } from "@chakra-ui/react"
import { RoleType } from "interfaces/IUser"
import useUser from "modules/users/hooks/useUser"
import Head from "next/head"
import React, { ReactNode, useEffect, useState } from "react"
import { getTitle } from "utils/getTitle"
import BackToTop from "./components/BackToTop"
import Footer from "./components/Footer"
import Header from "./components/Header"

export interface PageProps {
  title: string
  protected: boolean
  role?: RoleType[]
}
interface LayoutProps {
  children: ReactNode
  pageProps: PageProps
}

export default function Layout({ children, pageProps }: LayoutProps) {
  const { fetchProfile } = useUser()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!mounted) setMounted(true)
    else fetchProfile()
  }, [mounted])

  return (
    <>
      <Head>
        <title>{getTitle(pageProps.title)}</title>
      </Head>
      <Box mt={{ base: "56px", lg: "53px" }}>
        <Header />
        <Box minH="calc(100vh - 500px)">{children}</Box>
        <Footer />
        <BackToTop />
      </Box>
    </>
  )
}
