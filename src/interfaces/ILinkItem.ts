import { ReactNode } from "react"

export interface ILinkItem {
  name: string
  href: string
}
export interface ILinkItemWithIcon extends ILinkItem {
  icon: ReactNode
}
