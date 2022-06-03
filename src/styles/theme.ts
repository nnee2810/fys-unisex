import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react"

export enum Color {
  PRIMARY = "#000000",
  LIGHT_GRAY = "#ebebeb",
  GRAY = "#d9d9d9",
  DARK_GRAY = "#b3b3b3",
  GREEN = "#38A169",
  RED = "#ff3102",
}

export default extendTheme(
  {
    colors: {
      primary: {
        500: Color.PRIMARY + "cc",
        600: Color.PRIMARY,
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "primary" })
)
