import { ErrorMessage } from "configs/constants"
import { useAppDispatch } from "hooks"
import { FileRejection, useDropzone } from "react-dropzone"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { SET_AVATAR } from "store/reducers/auth"
import { updateAvatar } from "../services"

export function useUploadAvatar() {
  const dispatch = useAppDispatch()
  const { mutate, isLoading } = useMutation("update-avatar", updateAvatar, {
    onSuccess(data) {
      toast.success("Cập nhật ảnh đại điện thành công")
      dispatch(SET_AVATAR(data))
    },
  })

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length) {
      fileRejections[0].errors.forEach((err) => {
        if (err.code === "file-invalid-type")
          toast.error(ErrorMessage.FILE_INVALID_TYPE)
        if (err.code === "file-too-large")
          toast.error(ErrorMessage.FILE_TOO_LARGE + " (>1MB)")
      })
    }
    if (acceptedFiles.length) {
      const formData = new FormData()
      formData.append("file", acceptedFiles[0])
      mutate(formData)
    }
  }
  const { getRootProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpg": [],
      "image/jpeg": [],
      "image/png": [],
    },
    multiple: false,
    maxSize: 1024 * 1024,
  })

  return {
    isLoading,
    getRootProps,
  }
}
