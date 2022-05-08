import { limitPerPage } from "configs/constants"
import API from "configs/service"
import { IPaginationResponse } from "interfaces/IPaginationResponse"
import { IProduct } from "interfaces/IProduct"
import { GetProductsDto } from "../dto/get-products-dto"

export async function getProducts({
  page = 0,
  limit = limitPerPage,
  ...params
}: GetProductsDto): Promise<IPaginationResponse<IProduct[]>> {
  return (
    await API.get("/products", {
      params: {
        page,
        limit,
        ...params,
      },
    })
  ).data
}
