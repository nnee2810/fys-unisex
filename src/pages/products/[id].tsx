import { Box, Grid } from "@chakra-ui/react"
import { responsiveW } from "configs/constants"
import { useGetProduct } from "modules/products/hooks/useGetProduct"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import { generateTitle } from "utils/generateTitle"

export default function Product() {
  const router = useRouter()
  const { id } = router.query
  const { data, isLoading } = useGetProduct(String(id))

  return (
    <>
      <Head>
        <title>{generateTitle(data?.name)}</title>
      </Head>
      <Box w={{ ...responsiveW }} mx="auto" py="40px">
        {isLoading ? <Grid></Grid> : <Grid></Grid>}
      </Box>
    </>
  )
}
