import { ChakraProvider } from "@chakra-ui/react"
import { toastConfig } from "configs/constants"
import Layout from "layout"
import type { AppProps } from "next/app"
import Head from "next/head"
import "rc-rate/assets/index.css"
import { QueryClient, QueryClientProvider } from "react-query"
import { Provider as ReduxProvider } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import store from "store"
import "styles/globals.scss"
import theme from "styles/theme"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>DD Store</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <ChakraProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <ToastContainer {...toastConfig} />
          </ChakraProvider>
        </ReduxProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
