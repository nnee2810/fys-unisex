import { TAKE_PER_PAGE } from "configs/constants"
import { API } from "configs/services"
import { IPagination, IResponse } from "interfaces"
import { IProductEntity } from "interfaces/entities"
import { useQuery } from "react-query"
import { GetProductListDto } from "../dto"

export function useGetProductList(
  { page = 1, take = TAKE_PER_PAGE, ...data }: GetProductListDto,
  options?: any
) {
  return useQuery(
    ["get-product-list", data],
    async () =>
      (
        await API.get<IResponse<IPagination<IProductEntity[]>>>(
          "/product/get-product-list",
          {
            params: { page, take, ...data },
          }
        )
      ).data.data,
    options
  )
}
