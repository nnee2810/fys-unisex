import { ReactNode } from "react"

export interface IModalProps {
  isOpen: boolean
  children?: ReactNode
  title?: string
  size?: string
  closeText?: string
  confirmText?: string
  onClose: () => void
  onConfirm?: () => void
}
