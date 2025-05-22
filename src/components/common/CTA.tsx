"use client";
import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

interface CTAProps {
    text: string;
    href?: string;
    number?: boolean;
    email?: boolean;
    link?: boolean;
    btn?: boolean;
    bgColor: string;
    txtColor: string;
    border: string;
    handleClick?: () => void;
    width?: string;
    type?: any;
    icon?: boolean;
}

const CTA = ({
    text,
    href = "#",
    number,
    email,
    link,
    btn,
    bgColor,
    txtColor,
    border,
    handleClick,
    width,
    type,
    icon
}: CTAProps) => {
    const baseClasses = `${bgColor} ${txtColor} ${border} ${width ? width : "w-max"}  h-[40px] px-4 rounded-md flex items-center justify-center transition-all duration-700`;
    const content = (
        <span className="text-[16px] font-semibold tracking-wide">
            {text}
        </span>
    );

    return number ? (
        <a href="tel:123456789" className={baseClasses}>{content}</a>
    ) : email ? (
        <a href="mailto:abc@xyz.com" className={baseClasses}>{content}</a>
    ) : link ? (
        <a href={href} className={baseClasses}>
            {icon && <IoIosArrowRoundBack size={20} className="mr-2" />}
            {content}
        </a>
    ) : btn ? (
        <button onClick={handleClick} type={type ? type : "button"} className={baseClasses}>
            {content}
        </button>
    ) : null;
};

export default CTA;