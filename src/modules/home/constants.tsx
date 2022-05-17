import { ILinkItem } from "interfaces/ILinkItem"
import { ReactNode } from "react"
import { AiOutlineGift } from "react-icons/ai"
import { BsHeadset } from "react-icons/bs"
import { GrDeliver } from "react-icons/gr"
import { MdLoop } from "react-icons/md"
import { generateFallbackImage } from "utils/generateFallbackImage"

interface HeaderNavItem extends ILinkItem {
  childs?: HeaderNavItem[]
}
interface ExploreItem extends ILinkItem {
  src: string
}
interface CommitItem {
  icon: ReactNode
  title: string
  content: string
}

export const headerNavItems: HeaderNavItem[] = [
  {
    name: "TRANG CHỦ",
    href: "/",
  },
  {
    name: "SẢN PHẨM",
    href: "/products",
  },
  {
    name: "ÁO",
    href: "/products?gender=male",
    childs: [
      {
        name: "ÁO 1ÁO 1ÁO 1ÁO 1ÁO 1",
        href: "#",
      },
      {
        name: "ÁO 2",
        href: "#",
      },
    ],
  },
  {
    name: "QUẦN",
    href: "/products?gender=female",
    childs: [
      {
        name: "QUẦN 1",
        href: "#",
      },
      {
        name: "QUẦN 2",
        href: "#",
      },
    ],
  },
  {
    name: "PHỤ KIỆN",
    href: "/products?type=accessory",
  },
  {
    name: "SET ĐỒ",
    href: "/products?type=set",
  },
  {
    name: "LIÊN HỆ",
    href: "/contact",
  },
]

export const exploreItems: ExploreItem[] = [
  {
    name: "Áo",
    href: "#",
    src: generateFallbackImage(500),
  },
  {
    name: "Quần",
    href: "#",
    src: generateFallbackImage(500),
  },
  {
    name: "Phụ kiện",
    href: "#",
    src: generateFallbackImage(500),
  },
]
export const commitItems: CommitItem[] = [
  {
    icon: <BsHeadset />,
    title: "Hỗ trợ 24/7",
    content: "Đội ngũ tư vấn viên nhiệt tình, giàu kinh nghiệm",
  },
  {
    icon: <GrDeliver />,
    title: "Giao hàng",
    content: "Thời gian giao hàng nhanh chóng",
  },
  {
    icon: <MdLoop />,
    title: "Đổi trả - hoàn tiền",
    content: "Đổi trả sản phẩm trong 7 ngày kể từ lúc đơn hàng giao tới bạn",
  },
  {
    icon: <AiOutlineGift />,
    title: "Ưu đãi",
    content: "Rất nhiều ưu đãi dành cho khách hàng thân thiết",
  },
]
