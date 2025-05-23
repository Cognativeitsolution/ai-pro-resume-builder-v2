"use client";
import { CSSProperties, useEffect, useRef, useState } from "react";

export default function EditableField({
  html,
  onChange,
  placeholder,
  placeholderClassName,
  className = '',
  style = {},
}: {
  html: string;
  onChange: (val: string) => void;
  placeholder?: string;
  placeholderClassName?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused && ref.current && ref.current.innerHTML !== html) {
      ref.current.innerHTML = html || '';
    }
  }, [html, isFocused]);

  const handleBlur = () => {
    setIsFocused(false);
    if (ref.current) {
      onChange(ref.current.innerHTML);
    }
  };

  return (
    <div className="relative w-full">
      {/* Placeholder */}
      {(!html || html === '<br>') && !isFocused && (
        <div className={`absolute top-0 text-gray-400 pointer-events-none text-sm ${placeholderClassName}`}>
          {placeholder}
        </div>
      )}

      {/* ContentEditable div */}
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        className={`min-h-[1.5rem] w-full focus:outline focus:outline-[0.1px] focus:outline-indigo-600 ${className}`}

        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        style={style}
      />
    </div>
  );
}
