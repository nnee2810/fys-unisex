import { TAKE_PER_PAGE } from "configs/constants"
import { API } from "configs/services"
import { IPagination, IResponse } from "interfaces"
import { IProductEntity } from "interfaces/entities"
import { useQuery } from "react-query"
import { GetProductsDto } from "../dto"

export function useGetProducts(
  { page = 1, take = TAKE_PER_PAGE, ...data }: GetProductsDto,
  options?: any
) {
  return useQuery(
    ["get-products", data],
    async () =>
      (
        await API.get<IResponse<IPagination<IProductEntity[]>>>(
          "/product/get-products",
          {
            params: { page, take, ...data },
          }
        )
      ).data.data,
    { ...options, refetchInterval: 5000 }
  )
}
