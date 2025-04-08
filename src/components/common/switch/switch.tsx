'use client';

import React, { useState } from 'react';

type CustomSwitchProps = {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
};

export default function CustomSwitch({ checked = false, onChange }: CustomSwitchProps) {
    const [isChecked, setIsChecked] = useState(checked);

    const handleToggle = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        onChange?.(newChecked);
    };

    return (
        <label className="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleToggle}
                className="sr-only peer"
            />
            <div className="relative w-11 h-6 ou bg-gray-200 peer-focus:outline-none  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-cyan-600 "></div>
        </label>
    );
}