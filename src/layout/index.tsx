import { Box } from "@chakra-ui/react"
import React, { ReactNode } from "react"
import BackToTop from "./components/BackToTop"
import Footer from "./components/Footer"
import Header from "./components/Header"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Box mt={{ base: "56px", lg: "53px" }}>
        <Header />
        <Box minH={{ base: "calc(100vh - 56px)", lg: "calc(100vh - 53px)" }}>
          {children}
        </Box>
        <Footer />
        <BackToTop />
      </Box>
    </>
  )
}
