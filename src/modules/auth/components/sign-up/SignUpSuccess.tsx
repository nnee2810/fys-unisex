import { Alert, AlertDescription, AlertIcon, Box } from "@chakra-ui/react"
import { NextImage } from "components"
import moment from "moment"
import { useRouter } from "next/router"
import { useTimer } from "react-timer-hook"
import { getAwsCloudFrontUrl } from "utils"

export function SignUpSuccess() {
  const router = useRouter()
  const { seconds } = useTimer({
    expiryTimestamp: moment().add(5, "s").toDate(),
    onExpire: () => router.push("/auth/sign-in"),
  })

  return (
    <Box>
      <Alert status="success" variant="left-accent" borderRadius="6">
        <AlertIcon />
        <AlertDescription>
          Tạo tài khoản thành công, chuyển hướng sau {seconds} giây...
        </AlertDescription>
      </Alert>
      <NextImage
        w="100%"
        h="333px"
        src={getAwsCloudFrontUrl("static/sign-up-success.jpg")}
      />
    </Box>
  )
}
