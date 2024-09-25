import numeral from "numeral";

/**
 * 判断输入的值是否为0
 * @param {string | number} inputValue - 输入的值
 * @returns {boolean} - 如果值为0则返回 true，否则返回 false
 */
export const isZero = (inputValue: string | number): boolean => {
  const value = numeral(inputValue).value(); // 获取实际的数值
  return value === 0;
};
