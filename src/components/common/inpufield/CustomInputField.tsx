import React from "react";
import styles from './inpufield.module.css';

type PropsType = {
    label?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    error?: boolean;
    readOnly?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    errorMessage?: any;
};

export default function AppInputField({
    label = "Input",
    type = "text",
    placeholder = "Enter text",
    value,
    onChange,
    className = "",
    error = false,
    readOnly = false,
    leftIcon,
    rightIcon,
    errorMessage,
    ...rest
}: PropsType) {
    return (
        <div className={`w-72 mt-2 ${className}`}>
            <div className={`relative flex ${styles.floatLabelInput}`}>
                {leftIcon && <span className="mr-2">{leftIcon}</span>}
                <input
                    type={type}
                    id="input-field"
                    placeholder=" "
                    value={value}
                    readOnly={readOnly}
                    onChange={onChange}
                    className={`peer w-full border rounded-md py-3 px-3 block appearance-none leading-normal transition-all duration-200
        ${readOnly ? 'text-primaryGray cursor-not-allowed focus:border-primaryBlue' : 'focus:text-primaryBlue focus:outline-primaryBlue'}
        ${error ? 'border-red-500 focus:border-red-500 focus:outline-red-500' : 'border-slate-300 focus:border-primaryBlue'}
    `}
                    {...rest}
                />
                {rightIcon && <span className="ml-2">{rightIcon}</span>}
                <label
                    htmlFor="input-field"
                    className={`absolute bg-transparent top-3 left-3 pointer-events-none transition-all duration-200 px-2
        ${error ? 'text-red-500' : 'text-gray-400 peer-placeholder-shown:text-gray-400 peer-focus:text-primaryBlue'}
    `}
                >
                    {label}
                </label>
            </div>
            {error && errorMessage && <p className="text-red-500 text-xs text-start mt-[-10px]">{errorMessage}</p>}
        </div>
    );
}
