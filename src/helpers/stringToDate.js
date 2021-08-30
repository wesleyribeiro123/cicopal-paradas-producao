export default function strDate(date) {

  let day = date.substring(0, 2)
  let month = date.substring(3, 5)
  let year = date.substring(6, 10)

  return year + month + day;
}
