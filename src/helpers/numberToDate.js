export default function numberToDate(number) {

  let year = String(number).substr(0, 4)
  let month = String(number).substr(4, 2)
  let day = String(number).substr(6, 2)

  return `${day}/${month}/${year}`
}
