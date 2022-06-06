import { TAKE_PER_PAGE } from "configs/constants"
import API from "configs/service"
import { IPaginationResponse } from "interfaces/IPaginationResponse"
import { IProduct } from "interfaces/IProduct"
import { GetProductsDto } from "../dto/get-products-dto"

export async function getProducts({
  page = 1,
  take = TAKE_PER_PAGE,
  ...data
}: GetProductsDto) {
  return (
    await API.get<IPaginationResponse<IProduct[]>>("/products", {
      params: { page, take, ...data },
    })
  ).data
}
