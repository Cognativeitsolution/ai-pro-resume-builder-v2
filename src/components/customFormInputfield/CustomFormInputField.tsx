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

export default function CustomFormInputField({
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
        <div className={`${className}`}>
            <div className={`relative flex ${styles.floatLabelInput}`}>
                {leftIcon && <span className="mr-2">{leftIcon}</span>}
                <input
                    type={type}
                    id="input-field"
                    placeholder=" "
                    value={value}
                    readOnly={readOnly}
                    onChange={onChange}
                    className="w-full bg-transparent border border-white focus:border-none focus:ring-0 rounded-md py-3 px-3 text-white appearance-none transition-all duration-200"
                    {...rest}
                />
                {rightIcon && <span className="ml-2">{rightIcon}</span>}
                <label htmlFor="input-field"
                    className={`absolute !bg-[#333059]  top-3 left-3 pointer-events-none transition-all duration-200 px-2 
                        ${error ? 'text-red-500' : '!text-white peer-placeholder-shown:text-gray-400 peer-focus:text-white'}`}
                >
                    {label}
                </label>
            </div>
            {error && errorMessage && <p className="text-red-500 text-xs text-start mt-[-10px]">{errorMessage}</p>}
        </div>
    );
}
