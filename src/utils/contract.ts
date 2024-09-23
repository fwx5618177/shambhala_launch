/**
 * 获取合约错误信息的友好提示
 * @param errMsg 合约返回的错误信息
 * @param action 当前执行的操作
 * @returns 处理后的错误信息
 */
export function getContractMsg(
  errMsg: string = "",
  action: string = ""
): string {
  if (/reverted/.test(errMsg)) {
    return action
      ? `${action} reverted`
      : "Action reverted, please retry later";
  } else if (/no data/.test(errMsg)) {
    return action
      ? `${action} failed, please retry later!`
      : "Action reverted, please retry later";
  }

  return errMsg;
}
