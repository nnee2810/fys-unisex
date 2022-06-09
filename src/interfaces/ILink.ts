import { ReactNode } from "react"

export interface ILink {
  name: string
  href: string
}
export interface ILinkWithIcon extends ILink {
  icon: ReactNode
}
