"use client";
import { useEffect, useRef, useState } from "react";

export default function EditableField({
  html,
  onChange,
  placeholder,
  className = '',
}: {
  html: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
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
        <div className="absolute left-0 top-0 text-gray-400 pointer-events-none text-sm">
          {placeholder}
        </div>
      )}

      {/* ContentEditable div */}
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        className={`min-h-[1.5rem] w-full focus:outline-none ${className}`}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
      />
    </div>
  );
}
