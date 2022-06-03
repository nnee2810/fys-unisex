import { ImageSource } from "configs/constants"

export function getImageFallback(size: number = 200) {
  return `${ImageSource.DEFAULT}/${size}`
}
