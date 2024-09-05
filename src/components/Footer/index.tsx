import React from "react";

export const Footer = () => {
    return (
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <p className="text-gray-500">Docs</p>
            <p className="text-gray-500">Terms & Conditions</p>
          </div>
          <div className="flex space-x-4">
            <a href="#"><img src="/twitter-icon.svg" alt="Twitter" className="h-6 w-6" /></a>
            <a href="#"><img src="/telegram-icon.svg" alt="Telegram" className="h-6 w-6" /></a>
            <a href="#"><img src="/discord-icon.svg" alt="Discord" className="h-6 w-6" /></a>
          </div>
        </div>
      </footer>
    );
  };