import { ChakraProvider } from "@chakra-ui/react"
import { AxiosError } from "axios"
import { ErrorMessage, toastConfig } from "configs/constants"
import { MainLayout } from "layout"
import type { AppProps } from "next/app"
import "rc-rate/assets/index.css"
import { QueryClient, QueryClientProvider } from "react-query"
import { Provider as ReduxProvider } from "react-redux"
import { toast, ToastContainer } from "react-toastify"
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
      onError(error) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || ErrorMessage.INTERNAL_SERVER_ERROR
          )
        } else toast.error(ErrorMessage.INTERNAL_SERVER_ERROR)
      },
    },
    mutations: {
      onError(error) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || ErrorMessage.INTERNAL_SERVER_ERROR
          )
        } else toast.error(ErrorMessage.INTERNAL_SERVER_ERROR)
      },
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
