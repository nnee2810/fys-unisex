export interface UploadProductImageDto {
  id: string
  data: FormData
  updateProgress: (percentage: number) => void
}
