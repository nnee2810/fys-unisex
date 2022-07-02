import { TAKE_PER_PAGE } from "configs/constants"
import { API } from "configs/services"
import { IPagination, IResponse } from "interfaces"
import { GetProductListDto } from "../dto"
import { IProductEntity } from "../interfaces"

export async function getProductList({
  page = 1,
  take = TAKE_PER_PAGE,
  ...data
}: GetProductListDto) {
  return (
    await API.get<IResponse<IPagination<IProductEntity[]>>>(
      "/product/get-product-list",
      {
        params: { page, take, ...data },
      }
    )
  ).data.data
}
