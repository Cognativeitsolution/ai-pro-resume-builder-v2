"use client";

import DndExample from "../drag-and-drop/DndExample";
import { Lock } from 'lucide-react';


const ReArrange = () => {
    return (
        <div className=" mt-4">
            <div className="bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-3 mb-2 flex items-center justify-center text-center relative opacity-50 cursor-not-allowed">
                Header
                <div className="absolute top-3 left-4">
                    <Lock size={22} className="text-slate-800" />
                </div>
            </div>
            <DndExample doubleColumn={true} />
        </div>
    );
};

export default ReArrange;
