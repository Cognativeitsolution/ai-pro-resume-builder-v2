import React from 'react';

interface CustomTextAreaProps {
    value: string;
    disabled: boolean;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    baseClass: string;
    rows: number;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({ value, disabled, onChange, placeholder, baseClass, rows }) => {
    return (
        <div className="w-full">
            <textarea
                value={value}
                disabled={disabled}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className={`bg-transparent w-full rounded focus:outline-none focus:ring-0 focus:border-0 ${baseClass}`}
            ></textarea>
        </div>
    );
};

export default CustomTextArea;
