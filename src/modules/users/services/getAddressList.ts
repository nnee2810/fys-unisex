import { API } from "configs/services"
import { IResponse } from "interfaces"
import { IAddressEntity } from "../interfaces"

export async function getAddressList() {
  return (await API.get<IResponse<IAddressEntity[]>>("/user/get-address-list"))
    .data.data
}
