import { Box, Heading, Stack } from "@chakra-ui/react"
import { NextRate } from "components"
import { IProductReview } from "modules/products/interfaces"
import { IUserEntity } from "modules/users/interfaces"
import { getImageFallback } from "utils"
import { ProductReview } from "./ProductReview"

const user: IUserEntity = {
  id: "1",
  userName: "blable",
  name: "Đào Nam",
  email: "a@gmail.com",
  image: getImageFallback(100),
  phone: "0123456789",
}

const reviews: IProductReview[] = [
  {
    id: "1",
    content: "vải hơi xấu hơn so với mọi khi, có vết xước nhỏ ở bên hông",
    created_at: new Date().toISOString(),
    rate: 5,
    user,
  },
  {
    id: "2",
    content: "Quần đen không co dãn lắm, ống hơi chật nên khi cởi hơi khó",
    created_at: new Date().toISOString(),
    rate: 3.5,
    user,
  },
  {
    id: "3",
    content:
      "Mình rất lười viết đánh giá sản phầm, nhưng lần này đánh giá vì Coolmate rất tận tâm và cũng mong Coolmate cải thiện. Về chất lượng sản phẩm và dịch vụ thì không có gì phàn nàn cả. Nhưng sản phẩm này bị lỗi size nho nhỏ. Lần đầu mình đặt size 32, mặc vào bị rộng quá. Nên đổi size 31, thế nhưng lại mặc bị chật quá. Nên mình nghĩ thôi thà mặc rộng rồi thắt thắt lưng còn hơn mặc nhỏ bó chật. Thế là mình đổi sang 32 lại, lần này mặc 32 thì lại vừa vặn thoải mái vô cùng. Tóm lại tổng thể thì mình rất hài lòng, nhưng bị mất thời gian để đổi trả, và.. không có quần để đi ra ngoài thôi. Vấn đề của mình, mình nghĩ đến từ khâu sản xuất bên công ty. Nên sản xuất các lô một cách đồng đều hơn, hoặc in ấn đúng size (lần đầu mặc mình nghĩ chắc là size 33 có khi). Chúc Coolmate cải thiện và thành công!",
    created_at: new Date().toISOString(),
    rate: 3.5,
    user,
  },
  {
    id: "4",
    content:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaas",
    created_at: new Date().toISOString(),
    rate: 1,
    user,
  },
]

export function ProductReviews() {
  return (
    <Box id="reviews">
      <Heading size="lg">
        50 đánh giá (5/5{" "}
        <Box as="span">
          <NextRate count={1} value={1} size={28} />
        </Box>
        )
      </Heading>
      <Stack spacing="6" mt="6">
        {reviews.map((item) => (
          <ProductReview data={item} key={item.id} />
        ))}
      </Stack>
    </Box>
  )
}
