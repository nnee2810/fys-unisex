import { TAKE_PER_PAGE } from "configs/constants"
import { API } from "configs/services"
import { IPagination, IResponse } from "interfaces"
import { GetProductsDto } from "../dto/get-products-dto"
import { IProductEntity } from "../interfaces"

export async function getProducts({
  page = 1,
  take = TAKE_PER_PAGE,
  ...data
}: GetProductsDto) {
  return (
    await API.get<IResponse<IPagination<IProductEntity[]>>>(
      "product/get-product-list",
      {
        params: { page, take, ...data },
      }
    )
  ).data.data
}
