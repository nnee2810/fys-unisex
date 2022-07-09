import {
  Box,
  Center,
  Divider,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"
import { Field, NextLink, StackSkeleton, TextField } from "components"
import { debounce } from "lodash"
import { ProductCard } from "modules/products/components"
import { useGetProductList } from "modules/products/hooks"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { AiOutlineSearch } from "react-icons/ai"
import { Color } from "styles/theme"

interface FormValues {
  name: string
}

interface ModalSearchProductsProps {
  isOpen: boolean
  onClose(): void
}

export function ModalSearchProducts({
  isOpen,
  onClose,
}: ModalSearchProductsProps) {
  const router = useRouter()
  const methods = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
  })
  const [queryName, setQueryName] = useState("")
  const { data, isLoading, refetch } = useGetProductList(
    { name: queryName, take: 10 },
    { enabled: false }
  )

  const handleSubmit = ({ name }: FormValues) => {
    router.push(`products?name=${name}`)
    onClose()
  }
  const handleChangeDebounce = debounce((value: string) => {
    setQueryName(value)
  }, 300)

  useEffect(() => {
    if (queryName) refetch()
  }, [queryName, refetch])

  useEffect(() => {
    onClose()
  }, [router.asPath])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={{ base: "90vw", md: "600px" }}>
        <Box p="2">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <Field
                name="name"
                component={
                  <TextField
                    onChange={(e) => handleChangeDebounce(e.target.value)}
                    placeholder="Tìm kiếm sản phẩm"
                    before={<AiOutlineSearch fontSize="20" />}
                    border="none"
                    focusBorderColor="none"
                  />
                }
              />
            </form>
          </FormProvider>
        </Box>
        {queryName && (
          <Box p="2" pt="0">
            <Divider mb="2" />
            {isLoading ? (
              <StackSkeleton value={5} h="45px" />
            ) : data?.data?.length ? (
              <>
                <Box minH="56px" maxH="324px" overflow="auto">
                  {data.data.map((product) => (
                    <Box
                      p="2"
                      borderRadius="6"
                      _hover={{ backgroundColor: Color.LIGHT_GRAY }}
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
        )}
      </ModalContent>
    </Modal>
  )
}
