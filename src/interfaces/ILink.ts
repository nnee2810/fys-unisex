import { ReactNode } from "react"

export interface ILink {
  name: string | ReactNode
  href: string
}
export interface ILinkWithIcon extends ILink {
  icon: ReactNode
}
