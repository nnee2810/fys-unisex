import { API } from "configs/services"
import { IResponse } from "interfaces"
import { IAddressEntity } from "interfaces/entities"
import { useQuery } from "react-query"

export function useGetAddresses() {
  return useQuery(
    "get-addresses",
    async () =>
      (await API.get<IResponse<IAddressEntity[]>>("/user/get-addresses")).data
        .data
  )
}
