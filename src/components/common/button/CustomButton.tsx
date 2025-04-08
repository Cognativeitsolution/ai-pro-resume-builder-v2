import React from "react";

type propType = {
  className?: string;
  childClassName?: string;
  title?: string;
  mainColor?: string;
  altColor?: string;
  width?: string;
  padding?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  border?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function AppButton(props: propType) {
  const {
    className = "",
    childClassName = "",
    title,
    mainColor,
    altColor,
    width,
    padding,
    leftIcon,
    rightIcon,
    border,
    onClick,
    disabled,
  } = props;
  return (
    <button
      type="submit"
      disabled={disabled}
      className={
        className
          ? className
          : `group border-2 border-transparent ${mainColor ? mainColor : "bg-primaryBlue"
          } 
                ${altColor ? altColor : "hover:bg-transparent"} 
                ${altColor ? altColor : "hover:border-primaryBlue"} 
               
                inline-flex ${width ? width : "w-full"} ${padding ? padding : "py-2 px-6 xl:py-3 xl:px-8"
          } ${border ? border : "rounded-full"} justify-center 
                items-center font-semibold sm:text-lg tracking-normal uppercase  
                `
      }
      onClick={onClick}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span
        className={
          childClassName
            ? childClassName
            : `font-medium sm:tracking-widest relative ${altColor ? altColor : "group-hover:text-primaryBlue"
            } ${altColor ? altColor : "text-white"}`
        }
      >
        {title}
      </span>
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}
