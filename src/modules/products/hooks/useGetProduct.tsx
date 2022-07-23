import { API } from "configs/services"
import { IResponse } from "interfaces"
import { IProductEntity } from "interfaces/entities"
import { useQuery } from "react-query"

export function useGetProduct(id: string) {
  return useQuery(
    ["get-product", id],
    async () =>
      (await API.get<IResponse<IProductEntity>>(`/product/get-product/${id}`))
        .data.data
  )
}
