/**
 * 计算指定日期距离当前日期的剩余天数
 * @param time 目标日期
 * @returns 剩余天数或已过期
 */
export function getExpireData(time: number | string): string {
  const targetDate = new Date(Number(time));
  const currentDate = new Date();
  const daysRemaining = Math.ceil(
    (targetDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return daysRemaining < 0 ? "expired" : `${daysRemaining} days`;
}
