import { formatUsdt } from "@/utils/formatUsdt";

/**
 * 计算每日和总收益
 * @param value 输入的金额
 * @param abbrApy 当前的年收益率
 * @param fixedDuration 固定周期标识
 * @param abbrCycle 周期长度
 * @returns 返回每日收益和总收益
 */
export const calculateEarnings = (
    value: number,
    abbrApy: number,
    fixedDuration: number,
    abbrCycle: number
): { dailyEarn: string; totalEarn: string } => {
    let daily = 0;
    let total = 0;

    // 根据周期类型计算每日收益
    if (fixedDuration === 0) {
        daily = (value * abbrApy) / (365 * 1000000);
        total = ((value * abbrCycle * abbrApy) / (365 * 6646 * 1000000)) + value;
    } else {
        daily = (value * 6646 * abbrApy) / (abbrCycle * 1000000);
        total = (value * abbrApy) / 1000000 + value;
    }

    return {
        dailyEarn: formatUsdt(daily, 4),
        totalEarn: formatUsdt(total, 4),
    };
};