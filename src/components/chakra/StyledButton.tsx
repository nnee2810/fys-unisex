import { Button, ButtonProps } from "@chakra-ui/react"
import React from "react"

export default function StyledButton(props: ButtonProps) {
  return <Button h="40px" fontWeight="500" {...props} />
}
