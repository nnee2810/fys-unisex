import { ErrorMessage } from "configs/constants"
import { uploadProductImage } from "modules/products/services"
import { useEffect, useMemo, useState } from "react"
import { FileRejection, useDropzone } from "react-dropzone"
import { useMutation, useQueryClient } from "react-query"
import { toast } from "react-toastify"

export function useUploadProductImage(id?: string) {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(
    "upload-product-image",
    uploadProductImage
  )
  const [progress, setProgress] = useState(0)
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
    if (!id) return
    const formData = new FormData()
    formData.append("file", file)
    mutate(
      {
        id,
        data: formData,
        updateProgress: setProgress,
      },
      {
        onSuccess() {
          toast.success("Thêm hình ảnh thành công")
          queryClient.invalidateQueries("get-product-list")
        },
        onSettled() {
          setProgress(0)
        },
      }
    )
  }
  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (!id) return
    if (fileRejections.length)
      fileRejections.forEach((file) =>
        file.errors.forEach((err) => {
          if (err.code === "file-invalid-type")
            toast.error(ErrorMessage.FILE_INVALID_TYPE)
          if (err.code === "file-too-large")
            toast.error(ErrorMessage.FILE_TOO_LARGE + " (>5MB)")
        })
      )
    if (acceptedFiles.length) {
      const [firstFile, ...restFiles] = acceptedFiles
      if (progress || queue.length) return queueFn.push(acceptedFiles)
      else queueFn.push(restFiles)
      mutateUpload(firstFile)
    }
  }
  const { getRootProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpg": [],
      "image/jpeg": [],
      "image/png": [],
    },
    multiple: true,
    maxSize: 5 * 1024 * 1024,
  })

  useEffect(() => {
    if (!progress && queue.length) {
      mutateUpload(queue[0])
      queueFn.shift()
    }
  }, [progress])

  return {
    getRootProps,
    isLoading,
    progress,
    queue,
  }
}
