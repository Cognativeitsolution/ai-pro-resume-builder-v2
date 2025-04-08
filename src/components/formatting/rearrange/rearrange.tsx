"use client";

import DndExample from "../drag-and-drop/DndExample";
import { IoIosLock } from "react-icons/io";

const ReArrangeSection = () => {
    return (
        <div className="px-4 py-8 border-2 border-gray-200 border-dashed rounded-lg bg-white">
            <div className="bg-gray-200/50 border-2 border-dashed rounded-lg px-4 py-3 mb-5 flex items-center justify-center text-center relative">
                Header
                <div className="absolute top-0 left-0">
                    <IoIosLock size={24} className="text-slate-800" />
                </div>
            </div>
            <DndExample doubleColumn={true} />
        </div>
    );
};

export default ReArrangeSection;
