import { TAKE_PER_PAGE } from "configs/constants"
import { API } from "configs/service"
import { IPagination, IProduct, IResponse } from "interfaces"
import { GetProductsDto } from "../dto/get-products-dto"

export async function getProducts({
  page = 1,
  take = TAKE_PER_PAGE,
  ...data
}: GetProductsDto) {
  return (
    await API.get<IResponse<IPagination<IProduct[]>>>("/products", {
      params: { page, take, ...data },
    })
  ).data
}
