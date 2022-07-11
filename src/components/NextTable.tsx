import { Table } from "@chakra-ui/react"
import styled from "styled-components"

export const NextTable = styled(Table)`
  thead {
    position: sticky;
    top: 0;
    background: #edf2f7;
    z-index: 1;
  }
  th {
    text-align: center;
  }
  th:first-child {
    text-align: left;
    border-radius: 6px 0 0 6px;
  }
  th:last-child {
    text-align: right;
    border-radius: 0 6px 6px 0;
  }
  td:not(td:first-child, td:last-child) {
    text-align: center;
  }
  td:last-child {
    text-align: right;
  }
`
