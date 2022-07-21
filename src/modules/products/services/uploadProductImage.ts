import { API } from "configs/services"
import { UploadProductImageDto } from "../dto"

export function uploadProductImage({
  id,
  data,
  updateProgress,
}: UploadProductImageDto) {
  return API.post(`/product/upload-product-image/${id}`, data, {
    onUploadProgress(progressEvent) {
      const percentage = Math.round(
        (progressEvent.loaded / progressEvent.total) * 100
      )
      updateProgress(percentage)
    },
  })
}
