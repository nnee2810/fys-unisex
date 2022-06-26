import { Box, Grid, Stack, Text } from "@chakra-ui/react"
import { responsiveW } from "configs/constants"
import { commitItems } from "../constants"

export function Commit() {
  return (
    <Box>
      <Grid
        templateColumns={{ sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
        gap="6"
        justifyContent="center"
        w={{ ...responsiveW }}
        mx="auto"
        my="80px"
      >
        {commitItems.map((item, idx) => (
          <Box key={idx}>
            <Stack alignItems="center">
              <Box fontSize="40">{item.icon}</Box>
              <Text
                align="center"
                fontSize="18"
                fontWeight="700"
                textTransform="uppercase"
              >
                {item.label}
              </Text>
              <Text align="center">{item.content}</Text>
            </Stack>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}
