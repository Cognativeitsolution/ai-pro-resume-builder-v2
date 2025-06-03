import React from 'react'


const BotPopup = () => {
    return (
        <div className="w-full h-full absolute top-[110%] -left-[45%]">
            <div className="flex flex-col gap-2 bg-white ring-[1.5px] ring-indigo-300 rounded-lg shadow-md w-2/4 p-3">
                <div className="flex items-center justify-start gap-2">
                    <div className="w-[8px] h-[8px] rounded-full bg-PrimaryDark"></div>
                    <h3 className="text-[16px] text-zinc-800 font-semibold uppercase">AI Assistant</h3>
                </div>
                <p className="text-[14px] text-zinc-600">Create a tailored summary. To start, provide a job title or paste an entire job posting below.</p>
                {/* ====== Input ====== */}
                <input
                    placeholder="Job title or posting"
                    className={`p-1 bg-transparent w-full ring-[1.5px] ring-indigo-300 rounded-sm focus:outline-none focus:border-0`}
                />
                {/*====== <CTA ======*/}
                <button className="w-max h-[35px] px-4 rounded-sm flex items-center justify-center bg-hamzaPrimary hover:bg-PrimaryDark text-white mt-2 transition-all duration-300">
                    Generate
                </button>
            </div>
        </div>
    )
}

export default BotPopup