/**
 * 格式化时间戳，返回 'YYYY-MM-DD HH:mm:ss' 格式
 * @param timestamp 时间戳
 * @returns 格式化后的时间字符串
 */
export function formatTime(timestamp: number | string): string {
  const date = new Date(Number(timestamp));
  const pad = (num: number) => num.toString().padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
}
