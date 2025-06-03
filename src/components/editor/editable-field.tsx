"use client";
import { CSSProperties, useEffect, useRef, useState } from "react";

export default function EditableField({
  html,
  onChange,
  placeholder,
  placeholderClassName,
  className = '',
  style = {},
  highlightText
}: {
  html: string | undefined;
  onChange: (val: any) => void;
  placeholder?: string;
  placeholderClassName?: string | boolean;
  className?: string;
  style?: CSSProperties;
  highlightText?: (val: any) => any;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // useEffect(() => {
  //   if (!isFocused && ref.current && ref.current.innerHTML !== html) {
  //     ref.current.innerHTML = html || '';
  //   }
  // }, [html, isFocused]);

  // Update innerHTML only if not focused
  useEffect(() => {
    if (!isFocused && ref.current) {
      ref.current.innerHTML = highlightText ? highlightText(html || '') : (html || '');
    }
  }, [html, isFocused, highlightText])

  const handleBlur = () => {
    setIsFocused(false);
    if (ref.current) {
      const plainText = ref.current.innerText;
      onChange(plainText); // pass the clean value up
    }
  };

  return (
    <div className="relative w-full">
      {/* Placeholder */}
      {(!html || html === '<br>') && !isFocused && (
        <div className={`absolute top-0 text-gray-400 pointer-events-none  ${placeholderClassName}`} style={style}>
          {placeholder}
        </div>
      )}

      {/* ContentEditable div */}
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        className={` w-full transition-all duration-500 ease-in-out focus:outline  focus:outline-[0.1px] rounded-sm  ${className}`}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        style={style}
      />
    </div>
  );
}
