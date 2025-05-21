import React from 'react'
import Image from 'next/image';
// ============
import aiLogo from 'media/images/aiLogo.webp';
import ChatBox from './ChatBox';

const AiAssistant = () => {
    return (
        <div className="w-full h-full absolute top-0 left-0 bg-indigo-200/20">
            <div className="flex flex-col items-center h-full pt-4 pb-5">
                {/* Title */}
                <h3 className="text-[24px] text-zinc-800 font-medium">AI Assistant</h3>
                {/* AI Avatar */}
                <div className="w-[12%] mx-auto my-4">
                    <Image src={aiLogo} alt="AI Assistant" />
                </div>
                <ChatBox />
            </div>
        </div>
    )
}

export default AiAssistant