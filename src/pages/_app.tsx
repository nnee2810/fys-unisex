import { ChakraProvider } from "@chakra-ui/react"
import Layout from "layout"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
import { Provider as ReduxProvider } from "react-redux"
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
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </ReduxProvider>
    </QueryClientProvider>
  )
}

export default MyApp
