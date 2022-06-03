import { LIMIT_PER_PAGE } from "configs/constants"
import API from "configs/service"
import { IPaginationResponse } from "interfaces/IPaginationResponse"
import { IProduct } from "interfaces/IProduct"
import { GetProductsDto } from "../dto/get-products-dto"

export async function getProducts({
  page = 1,
  limit = LIMIT_PER_PAGE,
  ...data
}: GetProductsDto) {
  return (
    await API.post<IPaginationResponse<IProduct[]>>("/products", {
      page,
      limit,
      ...data,
    })
  ).data
}
