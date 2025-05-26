import React, { useState } from 'react';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, CircleSmall, ListOrdered, LucideCopyPlus, Underline } from 'lucide-react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ImMoveUp } from 'react-icons/im';
import { IoSettingsOutline } from "react-icons/io5";
import { useEditorTab } from '@/app/configs/store/EditorTabContext';
import CustomSwitch from '@/components/common/switch/switch';

interface SectionToolbarProps {
    onCopy?: () => void;
    onDelete?: () => void;
    onMoveUp?: () => void;
    className?: string;
    position?: string;
    showDot?: boolean;
    mainClass?: string;
    isTextEditor?: any;
    dotClass?: any;
}

const SectionToolbar: React.FC<SectionToolbarProps> = ({
    onCopy,
    onDelete,
    className = '',
    position = 'top-8 right-0',
    showDot = true,
    mainClass,
    isTextEditor,
    dotClass,
}) => {
    const { setActiveTabContext } = useEditorTab();

    const execCommand = (command: string, value: string | null = null) => {
        document.execCommand(command, false, value ?? undefined);
    };
    return (
        <div className={mainClass}>

            {isTextEditor ? (
                <div className="absolute flex px-6 py-2 flex-wrap gap-3 top-1 left-[25%] bg-slate-900/70
                 bg-opacity-80 backdrop-blur-md shadow-xl rounded-full border border-white/20">
                    <button onClick={() => execCommand("bold")} className="btn">
                        <Bold
                            size={18}
                            className="text-white hover:scale-125 transition-transform duration-300"
                        />
                    </button>
                    <button onClick={() => execCommand("underline")} className="btn">
                        <Underline
                            size={18}
                            className="text-white hover:scale-125 transition-transform duration-300"
                        />
                    </button>
                    <button onClick={() => execCommand("justifyLeft")} className="btn">
                        <AlignLeft
                            size={18}
                            className="text-white hover:scale-125 transition-transform duration-300"
                        />
                    </button>
                    <button onClick={() => execCommand("justifyCenter")} className="btn">
                        <AlignCenter
                            size={18}
                            className="text-white hover:scale-125 transition-transform duration-300"
                        />
                    </button>
                    <button onClick={() => execCommand("justifyFull")} className="btn">
                        <AlignJustify
                            size={18}
                            className="text-white hover:scale-125 transition-transform duration-300"
                        />
                    </button>
                </div>
            ) : null}

            <div className={`flex items-center gap-2 px-5 py-2 absolute ${position}bg-slate-900/70  bg-opacity-80 backdrop-blur-md shadow-md rounded-full border ${className}`}>
                <button className="cursor-pointer" onClick={onCopy}>
                    <LucideCopyPlus
                        size={18}
                        className="text-white hover:text-gray-200 hover:scale-110 transition-transform duration-300"
                    />
                </button>
                <button className="cursor-pointer" onClick={onDelete}>
                    <RiDeleteBin6Line
                        size={18}
                        className={`text-white ${dotClass && '-rotate-90'} hover:text-gray-200 hover:scale-110 transition-transform duration-300`}
                    />
                </button>
                <button className="cursor-pointer" onClick={() => setActiveTabContext("Rearrange")}>
                    <ImMoveUp
                        size={18}
                        className={`text-white ${dotClass && '-rotate-90'} hover:text-gray-200 hover:scale-110 transition-transform duration-300`}
                    />
                </button>

                {showDot && (
                    <div
                        className={`absolute h-3 w-3 border rounded-full bg-white border-slate-700 ${dotClass ? dotClass : ' top-3 -left-2'}`}
                    />
                )}


            </div>
        </div>
    );
};

export default SectionToolbar;
