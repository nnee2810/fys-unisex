import API from "configs/service"
import { IProduct } from "interfaces/IProduct"

export async function getProduct(id: string): Promise<IProduct> {
  return (await API.get(`/products/${id}`)).data
}
