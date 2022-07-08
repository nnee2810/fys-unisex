import { ErrorMessage, SuccessMessage } from "configs/constants"
import { useAppDispatch } from "hooks"
import { FileRejection, useDropzone } from "react-dropzone"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { SET_PROFILE_AVATAR_SRC } from "store/reducers/auth"
import { updateAvatar } from "../services"

export function useFormUpdateAvatar() {
  const dispatch = useAppDispatch()

  const { mutate, isLoading } = useMutation("update-avatar", updateAvatar, {
    onSuccess(data) {
      toast.success(SuccessMessage.UPDATE_AVATAR_SUCCESS)
      dispatch(SET_PROFILE_AVATAR_SRC(data))
    },
  })

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length) {
      fileRejections[0].errors.forEach((err) => {
        if (err.code === "file-invalid-type")
          toast.error(ErrorMessage.FILE_INVALID_TYPE + " (.jpg, .jpeg, .png)")
        if (err.code === "file-too-large")
          toast.error(ErrorMessage.FILE_TOO_LARGE + " (<1MB)")
      })
    }
    if (acceptedFiles.length) {
      const formData = new FormData()
      formData.append("file", acceptedFiles[0])
      mutate(formData)
    }
  }
  const { getRootProps, getInputProps } = useDropzone({
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
    getInputProps,
  }
}
