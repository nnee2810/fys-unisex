import {
  Box,
  Center,
  Divider,
  Modal,
  ModalContent,
  ModalOverlay,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react"
import Field from "components/Field"
import TextField from "components/Field/TextField"
import NextLink from "components/NextLink"
import { IModalProps } from "interfaces/IModalProps"
import debounce from "lodash.debounce"
import ProductCard from "modules/products/components/ProductCard"
import { useGetProducts } from "modules/products/hooks/useGetProducts"
import { useRouter } from "next/router"
import React, { useCallback, useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { AiOutlineSearch } from "react-icons/ai"
import { colors } from "styles/theme"
import generateArrayNumber from "utils/getArrayNumber"

interface FormValues {
  name: string
}

export default function ModalSearchProducts({ isOpen, onClose }: IModalProps) {
  const router = useRouter()
  const methods = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
  })
  const [queryName, setQueryName] = useState("")
  const { data, isLoading, refetch } = useGetProducts(
    { name: queryName, limit: 10 },
    { enabled: false }
  )

  const handleSubmit = ({ name }: FormValues) => {
    router.push(`products?name=${name}`)
    onClose()
  }
  const handleChangeDebounce = useCallback(
    debounce((value: string) => {
      setQueryName(value)
    }, 200),
    []
  )

  useEffect(() => {
    if (queryName) refetch()
  }, [queryName, refetch])
  useEffect(() => {
    onClose()
  }, [router.asPath])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(1px)" />
      <ModalContent minW={{ base: "90vw", md: "600px" }}>
        <Box p="2">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <Field
                name="name"
                component={
                  <TextField
                    onChange={(e) => {
                      handleChangeDebounce(e.target.value)
                    }}
                    placeholder="Tìm kiếm sản phẩm"
                    icon={{ before: <AiOutlineSearch fontSize="20" /> }}
                    border="none"
                    focusBorderColor="none"
                  />
                }
              />
            </form>
          </FormProvider>
        </Box>
        {queryName && (
          <>
            <Divider />
            <Box p="2">
              {isLoading ? (
                <Stack>
                  {generateArrayNumber(5).map((item) => (
                    <Skeleton h="45px" borderRadius="6" key={item} />
                  ))}
                </Stack>
              ) : data?.data?.length ? (
                <>
                  <Box minH="56px" maxH="324px" overflow="auto">
                    {data.data.map((product) => (
                      <Box
                        p="2"
                        borderRadius="6"
                        _hover={{ backgroundColor: colors.lightGray }}
                        key={product.id}
                      >
                        <ProductCard data={product} layout="horizontal" />
                      </Box>
                    ))}
                  </Box>
                  {data.total > 10 && (
                    <>
                      <Divider my="2" />
                      <Center py="2">
                        <NextLink href={`products?name=${queryName}`}>
                          <Text textDecoration="underline">
                            Xem thêm {data.total - 10} sản phẩm khác
                          </Text>
                        </NextLink>
                      </Center>
                    </>
                  )}
                </>
              ) : (
                <Center h="56px" fontWeight="500">
                  Không tìm thấy sản phẩm nào
                </Center>
              )}
            </Box>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
