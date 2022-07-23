import { AxiosResponse } from "axios"
import { ErrorMessage } from "configs/constants"
import { API } from "configs/services"
import { IResponse } from "interfaces"
import { useEffect, useMemo, useState } from "react"
import { Accept, FileRejection, useDropzone } from "react-dropzone"
import { useMutation } from "react-query"
import { toast } from "react-toastify"

interface UseUploadProps<T> {
  url: string
  accept: Accept
  maxSize: number
  multiple?: boolean
  onSuccess?(data: AxiosResponse<IResponse<T>, any>): void
}

export function useUpload<T = unknown>({
  url,
  accept,
  maxSize,
  multiple,
  onSuccess,
}: UseUploadProps<T>) {
  const { mutate, isLoading } = useMutation("upload", (data: any) =>
    API.post<IResponse<T>>(url, data)
  )
  const [queue, setQueue] = useState<File[]>([])

  const queueFn = useMemo(
    () => ({
      push: (files: File[]) => setQueue((queue) => [...queue, ...files]),
      shift: () =>
        setQueue((queue) => {
          queue.shift()
          return queue
        }),
    }),
    []
  )
  const mutateUpload = (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    mutate(formData, {
      onSuccess,
    })
  }
  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length)
      fileRejections.forEach((file) =>
        file.errors.forEach((err) => {
          if (err.code === "file-invalid-type")
            toast.error(ErrorMessage.FILE_INVALID_TYPE)
          if (err.code === "file-too-large")
            toast.error(ErrorMessage.FILE_TOO_LARGE + ` (>${maxSize}MB)`)
        })
      )
    if (acceptedFiles.length) {
      const [firstFile, ...restFiles] = acceptedFiles
      if (isLoading || queue.length) return queueFn.push(acceptedFiles)
      queueFn.push(restFiles)
      mutateUpload(firstFile)
    }
  }
  const { getRootProps } = useDropzone({
    onDrop,
    accept,
    maxSize: maxSize * 1024 * 1024,
    multiple,
  })

  useEffect(() => {
    if (!isLoading && queue.length) {
      mutateUpload(queue[0])
      queueFn.shift()
    }
  }, [isLoading])

  return {
    getRootProps,
    isLoading,
    queue,
  }
}
