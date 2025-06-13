"use client";
// ==============
import { CSSProperties, useEffect, useRef, useState, useCallback } from "react";

export default function EditableField({
  html = "",
  onChange,
  placeholder = "",
  placeholderClassName = "",
  className = "",
  style = {},
  highlightText,
}: {
  html?: string;
  onChange: (val: string) => void;
  placeholder?: string;
  placeholderClassName?: string | boolean;
  className?: string;
  style?: CSSProperties;
  highlightText?: (val: string) => string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  //====== Safely update innerHTML only when not focused
  useEffect(() => {
    if (!isFocused && ref.current) {
      const newHTML = highlightText ? highlightText(html) : html;
      if (ref.current.innerHTML !== newHTML) {
        ref.current.innerHTML = newHTML;
      }
    }
  }, [html, isFocused, highlightText]);

  //====== Handle blur event
  const handleBlur = () => {
    setIsFocused(false);
    if (ref.current) {
      const plainText = ref.current.innerText.trim();
      console.log(plainText, "plainTextplainText");

      onChange(plainText);
    }
  };

  //====== Sanitize pasted content (text only)
  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  }, []);

  //====== Determine if content is empty
  const isContentEmpty = !html?.trim() || ref.current?.innerText?.trim() === "";

  return (
    <div className="relative w-full">
      {/*====== Placeholder ======*/}
      {isContentEmpty && !isFocused && (
        <div className={`absolute top-0 text-gray-400 pointer-events-none ${placeholderClassName || ""}`} style={style}>
          {placeholder}
        </div>
      )}

      {/*====== Editable Div ======*/}
      {/* <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        onPaste={handlePaste}
        className={`w-full transition-all duration-500 ease-in-out focus:outline focus:outline-[0.1px] rounded-sm ${className}`}
        style={style}
        role="textbox"
        aria-label={placeholder}
        spellCheck={true}
      /> */}
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        onPaste={handlePaste}
        onInput={() => {
          if (ref.current) {
            const plainText = ref.current.innerText.trim();
            onChange(plainText);
          }
        }}
        className={`w-full transition-all duration-500 ease-in-out focus:outline focus:outline-[0.1px] rounded-sm ${className}`}
        style={style}
        role="textbox"
        aria-label={placeholder}
        spellCheck={true}
      />

    </div>


  );
}
