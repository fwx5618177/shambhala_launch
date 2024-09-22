/**
 * 格式化 USDT 数值，保留指定的小数位数
 * @param value 输入值
 * @param decimals 小数位数，默认为 2
 * @returns 格式化后的字符串
 */
export function formatUsdt(
  value: number | string,
  decimals: number = 2
): string {
  let strValue = typeof value === "string" ? value : value.toString();
  const decimalIndex = strValue.indexOf(".");

  if (decimalIndex !== -1) {
    strValue =
      strValue.substring(0, decimalIndex) +
      "." +
      strValue.substring(decimalIndex + 1, decimalIndex + decimals + 1);
    return parseFloat(strValue) === 0 ? "0" : strValue;
  }

  return strValue;
}
