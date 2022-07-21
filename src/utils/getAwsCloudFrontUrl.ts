export function getAwsCloudFrontUrl(key?: string) {
  if (!key) return ""
  return process.env.NEXT_PUBLIC_AWS_CLOUD_FRONT_URL + key
}
