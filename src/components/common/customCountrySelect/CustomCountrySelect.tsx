import React from "react";
import styles from "./inpufield.module.css";

type PropsType = {
    label?: string;
    name: string;
    options?: { id: string; name: string; disabled?: boolean }[];
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
    error?: boolean;
    errorMessage?: string;
    countrySelect?: boolean;
};

const CustomCountrySelect = ({
    label = "Select",
    name,
    options = [],
    value,
    onChange,
    className = "",
    error = false,
    errorMessage,
    countrySelect = false,
    ...rest
}: PropsType) => {
    return (
        <div className={`w-72 ${className}`}>
            <div className={`relative ${styles.floatLabelSelect}`}>
                <select
                    id={name}
                    value={value}
                    onChange={onChange}
                    className={`peer w-full border bg-transparent text-white
                     rounded-md py-3 px-3 block appearance-none leading-normal transition-all duration-200 focus:outline-none
                        ${error ? "border-red-500 focus:border-red-500" : "border-slate-300"}
                    `}
                    {...rest}
                >
                    <option value=""></option>
                    {options?.map((option) => (
                        <option disabled={option?.disabled} key={option?.id} value={option?.id}>
                            {option?.name}
                        </option>
                    ))}
                </select>
                <label
                    htmlFor={name}
                    className={`absolute left-3 bg-red-900 px-2 text-white transition-all duration-200
                        ${error ? "text-red-500" : "text-black  bg-slate-900 peer-focus:text-white"} `}
                >
                    {label}
                </label>
            </div>
            {error && errorMessage && <p className="text-red-500 text-xs text-start mt-[-10px] mb-5">{errorMessage}</p>}
        </div>
    );
};

export default CustomCountrySelect;
