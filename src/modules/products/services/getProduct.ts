import { API } from "configs/service"
import { IProduct, IResponse } from "interfaces"

export async function getProduct(id: string) {
  return (await API.get<IResponse<IProduct>>(`/products/${id}`)).data.data
}
