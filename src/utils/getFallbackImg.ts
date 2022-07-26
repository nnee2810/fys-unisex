import { ImageSrc } from "configs/constants"

export function getFallbackImg(size: number = 200, text: string = "") {
  return `${ImageSrc.DEFAULT}/${size}&text=${text}`
}
