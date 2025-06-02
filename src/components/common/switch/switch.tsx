'use client';

import React from 'react';

type CustomSwitchProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
};

export default function CustomSwitch({ checked, onChange, disabled }: CustomSwitchProps) {
    return (
        <label className={`inline-flex items-center ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="sr-only peer"
                disabled={disabled}
            />
            <div className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7B40EA]"></div>
        </label>
    );
}
