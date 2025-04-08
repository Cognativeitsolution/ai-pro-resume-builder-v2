import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Styles from './inpufield.module.css'
const CustomPhoneNumber = ({ field, error, errorMessage }: any) => {
  return (
    <>
      <PhoneInput
        {...field}
        value={field.value}
        onChange={(value) => field.onChange(value)}
        defaultCountry="US"
        placeholder="Enter phone number*"
        autoComplete="on"
        className={`w-full leading-3 py-[14px] ${Styles.PhoneInputRimsha} rounded-md px-[14px] border-2 
                ${error ? "border-red-500" : "border-gray-300"}
            `}
      />
      {error && errorMessage && <p className="text-red-500 text-xs text-start mt-1 mb-3">{errorMessage}</p>}
    </>
  );
};

export default CustomPhoneNumber;
