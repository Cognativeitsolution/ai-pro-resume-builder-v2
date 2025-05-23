import React, { useState } from 'react';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, CircleSmall, ListOrdered, LucideCopyPlus, Underline } from 'lucide-react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ImMoveUp } from 'react-icons/im';

interface SectionToolbarProps {
    onCopy?: () => void;
    onDelete?: () => void;
    onMoveUp?: () => void;
    className?: string;
    position?: string;
    showDot?: boolean;
    mainClass?: string;
    isTextEditor?: any
}

const SectionToolbar: React.FC<SectionToolbarProps> = ({
    onCopy,
    onDelete,
    onMoveUp,
    className = '',
    position = 'top-8 right-0',
    showDot = true,
    mainClass,
    isTextEditor
}) => {

    const execCommand = (command: string, value: string | null = null) => {
        document.execCommand(command, false, value ?? undefined);
    };
    return (
        <div className={mainClass}>

            {isTextEditor ? (
                <div className="absolute flex px-6 py-2 flex-wrap gap-3 top-1 left-36 bg-slate-900/70
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
                        className="text-white hover:text-gray-200 hover:scale-110 transition-transform duration-300"
                    />
                </button>
                <button className="cursor-pointer" onClick={onMoveUp}>
                    <ImMoveUp
                        size={18}
                        className="text-white hover:text-gray-200 hover:scale-110 transition-transform duration-300"
                    />
                </button>
                {showDot && (
                    <div className="absolute top-3 -left-2 h-3 w-3 border rounded-full bg-white border-slate-700" />
                )}
            </div>
        </div>
    );
};

export default SectionToolbar;
