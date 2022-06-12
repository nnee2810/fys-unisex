import { ChakraProvider } from "@chakra-ui/react"
import { toastConfig } from "configs/constants"
import MainLayout from "layout/MainLayout"
import "leaflet-geosearch/dist/geosearch.css"
import "leaflet/dist/leaflet.css"
import type { AppProps } from "next/app"
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

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <ChakraProvider theme={theme}>
          <MainLayout pageProps={pageProps}>
            <Component {...pageProps} />
          </MainLayout>
          <ToastContainer {...toastConfig} />
        </ChakraProvider>
      </ReduxProvider>
    </QueryClientProvider>
  )
}
