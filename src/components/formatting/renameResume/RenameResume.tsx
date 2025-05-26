"use client";
// ===========
import { useState } from "react";
import { FaPencil } from "react-icons/fa6";

interface renameResumeProps {
    initialTitle: string;
    onRename: (newTitle: string) => void;
}

export default function RenameResume({ initialTitle, onRename }: renameResumeProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialTitle);

    const handleRename = () => {
        setIsEditing(false);
        onRename(title);
    };

    return (
        <div className="flex items-center gap-1">
            {!isEditing ? (
                <>
                    <FaPencil onClick={() => setIsEditing(true)} className="text-[14px] text-[#707275] cursor-pointer" />
                    <span className="text-[14px] border-b border-gray-400 bg-transparent text-[#707275]" onClick={() => setIsEditing(true)}>{title}</span>
                </>
            ) : (
                <>
                    <FaPencil onClick={() => setIsEditing(true)} className="text-[14px] text-[#707275] cursor-pointer" />
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleRename}
                        autoFocus
                        className="text-[14px] border-b border-gray-400 bg-transparent text-[#707275] focus:outline-none"
                    />
                </>
            )}
        </div>
    );
}
