import React, { FC, useState } from "react";
import { FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";

interface MobileMenuProps {
    onClose: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ onClose }) => {
    const { t } = useTranslation("common");
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [currency, setCurrency] = useState("$ USD");

    const toggleSection = (section: string) => {
        setActiveSection(activeSection === section ? null : section);
    };

    const handleCurrencySwitch = () => {
        setCurrency(currency === "$ USD" ? "$ USD" : "¥ JPY");
    };

    return (
        <div className="fixed bottom-0 left-0 w-full h-[80%] bg-black text-white z-50 p-4 rounded-t-xl flex flex-col space-y-4">
            <div className="flex justify-end">
                <FaTimes size={24} className="cursor-pointer" onClick={onClose} />
            </div>

            <div className="flex justify-between items-center border-b border-gray-700 py-2">
                <span>{t("currency")}</span>
                <div className="flex space-x-2 items-center cursor-pointer" onClick={handleCurrencySwitch}>
                    <span>{currency}</span>
                    <span>{currency === "$ USD" ? "$ USD" : "¥ JPY"}</span>
                </div>
            </div>

            {["Market", "Point Markets", "Language"].map((section) => (
                <div key={section} className="border-b border-gray-700 py-2">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleSection(section)}
                    >
                        <span>{t(section.toLowerCase())}</span>
                        {activeSection === section ? (
                            <FaChevronUp />
                        ) : (
                            <FaChevronDown />
                        )}
                    </div>
                    {activeSection === section && (
                        <div className="mt-2 pl-4 text-gray-400">
                            {section === "Language" ? (
                                ["en", "jp", "zh"].map((lang) => (
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
                                ))
                            ) : (
                                <div className="py-1">{t(`${section.toLowerCase()}-content`)}</div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MobileMenu;