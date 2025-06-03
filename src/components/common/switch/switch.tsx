'use client';

import React from 'react';

type CustomSwitchProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    size?: string;
    disableToogle?: boolean;
};

export default function CustomSwitch({ disableToogle = false, size, checked, onChange, disabled }: CustomSwitchProps) {
    return (
        <label className={`inline-flex items-center ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="sr-only peer"
                disabled={disableToogle}
            />
            <div className={`relative ${size === "sm" ? 'w-9 h-5' : 'w-11 h-6'} bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full ${size ? 'after:h-4 after:w-4' : 'after:h-5 after:w-5'}   after:transition-all peer-checked:bg-[#7B40EA]`}></div>
        </label>
    );
}