/**
 * 根据币种名称匹配图片路径
 * @param logo 币种名称
 * @returns 图片路径
 */
export function matchImg(logo: string): string {
  const logosMap: Record<string, string> = {
    USDT: "/tether.png",
    SOL: "/solana.png",
    AVAX: "/avax.png",
    USDC: "/usdc.png",
  };

  return logosMap[logo] || "/tether.png";
}
