import numeral from "numeral";

/**
 * Convert an input value to the smallest unit based on token decimals.
 *
 * @param {string | number} inputValue - The value to be converted (e.g., 1 USDT, 0.5 SOL).
 * @param {number} decimals - The number of decimals of the token (e.g., 18 for BSC tokens).
 * @returns {number} - The converted value in the smallest unit.
 */
export const toSmallestUnit = (
  inputValue: number | string,
  decimals: number = 18
): number => {
  if (!inputValue) return 0;

  return numeral(inputValue).multiply(Math.pow(10, decimals)).value() || 0;
};
