import styled from "@emotion/styled"
import React from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import ReactPaginate, { ReactPaginateProps } from "react-paginate"
import { colors } from "styles/theme"

interface PaginationProps extends ReactPaginateProps {}

export default function Pagination({
  forcePage,
  onPageChange,
  pageCount,
}: PaginationProps) {
  return (
    <Container>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<BiChevronRight fontSize="24" />}
        forcePage={forcePage || 0}
        onPageChange={onPageChange}
        pageRangeDisplayed={5}
        pageCount={pageCount}
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
      background-color: ${colors.lightGray};
      font-weight: 500;
      border-radius: 6px;
      transition: all 0.2s;

      &:hover {
        background-color: ${colors.primary};
        color: #fff;
      }
    }
    &.selected > a {
      background-color: ${colors.primary};
      color: #fff;
    }
  }
`
