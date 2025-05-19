import React from 'react';

interface CustomInputProps {
    type: string;
    value: string;
    disabled: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    baseClass: string
}

const CustomInput: React.FC<CustomInputProps> = ({ type, value, disabled, onChange, placeholder, baseClass }) => {
    return (
        <div className="w-full">
            <input
                type={type}
                value={value}
                disabled={disabled}
                onChange={onChange}
                placeholder={placeholder}
                className={`bg-transparent w-full rounded focus:outline-none focus:ring-0 focus:border-0 ${baseClass}`}
            />
        </div>
    );
};

export default CustomInput;
