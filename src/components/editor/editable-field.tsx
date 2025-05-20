"use client"
import { useEffect, useRef } from "react";

export default function EditableField ({
  html,
  onChange,
  placeholder,
  className = '',
}: {
  html: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
})  {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== html) {
      ref.current.innerHTML = html || '';
    }
  }, [html]);
  return (
    <div className="relative w-full">
      {/* Placeholder */}
      {(!html || html === '<br>') && (
        <div
          className="absolute left-0 top-0 text-gray-400 pointer-events-none text-sm"
        >
          {placeholder}
        </div>
      )}

      {/* ContentEditable div */}
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        className={`min-h-[1.5rem] w-full focus:outline-none ${className}`}
        onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
        // dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};
