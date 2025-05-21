"use client";
import React, { useRef, useState } from "react";

const Editor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const execCommand = (command: string, value: string | null = null) => {
    document.execCommand(command, false, value ?? undefined);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {/* Toolbar */}
      {/* {isFocused && ( */}
        <div className="absolute flex flex-wrap gap-2 mb-4">
          <button onClick={() => execCommand("bold")} className="btn">
            Bold
          </button>
          <button onClick={() => execCommand("underline")} className="btn">
            Underline
          </button>
          <button onClick={() => execCommand("justifyLeft")} className="btn">
            Left
          </button>
          <button onClick={() => execCommand("justifyCenter")} className="btn">
            Center
          </button>
          <button onClick={() => execCommand("justifyRight")} className="btn">
            Right
          </button>
          <button
            onClick={() => execCommand("insertUnorderedList")}
            className="btn"
          >
            Bullet
          </button>
          <button
            onClick={() => execCommand("insertOrderedList")}
            className="btn"
          >
            Number
          </button>
        </div>
      {/* )} */}

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        suppressContentEditableWarning
        className="min-h-[200px] w-full border p-4 rounded shadow bg-white"
      />
    </div>
  );
};

export default Editor;
