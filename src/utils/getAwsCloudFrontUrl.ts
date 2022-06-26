export function getAwsCloudFrontUrl(key: string) {
  return process.env.NEXT_PUBLIC_AWS_CLOUD_FRONT_URL + key
}
