import { limitPerPage } from "configs/constants"
import API from "configs/service"
import { IPaginationResponse } from "interfaces/IPagination"
import { IProduct } from "interfaces/IProduct"
import { GetProductsDto } from "../dto/get-products-dto"

export async function getProducts({
  page = 1,
  limit = limitPerPage,
  ...params
}: GetProductsDto): Promise<IPaginationResponse<IProduct[]>> {
  return await (
    await API.get("/products", {
      params: {
        page,
        limit,
        ...params,
      },
    })
  ).data
}
