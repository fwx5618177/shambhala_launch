import React, { useState, useEffect, useRef, useCallback } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import Image from "next/image";
import { FaCopy } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import useStore from "@/store/useStore";
import { getSignContent } from "@/services/getSignContent";
import { message } from "@/providers/MessageProvider";
import MobileAccountMenu from "../MobileAccountMenu";

const WalletButton: React.FC<{ size?: string }> = ({ size = "small" }) => {
  const { t } = useTranslation("common");
  const { updateUserInfo, isLogin, updateIsLogin, login } = useStore();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleLogin = useCallback(async () => {
    try {
      const content = await getSignContent();
      const signature = await signMessageAsync({ message: content.text });
      if (address) await login(address, content.text, signature);
      else throw new Error("No address found");

      message.success("Login succeeded");
    } catch (error) {
      message.error("Login failed");
    }
  }, [address, login, signMessageAsync]);

  const handleDisconnect = () => {
    disconnect();
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
    localStorage.removeItem("token");
    updateUserInfo({});
    updateIsLogin(false);
    router.push("/");
  };

  useEffect(() => {
    if (isConnected && !isLogin) {
      handleLogin();
    }
  }, [handleLogin, isConnected, isLogin]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative flex items-center">
      {isConnected ? (
        <div className="flex items-center space-x-2 bg-bannerBg text-thirdary px-4 py-2 rounded-full mr-4 cursor-pointer">
          <div
            className="sm:hidden flex items-center"
            onClick={toggleMobileMenu}
          >
            <Image src="/user-icon.svg" alt="User" width={24} height={24} />
            <span className="text-sm">
              {address?.slice(0, 2)}...{address?.slice(-2)}
            </span>
          </div>

          {/* Desktop Menu Button (large screens) */}
          <div
            className="hidden sm:flex items-center space-x-2 relative"
            ref={menuRef}
          >
            <div
              onClick={toggleMenu}
              className="flex items-center cursor-pointer"
            >
              <Image src="/user-icon.svg" alt="User" width={24} height={24} />
              <span className="truncate">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <Image
                src="/dropdown-arrow.svg"
                alt="Dropdown"
                width={16}
                height={16}
                className="cursor-pointer"
              />
            </div>
            {/* Desktop Menu (visible on large screens) */}
            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 bg-thirdary text-primary rounded-lg shadow-lg z-10 w-48 sm:w-64">
                <ul className="text-sm">
                  <CopyToClipboard text={address || ""} onCopy={handleCopy}>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-tl-xl rounded-tr-xl">
                      <p className="flex items-center justify-between gap-2">
                        <span>
                          {address?.slice(0, 6)}...{address?.slice(-4)}
                        </span>
                        <FaCopy
                          size={18}
                          className="text-black bg-white p-1 rounded-full"
                        />
                      </p>
                    </li>
                  </CopyToClipboard>
                  {isCopied && (
                    <li className="text-center text-green-500">
                      {t("copied")}
                    </li>
                  )}
                  <li
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => router.push("/portfolio")}
                  >
                    {t("portfolio")}
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-bl-xl rounded-br-xl"
                    onClick={handleDisconnect}
                  >
                    {t("disconnect")}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <ConnectButton.Custom>
          {({ openConnectModal }) => (
            <div
              onClick={openConnectModal}
              className={`bg-white text-black rounded-full mr-2 cursor-pointer  sm:text-base whitespace-nowrap ${
                size === "large"
                  ? "p-5 text-[1rem] font-[800]"
                  : "px-3 py-2 text-xs"
              }`}
            >
              {t("connect-wallet")}
            </div>
          )}
        </ConnectButton.Custom>
      )}

      {/* Mobile Account Menu (visible on small and medium screens) */}
      {isMobileMenuOpen && (
        <MobileAccountMenu
          address={address}
          onClose={toggleMobileMenu}
          handleDisconnect={handleDisconnect}
          handleCopy={handleCopy}
          isCopied={isCopied}
        />
      )}
    </div>
  );
};

export default WalletButton;
