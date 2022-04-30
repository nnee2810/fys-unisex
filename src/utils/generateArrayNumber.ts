export default function generateArrayNumber(length: number, start = 0) {
  return Array.from({ length }, (_, idx) => idx + start)
}
