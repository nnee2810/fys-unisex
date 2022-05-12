import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import Cookies from "js-cookie"

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

API.interceptors.response.use((response: AxiosResponse) => {
  return response.data
})
API.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = Cookies.get("token")

  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`
  }

  return config
})

export default API
