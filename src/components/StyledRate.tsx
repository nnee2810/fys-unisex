import Rate from "rc-rate"
import { RateProps } from "rc-rate/lib/Rate"
import styled from "styled-components"

interface StyledRateProps extends RateProps {
  size?: number
}

const StyledRate = styled(Rate)<StyledRateProps>`
  font-size: ${({ size }) => size}px;
  li {
    margin-right: 0;
  }
`

export default StyledRate
