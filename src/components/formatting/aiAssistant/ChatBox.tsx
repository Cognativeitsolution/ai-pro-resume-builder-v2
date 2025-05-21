'use client';
// =================
import { useRef, useState } from 'react';
import { IoIosSend, IoMdAttach } from 'react-icons/io';

type ChatMessage = {
    text: string;
    time: string;
    fileUrl?: string;
    fileName?: string;
    isImage?: boolean;
};

export default function ChatBox() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [aiTime] = useState(() =>
        new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })
    );

    const getCurrentTime = () =>
        new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

    const handleSend = () => {
        if (!input.trim()) return;

        const time = getCurrentTime();
        setMessages(prev => [...prev, { text: input, time }]);
        setInput('');
    };

    const handleButtonClick = (text: string) => {
        const time = getCurrentTime();
        setMessages(prev => [...prev, { text, time }]);
    };

    const handleAttachClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const time = getCurrentTime();
            const fileUrl = URL.createObjectURL(file);
            const isImage = file.type.startsWith('image/');
            const isDocument = file.type.includes('pdf') || file.type.includes('text') || file.name.match(/\.(docx?|xlsx?)$/i);

            setMessages(prev => [
                ...prev,
                {
                    text: `Attached: ${file.name}`,
                    time,
                    fileUrl,
                    fileName: file.name,
                    isImage,
                    isDocument,
                },
            ]);
        }
    };

    return (
        <div className="flex flex-col justify-between gap-1 h-full w-full pr-1 text-white">
            {/*===== Message Box =====*/}
            <div className="h-[440px] pl-5 pr-3 overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:rounded-full  [&::-webkit-scrollbar-thumb]:bg-gray-500  [&::-webkit-scrollbar-thumb]:rounded-full  dark:[&::-webkit-scrollbar-track]:bg-transparent  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-400">
                {/*{/*===== AI Greeting Message {/*=====*/}
                <div className="mb-4">
                    <div className="text-[16px] py-3 px-10 w-max mx-auto flex items-center justify-center bg-primaryNew rounded-xl rounded-tl-none text-black">
                        Welcome! How can I assist you today?
                    </div>
                    <div className="text-[12px] text-[#676767] capitalize px-10 mt-1">
                        {aiTime}
                    </div>
                </div>

                {/*{/*===== Buttons {/*=====*/}
                <div className='mb-5'>
                    <div className="flex flex-wrap gap-4 py-3 px-2 bg-primaryNew rounded-xl rounded-tl-none">
                        <p className="text-[15px] text-black">Please select an option below to get started.</p>
                        <button
                            onClick={() => handleButtonClick('Create New Resume')}
                            className="text-[16px] w-max h-[40px] px-4 flex items-center bg-white hover:bg-primaryNew text-black border border-hamzaPrimary rounded-full"
                        >
                            Create New Resume
                        </button>
                        <button
                            onClick={() => handleButtonClick('Edit Existing Resume')}
                            className="text-[16px] w-max h-[40px] px-4 flex items-center bg-white hover:bg-primaryNew text-black border border-hamzaPrimary rounded-full"
                        >
                            Edit Existing Resume
                        </button>
                        <button
                            onClick={() => handleButtonClick('Generate Cover Letter')}
                            className="text-[16px] w-max h-[40px] px-4 flex items-center bg-white hover:bg-primaryNew text-black border border-hamzaPrimary rounded-full"
                        >
                            Generate Cover Letter
                        </button>
                    </div>
                    <div className="text-[12px] text-[#676767] capitalize mt-1">
                        {aiTime}
                    </div>
                </div>

                {/*{/*===== User Messages {/*=====*/}
                <div className="flex flex-col gap-2">
                    {messages.map((msg, idx) => (
                        <div key={idx}>
                            <div className="text-[16px] w-max ml-auto py-[5px] px-4 bg-primaryNew text-black border border-hamzaPrimary rounded-xl rounded-tr-none max-w-[80%] break-words">
                                {msg.isImage && msg.fileUrl ? (
                                    <img src={msg.fileUrl} alt={msg.fileName} className="max-w-xs max-h-60 rounded-md" />
                                ) : msg.fileUrl ? (
                                    <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
                                        📄 {msg.fileName}
                                    </a>
                                ) : (
                                    msg.text
                                )}
                            </div>
                            <div className="text-[12px] text-[#676767] w-max ml-auto capitalize mt-1">
                                {msg.time}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/*===== User Input =====*/}
            <div className="px-5">
                <div className="flex items-center bg-white border border-[#D9D9D9] shadow-md rounded-full px-4 py-2 mt-3">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 bg-transparent text-[16px] outline-none placeholder-zinc-600 text-zinc-800"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <div className="ml-2 flex items-center gap-5">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <button onClick={handleAttachClick} className="text-[24px] text-zinc-800 rotate-45">
                            <IoMdAttach />
                        </button>
                        <button
                            onClick={handleSend}
                            className="p-2 text-[25px] rounded-full bg-PrimaryDark text-white"
                        >
                            <IoIosSend />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
