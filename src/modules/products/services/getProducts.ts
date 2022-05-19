import { LIMIT_PER_PAGE } from "configs/constants"
import API from "configs/service"
import { IPaginationResponse } from "interfaces/IPaginationResponse"
import { IProduct } from "interfaces/IProduct"
import { GetProductsDto } from "../dto/get-products-dto"

export async function getProducts({
  page = 0,
  limit = LIMIT_PER_PAGE,
  ...params
}: GetProductsDto) {
  return (
    await API.get<IPaginationResponse<IProduct[]>>("/products", {
      params: {
        page,
        limit,
        ...params,
      },
    })
  ).data
}
