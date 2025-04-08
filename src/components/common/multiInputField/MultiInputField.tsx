import React from "react";
import { Controller, Control } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import styles from "./multiInputField.module.css"

type ContactFormFieldProps = {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder: string;
  type?: "text" | "email" | "textarea" | "phone";
  rules?: any;
};

const MultiInputField = (props: ContactFormFieldProps) => {
  const { name, control, rules, label, placeholder, type } = props;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className="py-4 font-Lexend px-2 md:px-0">
          {label && (
            <label
              htmlFor={name}
              className="block bg-yellow-400 text-gray-700 mb-1"
            >
              {label}
            </label>
          )}
          {type === "textarea" ? (
            <textarea
              {...field}
              rows={4}
              className={`w-full px-3 py-2 placeholder-gray-500 text-gray-900 border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 transition duration-300 ease-in-out rounded-md ${error ? "border-red-500" : ""
                }`}
              placeholder={placeholder}
            />
          ) : type === "phone" ? (
            <PhoneInput
              speciallabel=""
              autoComplete="on"
              {...field}
              country={"US"}
              className={`w-full px-3 py-2 placeholder-gray-500 text-gray-900 border-b-2 border-gray-300 focus:border-teal-500 transition duration-300 ease-in-out rounded-md ${styles.inputPhoneNumber}`}
              containerClass="w-full"
              placeholder={placeholder}
              onChange={(value) => field.onChange(value)}
            />
          ) : (
            <input
              {...field}
              type={type}
              className={`w-full px-3 py-3 placeholder-gray-500 text-gray-900 border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 transition duration-300 ease-in-out rounded-md ${error ? "border-red-500" : ""
                }`}
              placeholder={placeholder}
            />
          )}
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
      )}
    />
  );
};

export default MultiInputField;
