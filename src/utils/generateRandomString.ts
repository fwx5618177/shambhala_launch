/**
 * 生成指定长度的随机字符串
 * @param length 随机字符串长度
 * @returns 生成的随机字符串
 */
export function generateRandomString(length: number): string {
  if (length <= 0) return "";

  // ASCII 范围：数字 (48-57), 大写字母 (65-90), 小写字母 (97-122)
  const getRandomChar = () => {
    const random = Math.floor(Math.random() * 62);

    if (random < 10) {
      // 0-9
      return String.fromCharCode(48 + random);
    } else if (random < 36) {
      // A-Z
      return String.fromCharCode(65 + random - 10);
    } else {
      // a-z
      return String.fromCharCode(97 + random - 36);
    }
  };

  // 使用 Array.from 创建指定长度的数组并填充随机字符
  return Array.from({ length }, getRandomChar).join("");
}
