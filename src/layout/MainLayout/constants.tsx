import { ILink, ILinkWithIcon } from "interfaces"
import {
  AiOutlineAppstore,
  AiOutlineFileText,
  AiOutlineSetting,
  AiOutlineSkin,
  AiOutlineUser,
} from "react-icons/ai"
import { BsFacebook, BsInstagram } from "react-icons/bs"
import { IoLogoTiktok } from "react-icons/io5"

export const exploreItems: ILink[] = [
  {
    name: "Đồ nam",
    href: "#",
  },
  {
    name: "Đồ nữ",
    href: "#",
  },
  {
    name: "Phụ kiện",
    href: "#",
  },
  {
    name: "Set đồ",
    href: "#",
  },
]
export const serviceItems: ILink[] = [
  {
    name: "Hỏi đáp - FAQs",
    href: "#",
  },
  {
    name: "Chính sách khuyến mãi",
    href: "#",
  },
  {
    name: "Chính sách giao hàng",
    href: "#",
  },
  {
    name: "Chính sách đổi trả",
    href: "#",
  },
]
export const socialItems: ILink[] = [
  {
    name: <BsFacebook />,
    href: "#",
  },
  {
    name: <BsInstagram />,
    href: "#",
  },
  {
    name: <IoLogoTiktok />,
    href: "#",
  },
]
export const dashboardSidebarItems: ILinkWithIcon[] = [
  {
    name: "Tổng quan",
    href: "/dashboard/overview",
    icon: <AiOutlineAppstore fontSize="20" />,
  },
  {
    name: "Đơn hàng",
    href: "/dashboard/orders",
    icon: <AiOutlineFileText fontSize="20" />,
  },
  {
    name: "Sản phẩm",
    href: "/dashboard/products",
    icon: <AiOutlineSkin fontSize="20" />,
  },
  {
    name: "Người dùng",
    href: "/dashboard/users",
    icon: <AiOutlineUser fontSize="20" />,
  },
  {
    name: "Cài đặt",
    href: "/dashboard/settings",
    icon: <AiOutlineSetting fontSize="20" />,
  },
]
