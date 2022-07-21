import moment from "moment"

export function formatDatetime(time: string) {
  return moment(time).format("HH:mm DD/MM/YYYY")
}
