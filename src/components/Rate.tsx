import R from "rc-rate"
import { RateProps } from "rc-rate/lib/Rate"
import styled from "styled-components"

interface StyledRateProps extends RateProps {
  size?: number
}

export const Rate = styled(R)<StyledRateProps>`
  font-size: ${({ size }) => size || 18}px;
  line-height: 1;
  vertical-align: unset;
  li {
    margin-right: 0;
    line-height: 1;
  }
`
