import React from 'react'

type BotPopupProps = {
    input?: boolean;
    list?: any[] | string;
    info?: any;
    popupTitle?: string;
    popupTheme?: 'indigo' | 'green' | 'red' | 'blue';
    popupTitleBtn?: string;
    popupWidth?: string;
    popupPosition?: string;
    onClickPopup?: () => void;
}

const themeStyles = {
    indigo: {
        ring: 'ring-indigo-300',
        background: 'bg-indigo-500',
        backgroundLight: 'bg-indigo-100',
        backgroundHover: 'hover:bg-indigo-700',
    },
    green: {
        ring: 'ring-green-300',
        background: 'bg-green-500',
        backgroundLight: 'bg-green-100',
        backgroundHover: 'hover:bg-green-700',
    },
    red: {
        ring: 'ring-red-300',
        background: 'bg-red-500',
        backgroundLight: 'bg-red-100',
        backgroundHover: 'hover:bg-red-700',
    },
    blue: {
        ring: 'ring-blue-300',
        background: 'bg-blue-500',
        backgroundLight: 'bg-blue-100',
        backgroundHover: 'hover:bg-blue-700',
    },
};

const BotPopup = ({ input, list, info, popupTitle, popupTheme = 'indigo', popupTitleBtn, popupWidth, popupPosition, onClickPopup }: BotPopupProps) => {
    const theme = themeStyles[popupTheme];
    return (
        <div className={`w-full h-full absolute z-10 ${popupPosition ? popupPosition : "top-[110%] -left-[45%]"}`}>
            <div className={`flex flex-col gap-2 bg-white ring-[1.5px] ${theme.ring} rounded-lg shadow-md ${popupWidth ? popupWidth : "w-2/4"} p-3`}>
                <div className="flex items-center justify-start gap-2">
                    <div className={`w-[8px] h-[8px] rounded-full ${theme.background}`}></div>
                    <h3 className="text-[16px] text-zinc-800 font-semibold uppercase">{popupTitle}</h3>
                </div>
                <p className={`text-[14px] text-zinc-600 ${theme.backgroundLight}`}
                    dangerouslySetInnerHTML={{
                        __html: info,
                    }} />
                {input && (
                    <input
                        placeholder="Job title or posting"
                        className={`p-1 bg-transparent w-full ring-[1.5px] ${theme.ring} rounded-sm focus:outline-none`}
                    />
                )}
                <ul className="list-disc pl-5 text-sm text-zinc-700">
                    {Array.isArray(list) && list.length > 0 ? (
                        list.map((item: any, idx: number) => (
                            <li key={idx}>{item}</li>
                        ))
                    ) : (
                        list && <li>{list}</li> // for when `list` is a single string or value
                    )}
                </ul>
                <button className={`w-max h-[35px] px-4 rounded-sm flex items-center justify-center ${theme.background} ${theme.backgroundHover} text-white mt-2 transition-all duration-300`}
                    onClick={onClickPopup}
                >
                    {popupTitleBtn}
                </button>
            </div>
        </div>
    )
}

export default BotPopup