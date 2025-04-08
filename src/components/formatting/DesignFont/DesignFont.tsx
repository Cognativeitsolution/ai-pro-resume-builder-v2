import React, { useEffect, useState } from "react";
import { Lock } from 'lucide-react';
// Importing fonts
import {
  Rubik,
  Montserrat,
  Lato,
  Raleway,
  Bitter,
  Chivo,
  Oswald,
  Volkhov,
} from "next/font/google";
// ===============

const rubik = Rubik({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600"] });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });
const raleway = Raleway({ subsets: ["latin"], weight: ["400", "700"] });
const bitter = Bitter({ subsets: ["latin"], weight: ["400", "700"] });
const chivo = Chivo({ subsets: ["latin"], weight: ["400", "700"] });
const oswald = Oswald({ subsets: ["latin"], weight: ["400", "700"] });
const volkhov = Volkhov({ subsets: ["latin"], weight: ["400", "700"] });

const colors = [
  { hex: '#294452', locked: false },
  { hex: '#369A8C', locked: false },
  { hex: '#E6C374', locked: false },
  { hex: '#F1A163', locked: false },
  { hex: '#E27055', locked: false },
  { hex: '#E05757', locked: false },
  { hex: '#FBE7D5', locked: false },
  { hex: '#DDBDAD', locked: false },
  { hex: '#00b6cb', locked: false },
  { hex: '#C99980', locked: true },
  { hex: '#B8B6A4', locked: true },
  { hex: '#3c6df0', locked: true },
];

// Define types for the props and state
type DesignFontProps = {
  currentState: {
    color: string;
    selectedIndex: number;
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    margin: number | string;
    padding: number | string;
  };
  updateState: (newState: DesignFontProps['currentState']) => void;
  isSubscribed?: boolean;  // Added the isSubscribed prop
  lockedColors: number[];
};

const DesignFont = ({ currentState, updateState, }: DesignFontProps) => {
  const [selectedColor, setSelectedColor] = useState('#294452');
  useEffect(() => {
    setSelectedColor(currentState.color);
  }, [currentState.color]);


  // Define font family
  const fontStyles: { [key: string]: string } = {
    Rubik: rubik.className,
    Montserrat: montserrat.className,
    Lato: lato.className,
    Raleway: raleway.className,
    Bitter: bitter.className,
    Chivo: chivo.className,
    Oswald: oswald.className,
    Volkhov: volkhov.className,
  };

  return (
    <div className={`mt-4`}>
      {/* Color Palette */}
      <div className="flex flex-col items-start justify-start gap-4 py-4 border-y border-gray-300">
        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <label className="text-[14px] text-[#707275] font-bold">Color</label>
          <div className="grid grid-cols-6 gap-4 mb-4">
            {colors.map((color, index) => (
              <button
                key={index}
                className={`w-10 h-10 rounded-full flex items-center justify-center relative ${selectedColor === color.hex ? 'ring-2 ring-purple-500 ring-offset-2' : ''
                  }`}
                style={{ backgroundColor: color.hex }}
                onClick={() => {
                  if (!color.locked) {
                    setSelectedColor(color.hex);
                    updateState({ ...currentState, color: color.hex });
                  }
                }}

                disabled={color.locked}
              >
                {color.locked && (
                  <div className="absolute inset-0 bg-white/60 rounded-full flex items-center justify-center cursor-pointer">
                    <Lock size={16} className="text-gray-600" />
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 border border-[#CECECE] rounded-md p-2 bg-white w-full">
            {/* Custom color circle */}
            <div className="text-center text-white cursor-pointer rounded-sm w-6 h-6" style={{ backgroundColor: selectedColor }}>
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => {
                  setSelectedColor(e.target.value);
                  updateState({ ...currentState, color: e.target.value });
                }}
                className="w-6 h-6 p-0 border-2 border-transparent cursor-pointer rounded opacity-0"
              />
            </div>
            {/* Show selected color hex */}
            <span className="text-sm font-mono">{selectedColor}</span>
          </div>
        </div>
      </div>

      <div className="py-4 border-y-0.5 border-gray-300">
        {/* Font Style */}
        <div className="flex flex-col items-start justify-start gap-2">
          <label className="text-[14px] text-[#707275] font-bold">Font Style</label>
          <select
            value={currentState.fontFamily}
            onChange={(e) => updateState({ ...currentState, fontFamily: e.target.value })}
            className="p-2 border border-[#CECECE] rounded-md focus:outline-none w-full"
          >
            <option value="Arial">Arial</option>
            <option value="Rubik">Rubik</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Lato">Lato</option>
            <option value="Raleway">Raleway</option>
            <option value="Bitter">Bitter</option>
            <option value="Chivo">Chivo</option>
            <option value="Oswald">Oswald</option>
            <option value="Volkhov">Volkhov</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>

        {/* Font Size */}
        <div className="flex flex-col items-start justify-start gap-2 my-4">
          <label className="text-[14px] text-[#707275] font-bold">Font Size</label>
          <div className="flex items-center gap-8">
            <div className={`flex items-center gap-2 cursor-pointer`}>
              <input
                type="radio"
                name="fontSize"
                className="cursor-pointer"
                value="16px"
                checked={currentState.fontSize === "16px"}
                onChange={() => updateState({ ...currentState, fontSize: "16px" })}
              />
              <span className={`text-[14px] text-[#000000] font-medium ${currentState.fontSize === "16px" ? "text-blue-500" : ""}`}>Small</span>
            </div>
            <div className={`flex items-center gap-2 cursor-pointer`}>
              <input
                type="radio"
                name="fontSize"
                className="cursor-pointer"
                value="20px"
                checked={currentState.fontSize === "20px"}
                onChange={() => updateState({ ...currentState, fontSize: "20px" })}
              />
              <span className={`text-[14px] text-[#000000] font-medium ${currentState.fontSize === "20px" ? "text-blue-500" : ""}`}>Medium</span>
            </div>
            <div className={`flex items-center gap-2 cursor-pointer`}>
              <input
                type="radio"
                name="fontSize"
                className="cursor-pointer"
                value="24px"
                checked={currentState.fontSize === "24px"}
                onChange={() => updateState({ ...currentState, fontSize: "24px" })}
              />
              <span className={`text-[14px] text-[#000000] font-medium ${currentState.fontSize === "24px" ? "text-blue-500" : ""}`}>Large</span>
            </div>
          </div>
        </div>

        {/* Font Weight (Hidden) */}
        <div className="hidden flex-col items-start justify-start gap-2">
          <label className="text-[14px] text-[#707275] font-bold">Font Weight</label>
          <select
            className="p-2 border border-gray-400 rounded-sm focus:outline-none w-full"
            value={currentState.fontWeight}
            onChange={(e) => updateState({ ...currentState, fontWeight: e.target.value })}
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
          </select>
        </div>
      </div>

      <div className="border-t-1 border-gray-300 py-4 hidden">
        {/* Margin */}
        <div className="flex flex-col items-start justify-start gap-2">
          <label className="text-[14px] text-[#707275] font-medium">Margin</label>
          <input
            type="range"
            min="0"
            max="100"
            value={currentState.margin}
            onChange={(e) => updateState({ ...currentState, margin: e.target.value })}
            className="border border-gray-400 rounded-sm focus:outline-none w-full p-2"
          />
        </div>

        {/* Padding */}
        <div className="flex flex-col items-start justify-start gap-2">
          <label className="text-[14px] text-[#707275] font-medium">Padding</label>
          <input
            type="range"
            min="0"
            max="100"
            value={currentState.padding}
            onChange={(e) => updateState({ ...currentState, padding: e.target.value })}
            className="border border-gray-400 rounded-sm focus:outline-none w-full p-2"
          />
        </div>
      </div>

    </div>
  );
};

export default DesignFont;
