import { ILink } from "interfaces"
import { ReactNode } from "react"
import { AiOutlineGift } from "react-icons/ai"
import { BsHeadset } from "react-icons/bs"
import { GrDeliver } from "react-icons/gr"
import { MdLoop } from "react-icons/md"
import { getFallbackImg } from "utils"

interface NavItem extends ILink {
  childs?: NavItem[]
}
interface ExploreItem extends ILink {
  src: string
}
interface CommitItem {
  icon: ReactNode
  label: string
  content: string
}

export const navItems: NavItem[] = [
  {
    name: "Trang chủ",
    href: "/",
  },
  {
    name: "Sản phẩm",
    href: "/products",
    childs: [
      {
        name: "Đồ nam",
        href: "#",
        childs: [
          {
            name: "Áo T-Shirt",
            href: "#",
          },
          {
            name: "Áo polo",
            href: "#",
          },
          {
            name: "Áo sơ mi",
            href: "#",
          },
          {
            name: "Quần âu",
            href: "#",
          },
        ],
      },
      {
        name: "Đồ nữ",
        href: "#",
        childs: [
          {
            name: "Áo T-Shirt",
            href: "#",
          },
          {
            name: "Áo T-Shirt",
            href: "#",
          },
          {
            name: "Áo T-Shirt",
            href: "#",
          },
          {
            name: "Áo T-Shirt",
            href: "#",
          },
          {
            name: "Áo T-Shirt",
            href: "#",
          },
        ],
      },
      {
        name: "Phụ kiện",
        href: "#",
        childs: [
          {
            name: "Áo T-Shirt",
            href: "#",
          },
          {
            name: "Áo T-Shirt",
            href: "#",
          },
          {
            name: "Áo T-Shirt",
            href: "#",
          },
          {
            name: "Áo T-Shirt",
            href: "#",
          },
          {
            name: "Áo T-Shirt",
            href: "#",
          },
        ],
      },
    ],
  },
  {
    name: "Liên hệ",
    href: "/contact",
  },
]

export const exploreItems: ExploreItem[] = [
  {
    name: "Áo",
    href: "#",
    src: getFallbackImg(500),
  },
  {
    name: "Quần",
    href: "#",
    src: getFallbackImg(500),
  },
  {
    name: "Phụ kiện",
    href: "#",
    src: getFallbackImg(500),
  },
]
export const commitItems: CommitItem[] = [
  {
    icon: <BsHeadset />,
    label: "Hỗ trợ 24/7",
    content: "Đội ngũ tư vấn viên nhiệt tình, giàu kinh nghiệm",
  },
  {
    icon: <GrDeliver />,
    label: "Giao hàng",
    content: "Thời gian giao hàng nhanh chóng",
  },
  {
    icon: <MdLoop />,
    label: "Đổi trả - hoàn tiền",
    content: "Đổi trả sản phẩm trong 7 ngày kể từ lúc đơn hàng giao tới bạn",
  },
  {
    icon: <AiOutlineGift />,
    label: "Ưu đãi",
    content: "Rất nhiều ưu đãi dành cho khách hàng thân thiết",
  },
]
