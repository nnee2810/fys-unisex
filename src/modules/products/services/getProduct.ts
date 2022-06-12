import API from "configs/service"
import { IProduct } from "interfaces"

export async function getProduct(id: string) {
  return (await API.get<IProduct>(`/products/${id}`)).data
}
