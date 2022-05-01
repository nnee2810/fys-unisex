import {
  Box,
  Center,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react"
import CustomLink from "components/CustomLink"
import Field from "components/Field"
import { responsiveW } from "configs/constants"
import { useAppDispatch, useAppSelector } from "hooks/useAppStore"
import { IModalProps } from "interfaces/IModalProps"
import debounce from "lodash.debounce"
import { useGetProducts } from "modules/products/hooks/useGetProducts"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { ChangeEvent, useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { AiOutlineSearch } from "react-icons/ai"
import { setQuery } from "store/reducers/product"
import { colors } from "styles/colors"
import { formatCurrency } from "utils/formatCurrency"
import { getFallbackImage } from "utils/getFallbackImage"

interface FormValues {
  name: string
}

export default function ModalSearch({ isOpen, onClose }: IModalProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { query } = useAppSelector((state) => state.product)
  const methods = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
  })
  const { data, isLoading, refetch } = useGetProducts(
    { name: query.name, limit: 10 },
    { enabled: false }
  )

  const handleSubmit = ({ name }: FormValues) => {
    router.push(`products?name=${name}`)
    onClose()
  }
  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery({ name: e.target.value }))
  }, 200)

  useEffect(() => {
    if (query.name) refetch()
  }, [query.name, refetch])
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(1px)" />
      <ModalContent minW={{ ...responsiveW }}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <Field
              variant="TEXT"
              name="name"
              placeholder="Tìm kiếm sản phẩm ..."
              icon={{
                before: <AiOutlineSearch fontSize="20" />,
              }}
              onChange={handleChange}
            />
          </form>
        </FormProvider>
        {query.name && (
          <Box minH="56px" maxH="280px" overflow="auto">
            {query.name && data?.data?.length ? (
              data?.data?.map((product) => (
                <CustomLink href={`/products/${product._id}`} key={product._id}>
                  <HStack
                    p="2"
                    cursor="pointer"
                    _hover={{ bg: colors.lightGray }}
                    key={product._id}
                    onClick={onClose}
                  >
                    <Box w="40px" h="40px" borderRadius="6" overflow="hidden">
                      <Image
                        src={product.images[0] || getFallbackImage(40)}
                        width="100%"
                        height="100%"
                      />
                    </Box>
                    <Box>
                      <Text fontWeight="700">{product.name}</Text>
                      <HStack fontSize="12" fontWeight="500">
                        {product.isSale ? (
                          <>
                            <Text color={colors.red}>
                              {formatCurrency(product.salePrice)}
                            </Text>
                            <Text color={colors.gray} textDecor="line-through">
                              {formatCurrency(product.price)}
                            </Text>
                            <Text color={colors.red}>
                              -
                              {Math.round(
                                100 - (product.salePrice / product.price) * 100
                              )}
                              %
                            </Text>
                          </>
                        ) : (
                          <Text>{formatCurrency(product.price)}</Text>
                        )}
                      </HStack>
                    </Box>
                  </HStack>
                </CustomLink>
              ))
            ) : (
              <Center h="56px" fontWeight="500">
                {isLoading ? <Spinner /> : "Không tìm thấy sản phẩm nào"}
              </Center>
            )}
          </Box>
        )}
      </ModalContent>
    </Modal>
  )
}
