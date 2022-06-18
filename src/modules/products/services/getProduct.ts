import { API } from "configs/services"
import { IResponse } from "interfaces"
import { IProductEntity } from "../interfaces"

export async function getProduct(id: string) {
  return (await API.get<IResponse<IProductEntity>>(`product/get-product/${id}`))
    .data.data
}
