export interface IResponse<T> {
  status: number
  message: string
  data: T
}
export interface IPagination<T> {
  data: T
  total: number
  page: number
  take: number
}
