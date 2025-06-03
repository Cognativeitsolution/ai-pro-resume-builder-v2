import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
// ============
import { IoTriangle } from 'react-icons/io5';
import AIImage from 'media/images/ai.png'
// ============
import BotPopup from './BotPopup';

const AiRobo = () => {
    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setShowPopup(false);
            }
        };

        if (showPopup) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPopup]);

    return (
        <>
            {/*====== AI Button ======*/}
            {!showPopup && (
                <div
                    onClick={() => setShowPopup(true)}
                    className="group absolute -left-[70px] hover:-left-[154px] top-14 cursor-pointer flex items-center justify-center transition-all duration-500"
                >
                    <div className="absolute w-[14px] h-[14px] top-1 -right-[3px] opacity-100 z-[-1]">
                        <IoTriangle className="text-hamzaPrimary -rotate-[30deg]" />
                    </div>
                    <div className="flex items-center rounded-full bg-hamzaPrimary h-[28px] min-w-[28px] overflow-hidden px-1 transition-all duration-300">
                        <div className="relative w-[25px]">
                            <Image src={AIImage} alt="ai" className="invert" />
                        </div>
                        <div className="text-white text-sm whitespace-nowrap transition-all duration-500 opacity-0 w-0 ml-0 group-hover:opacity-100 group-hover:w-[80px] group-hover:pl-1 group-hover:pr-2 group-hover:ml-1">
                            AI Assistant
                        </div>
                    </div>
                </div>
            )}

            {/*====== BotPopup ======*/}
            {showPopup && (
                <div ref={popupRef}>
                    <BotPopup />
                </div>
            )}
        </>
    )
}

export default AiRobo