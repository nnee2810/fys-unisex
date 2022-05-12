import { ReactNode } from "react"

export interface IModalProps {
  isOpen: boolean
  children?: ReactNode
  title?: string
  closeText?: string
  confirmText?: string
  onClose: () => void
  onConfirm?: () => void
}
