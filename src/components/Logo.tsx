import Image from "next/image"
import React from "react"
import { getFallbackImage } from "utils/getFallbackImage"
import CustomLink from "./CustomLink"

export default function Logo() {
  return (
    <CustomLink href="/">
      <Image src={getFallbackImage(40)} width="40" height="40" />
    </CustomLink>
  )
}
