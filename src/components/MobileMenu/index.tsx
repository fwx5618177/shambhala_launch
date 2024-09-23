import React, { FC, useState } from "react";
import { FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { changeLanguage } from "i18next";

interface MobileMenuProps {
    onClose: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ onClose }) => {
    const { t } = useTranslation("common");
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [currency, setCurrency] = useState("$ USD");
    const router = useRouter();

    const toggleSection = (section: string) => {
        setActiveSection(activeSection === section ? null : section);
    };

    const handleCurrencySwitch = () => {
        setCurrency(currency === "$ USD" ? "¥ JPY" : "$ USD");
    };

    const menuItems = [
        { label: t("market"), path: "/market", icon: "/referral.svg" },
        { label: t("referral"), path: "/referral", icon: "/referral.svg" },
        { label: t("reward-center"), path: "/reward", icon: "/reward.svg" },
        { label: t("my-points"), path: "/points", icon: "/points.svg" },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full h-[80%] bg-black text-white z-50 p-4 rounded-t-xl flex flex-col space-y-4">
            <div className="flex justify-end">
                <FaTimes size={24} className="cursor-pointer" onClick={onClose} />
            </div>

            {/* Currency Switch */}
            <div className="flex justify-start  py-2">
                <div className="flex items-center border border-solid border-tabBorder rounded-[6px]">
                    <div
                        className={`cursor-pointer px-4 py-2 w-full text-center rounded-l-[6px] whitespace-nowrap 
        ${currency === "$ USD"
                                ? "bg-white text-black"   // 选中时背景白色，文字黑色
                                : "bg-[#686868] text-white"  // 未选中时背景 #686868，文字白色
                            }`}
                        onClick={() => setCurrency("$ USD")}
                    >
                        $ USD
                    </div>
                    <div
                        className={`cursor-pointer px-4 py-2 w-full text-center rounded-r-[6px] whitespace-nowrap 
        ${currency === "¥ JPY"
                                ? "bg-white text-black"   // 选中时背景白色，文字黑色
                                : "bg-[#686868] text-white"  // 未选中时背景 #686868，文字白色
                            }`}
                        onClick={() => setCurrency("¥ JPY")}
                    >
                        ¥ JPY
                    </div>
                </div>
            </div>

            {/* Market - Direct Link */}
            <div
                className=" py-2 cursor-pointer"
                onClick={() => {
                    router.push("/market");
                    onClose();
                }}
            >
                <span>{t("market")}</span>
            </div>

            {/* Points Markets - Expandable with Menu Items */}
            <div className=" py-2">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection("Point Markets")}
                >
                    <span>{t("point-markets")}</span>
                    {activeSection === "Point Markets" ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {activeSection === "Point Markets" && (
                    <div className="mt-2 pl-4 text-gray-400">
                        {menuItems.map((item, index) => (
                            <div
                                key={index}
                                className="py-1 cursor-pointer"
                                onClick={() => {
                                    router.push(item.path);
                                    onClose();
                                }}
                            >
                                {item.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Language Section */}
            <div className=" py-2">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection("Language")}
                >
                    <span>{t("language")}</span>
                    {activeSection === "Language" ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {activeSection === "Language" && (
                    <div className="mt-2 pl-4 text-gray-400">
                        {["en", "jp", "zh"].map((lang) => (
                            <div
                                key={lang}
                                className="py-1 cursor-pointer"
                                onClick={() => {
                                    changeLanguage(lang);
                                    onClose();
                                }}
                            >
                                {t(`language-${lang}`)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MobileMenu;