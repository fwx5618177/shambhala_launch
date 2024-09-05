import Image from "next/image";
import React from "react";

interface LogoProps {
  size: "small" | "medium" | "large";
}

const Logo: React.FC<LogoProps> = ({ size }) => {
  const sizeMap = {
    small: {
      width: 80,
      height: 40,
    },
    medium: {
      width: 128,
      height: 30,
    },
    large: {
      width: 200,
      height: 30,
    },
  };

  return (
    <div
      className="relative"
      style={{ width: sizeMap[size].width, height: sizeMap[size].height }}
    >
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
