export interface IPaginationResponse<T> {
  data: T
  total: number
  page: number
  take: number
}
