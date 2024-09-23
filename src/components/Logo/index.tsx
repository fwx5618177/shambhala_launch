import Image from "next/image";
import React from "react";

interface LogoProps {
  size: "small" | "medium" | "large";
}

const Logo: React.FC<LogoProps> = ({ size }) => {
  const sizeClasses = {
    small: "w-[60px] h-[30px] sm:w-[80px] sm:h-[40px]", // 小屏幕和上面的尺寸
    medium: "w-[100px] h-[30px] sm:w-[128px] sm:h-[50px] md:w-[160px] md:h-[60px]", // 中等尺寸
    large: "w-[120px] h-[40px] sm:w-[200px] sm:h-[60px] md:w-[250px] md:h-[80px]", // 大屏幕尺寸
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <Image
        src="/logo.svg"
        alt="Logo"
        layout="fill" // 自动填充容器
        objectFit="contain" // 保持原比例
      />
    </div>
  );
};

export default Logo;