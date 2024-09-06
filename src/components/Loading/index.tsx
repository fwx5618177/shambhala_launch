import React from 'react';

interface LoadingProps {
    text: string;
    type?: 'default' | 'asset'
}

const Loading: React.FC<LoadingProps> = ({ text, type = 'default' }) => {
    return (
        <div className={
            type === 'default' ?
                "flex items-center justify-center px-4 py-2 rounded-full text-white"
                :
                "w-full h-[60px] flex items-center justify-center bg-primary text-thirdary text-[16px] font-600 rounded-[20px] button-hover"
        }>
            <svg
                className={`animate-spin h-5 w-5 mr-3 ${type === 'default' ? "text-black" : "text-thirdary"
                    }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
            </svg>
            <span className={
                type === 'default' ?
                    "text-black text-lg capitalize"
                    :
                    "text-thirdary text-coinSm capitalize"
            }>{text}...</span>
        </div>
    );
};

export default Loading;