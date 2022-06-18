import axios, { AxiosRequestConfig } from "axios"
import Cookies from "js-cookie"
import { Key } from "./constants"

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// API.interceptors.response.use((response: AxiosResponse) => {
//   return response.data
// })
API.interceptors.request.use((config: AxiosRequestConfig) => {
  const accessToken = Cookies.get(Key.ACCESS_TOKEN)

  if (accessToken && config.headers) {
    config.headers["Authorization"] = `Bearer ${accessToken}`
  }

  return config
})

export const LocationAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCATION_API_URL,
})
