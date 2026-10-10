export function toBanglaNumber(value: number | string): string {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  return String(value)
    .replace(/\d/g, (digit) => bengaliDigits[Number(digit)])
    .replace(/,/g, ",");
}

export function formatPrice(value: number): string {
  return `${new Intl.NumberFormat("en-IN").format(
    Math.round(value)
  )
    .split("")
    .map((char) => {
      if (/\d/.test(char)) {
        return toBanglaNumber(char);
      }

      return char;
    })
    .join("")} টাকা`;
}

export function formatPercent(value: number): string {
  const absolute = Math.abs(value).toFixed(1);

  return toBanglaNumber(absolute);
}