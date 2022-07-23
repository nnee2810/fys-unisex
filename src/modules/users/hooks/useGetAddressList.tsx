import { API } from "configs/services"
import { IResponse } from "interfaces"
import { IAddressEntity } from "interfaces/entities"
import { useQuery } from "react-query"

export function useGetAddressList() {
  return useQuery(
    "get-address-list",
    async () =>
      (await API.get<IResponse<IAddressEntity[]>>("/user/get-address-list"))
        .data.data
  )
}
