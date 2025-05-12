import React, { useState, useRef, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';

const iconList = Object.keys(FaIcons).slice(0, 30);

export default function IconDropdown() {
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (iconKey: string) => {
        setSelectedIcon(iconKey);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-[30px] flex justify-center items-start pt-1"
            >
                {selectedIcon
                    ? React.createElement(FaIcons[selectedIcon as keyof typeof FaIcons])
                    : <IoMdAddCircle size={18} />
                }
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-2 bg-white shadow-md border rounded-md p-2 w-60 max-h-72 overflow-y-auto">
                    <div className="grid grid-cols-4 gap-2">
                        {iconList.map((iconKey) => {
                            const IconComponent = FaIcons[iconKey as keyof typeof FaIcons];
                            return (
                                <div
                                    key={iconKey}
                                    onClick={() => handleSelect(iconKey)}
                                    className="flex flex-col items-center p-2 cursor-pointer hover:bg-gray-100 rounded text-black"
                                >
                                    <IconComponent size={24} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
