import { useMutation } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { API } from "configs/api"
import { getAxiosMessageError } from "helpers"
import { ImageType } from "modules/images/interfaces"
import { useEffect, useMemo, useState } from "react"
import { Accept, FileRejection, useDropzone } from "react-dropzone"
import toast from "react-hot-toast"

interface UseUploadProps<T> {
  url: string
  accept: Accept
  maxSize: number
  type?: ImageType
  multiple?: boolean
  onSuccess?(data: AxiosResponse<T, any>): string
}

export default function useUpload<T = unknown>({
  url,
  accept,
  maxSize,
  type,
  multiple,
  onSuccess,
}: UseUploadProps<T>) {
  const { mutateAsync, isLoading } = useMutation((data: FormData) =>
    API.post<T>(url, data)
  )
  const [queue, setQueue] = useState<File[]>([])

  const queueFn = useMemo(
    () => ({
      push: (files: File[]) =>
        setQueue((currentQueue) => [...currentQueue, ...files]),
      shift: () =>
        setQueue((currentQueue) => {
          currentQueue.shift()
          return currentQueue
        }),
    }),
    []
  )
  const mutateUpload = (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    if (type) formData.append("type", type)
    toast.promise(mutateAsync(formData), {
      loading:
        "Uploading a file... " +
        (queue.length > 1 ? `(${queue.length - 1} in queue)` : ""),
      success: onSuccess || "Uploaded file successfully",
      error: getAxiosMessageError,
    })
  }
  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length)
      fileRejections.forEach((file) =>
        file.errors.forEach((err) => {
          if (err.code === "file-invalid-type") toast.error("Invalid file type")
          if (err.code === "file-too-large")
            toast.error(`File too large (>${maxSize}MB)`)
        })
      )
    if (acceptedFiles.length) queueFn.push(acceptedFiles)
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
  }, [isLoading, queue])

  return {
    getRootProps,
    isLoading,
    queue,
  }
}
