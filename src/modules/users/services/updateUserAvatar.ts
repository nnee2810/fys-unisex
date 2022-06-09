import API from "configs/service"

export async function updateUserAvatar(data: FormData) {
  return (await API.patch<string>("/users/avatar", data)).data
}
