import { ImageSource } from "configs/constants"
import qs from "query-string"

export function getAvatarFallback(name: string = "", size: number = 200) {
  const queryString = qs.stringify({ name, size })
  return ImageSource.AVATAR + queryString
}
