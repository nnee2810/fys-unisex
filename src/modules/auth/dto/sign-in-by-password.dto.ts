export interface SignInByPasswordDto {
  email?: string
  phone?: string
  password: string
}
export interface SignInByPasswordResponseDto {
  accessToken: string
}
