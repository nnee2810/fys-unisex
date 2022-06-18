import styled from "@emotion/styled"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import ReactPaginate, { ReactPaginateProps } from "react-paginate"
import { Color } from "styles/theme"

interface PaginationProps extends ReactPaginateProps {}

export function NextPagination({ forcePage, ...props }: PaginationProps) {
  return (
    <Container>
      <ReactPaginate
        {...props}
        forcePage={forcePage || 0}
        pageRangeDisplayed={5}
        breakLabel="..."
        nextLabel={<BiChevronRight fontSize="24" />}
        previousLabel={<BiChevronLeft fontSize="24" />}
      />
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;

  ul {
    list-style-type: none;
    display: flex;
    align-items: center;
  }
  li {
    display: block;
    margin: 0 3px;

    &:not(.previous, .next) > a {
      padding: 8px 12px;
      background-color: ${Color.LIGHT_GRAY};
      font-weight: 500;
      border-radius: 6px;
      transition: all 0.2s;

      &:hover {
        background-color: ${Color.PRIMARY};
        color: #fff;
      }
    }
    &.selected > a {
      background-color: ${Color.PRIMARY};
      color: #fff;
    }
  }
`
