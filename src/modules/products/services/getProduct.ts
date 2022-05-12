import API from "configs/service"
import { IProduct } from "interfaces/IProduct"

export async function getProduct(id: string) {
  return (await API.get<IProduct>(`/products/${id}`)).data
}
