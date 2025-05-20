import React from 'react'
import Image from 'next/image';
// ============
import aiLogo from 'media/images/aiLogo.svg';

const AiAssistant = () => {
    return (
        <div className="w-full h-full absolute top-0 left-0 bg-[#000000]">
            <div className="flex flex-col items-center h-full pt-12">
                <h3 className="text-[30px] text-[#ffffff] font-medium">AI Assistant</h3>
                <Image src={aiLogo} alt="Rearrange" />
            </div>
        </div>
    )
}

export default AiAssistant