export default function numberFormat(number) {
  if (parseInt(number, 0)) {
    return new Intl.NumberFormat().format(number);
  }
  return 0;
}
