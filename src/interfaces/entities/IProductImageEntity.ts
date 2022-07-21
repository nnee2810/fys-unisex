import { IFileUploadEntity } from "."

export interface IProductImageEntity extends IFileUploadEntity {
  order: number
}
