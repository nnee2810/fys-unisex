import { Box, Grid } from "@chakra-ui/react"
import { responsiveW } from "configs/constants"
import FormSearch from "modules/products/components/FormSearch"
import Head from "next/head"
import { generateTitle } from "utils/generateTitle"

export default function Products() {
  return (
    <>
      <Head>
        <title>{generateTitle("Sản phẩm")}</title>
      </Head>
      <Box py="6">
        <Grid w={{ ...responsiveW }} mx="auto" templateColumns="300px 1fr">
          <FormSearch />
        </Grid>
      </Box>
    </>
  )
}
