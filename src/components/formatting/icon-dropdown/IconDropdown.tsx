import React, { useState, useRef, useEffect } from 'react';
import { IoMdAddCircle } from 'react-icons/io';

interface IconDropdownProps {
    icons: Record<string, React.ComponentType<any>>; // Dynamic icons passed as props
    iconColor?: string
}

export default function IconDropdown({ icons, iconColor }: IconDropdownProps) {
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const iconList = Object.keys(icons).slice(0, 50); // limit to first 30 for performance

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

    const SelectedIconComponent = selectedIcon ? icons[selectedIcon] : null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-[30px] flex justify-center items-start pt-[2px]"
            >
                {SelectedIconComponent
                    ? <SelectedIconComponent size={18} />
                    : <IoMdAddCircle size={18} />
                }
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-2 bg-white shadow-md border rounded-md p-2 w-60 max-h-72 overflow-y-auto">
                    <div className="grid grid-cols-4 gap-2">
                        {iconList.map((iconKey) => {
                            const IconComponent = icons[iconKey];
                            return (
                                <div
                                    key={iconKey}
                                    onClick={() => handleSelect(iconKey)}
                                    className={`flex flex-col items-center p-2 cursor-pointer hover:bg-gray-100 rounded ${iconColor ? iconColor : "text-black"}`}
                                >
                                    <IconComponent size={24} color={iconColor} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
