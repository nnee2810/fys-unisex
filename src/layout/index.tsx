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
    <Box mt={{ base: "56px", lg: "53px" }}>
      <Header />
      {children}
      <Footer />
      <BackToTop />
    </Box>
  )
}
