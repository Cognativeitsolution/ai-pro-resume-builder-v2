'use client';

import React, { useState } from 'react';
import CustomTooltip from '../customTooltip/CustomTooltip';

type CustomSwitchProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    size?: string;
    disableToogle?: boolean;
};

export default function CustomSwitch({ disableToogle = false, size, checked, onChange, disabled }: CustomSwitchProps) {
    const [showToolTip, setShowToolTip] = useState(false);
    return (
        <label
            onMouseEnter={() => disableToogle && setShowToolTip(true)}
            onMouseLeave={() => disableToogle && setShowToolTip(false)}
            className={`inline-flex items-center ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="sr-only peer"
                disabled={disableToogle}
            />
            <div className={`relative ${size === "sm" ? 'w-9 h-5' : 'w-11 h-6'} bg-gray-600 ${disableToogle ? 'cursor-not-allowed' : 'cursor-pointer'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full ${size ? 'after:h-4 after:w-4' : 'after:h-5 after:w-5'} after:transition-all peer-checked:bg-[#7B40EA]`}>
                {disableToogle && showToolTip &&
                    <CustomTooltip text="No Icons in this Template!" />}
            </div>
        </label>
    );
}