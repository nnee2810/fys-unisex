import {
  Box,
  Center,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react"
import CustomLink from "components/CustomLink"
import Field from "components/Field"
import TextField from "components/Field/TextField"
import { responsiveW } from "configs/constants"
import { IModalProps } from "interfaces/IModalProps"
import { useGetProducts } from "modules/products/hooks/useGetProducts"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { AiOutlineSearch } from "react-icons/ai"
import { colors } from "styles/theme"
import { formatCurrency } from "utils/formatCurrency"
import generateArrayNumber from "utils/generateArrayNumber"
import { getFallbackImage } from "utils/getFallbackImage"

interface FormValues {
  name: string
}

export default function ModalSearch({ isOpen, onClose }: IModalProps) {
  const router = useRouter()
  const methods = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
  })
  const watchName = methods.watch("name")
  const { data, isLoading, refetch } = useGetProducts(
    { name: watchName, limit: 10 },
    { enabled: false }
  )

  const handleSubmit = ({ name }: FormValues) => {
    router.push(`products?name=${name}`)
    onClose()
  }

  useEffect(() => {
    if (watchName) refetch()
  }, [watchName, refetch])
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(1px)" />
      <ModalContent minW={{ ...responsiveW }}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <Field
              name="name"
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Tìm kiếm sản phẩm"
                  icon={{ before: <AiOutlineSearch fontSize="20" /> }}
                  borderWidth="0 0 1px 0"
                  focusBorderColor="none"
                />
              )}
            />
          </form>
        </FormProvider>
        {watchName &&
          (isLoading ? (
            <Stack p="2">
              {generateArrayNumber(5).map((item) => (
                <Skeleton h="45px" borderRadius="6" key={item} />
              ))}
            </Stack>
          ) : (
            <Box minH="56px" maxH="280px" overflow="auto">
              {data?.data?.length ? (
                data?.data?.map((product, idx) => (
                  <CustomLink href={`/products/${product.id}`} key={product.id}>
                    <HStack
                      p="2"
                      borderTop={
                        !!idx ? `1px solid ${colors.lightGray}` : "none"
                      }
                      cursor="pointer"
                      _hover={{ bg: colors.lightGray }}
                      onClick={onClose}
                      key={product.id}
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
                              <Text
                                color={colors.gray}
                                textDecor="line-through"
                              >
                                {formatCurrency(product.price)}
                              </Text>
                              <Text color={colors.red}>
                                -
                                {Math.round(
                                  100 -
                                    (product.salePrice / product.price) * 100
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
                  Không tìm thấy sản phẩm nào
                </Center>
              )}
            </Box>
          ))}
      </ModalContent>
    </Modal>
  )
}
