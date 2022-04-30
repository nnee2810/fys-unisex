export interface IPagination {
  page?: number
  limit?: number
}
export interface IPaginationResponse<T> extends IPagination {
  data?: T
  total?: number
}
