/**
 * 根据区块信息计算剩余天数
 * @param startBlock 起始区块
 * @param blockNumber 当前区块
 * @param cycle 总周期
 * @returns 显示天数或状态信息
 */
export function handleShowDay(
  startBlock: number,
  blockNumber: number,
  cycle: number
): string {
  if (startBlock < blockNumber) {
    const remainingDays = Math.floor(
      (cycle - (blockNumber - startBlock)) / 6646
    );
    return remainingDays > 0 ? `${remainingDays} days` : "";
  } else {
    return "Not started yet";
  }
}
