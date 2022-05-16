import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react"

export const colors = {
  primary: "#000000",
  lightGray: "#ebebeb",
  gray: "#c4c4c4",
  green: "#38A169",
  red: "#ff3102",
}

export default extendTheme(
  {
    colors: {
      primary: {
        500: colors.primary + "cc",
        600: colors.primary,
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "primary" })
)
