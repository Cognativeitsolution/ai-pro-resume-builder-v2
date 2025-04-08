import React from 'react';
import Image from 'next/image';
import { jsPDF } from 'jspdf';
import { FaAngleDown } from 'react-icons/fa6';
// ===============
import logo from 'media/builderIcons/logo.svg';
import pen from 'media/builderIcons/pen.svg';
import plus from 'media/builderIcons/plus.svg';
import right from 'media/builderIcons/right.svg';
import left from 'media/builderIcons/left.svg';
import download from 'media/builderIcons/download.svg';
import preview from 'media/builderIcons/preview.svg';
import crown from 'media/builderIcons/crown.svg';
import user from 'media/builderIcons/user.svg';

// Define types for props
type HeaderProps = {
  currentState: {
    fontSize: string;
    fontFamily: string;
    color: string;
    text: string;
  };
  handleUndo: () => void;
  handleRedo: () => void;
  history: any[];
  future: any[];
}

const UserHeader = (props: HeaderProps) => {
  const { currentState, handleUndo, handleRedo, history, future } = props
  const downloadPDF = () => {
    const doc = new jsPDF();
    const fontSize = parseInt(currentState.fontSize, 10);
    doc.setFontSize(fontSize);
    const fontFamily = currentState.fontFamily || 'Arial';
    doc.setFont(fontFamily);
    const color = currentState.color || '#000000';
    doc.setTextColor(color);
    doc.text(currentState.text, 10, 20);
    doc.save('resume.pdf');
  };

  return (
    <div className="flex items-center justify-between bg-[#ffffff] py-4 px-5 mb-8 border-b border-[#CECECE]">
      <div className="flex items-center gap-12">
        <div>
          <Image src={logo} alt="Logo" />
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Image src={pen} alt="Rename" />
            <span className="text-[14px] text-[#707275]">My Resume001</span>
          </div>
          <div>
            <Image src={plus} alt="Logo" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        {/* Undo and Redo buttons */}
        <div className="flex items-center gap-8">
          <button
            className="text-black rounded cursor-pointer"
            onClick={handleUndo}
            disabled={history.length <= 1}
          >
            <Image src={left} alt="Undo" className="w-[25px]" />
          </button>
          <button
            className="text-black rounded cursor-pointer"
            onClick={handleRedo}
            disabled={future.length === 0}
          >
            <Image src={right} alt="Redo" className="w-[25px]" />
          </button>
        </div>

        <div className="flex items-center gap-6">
          {/* Download PDF button */}
          <div
            onClick={downloadPDF}
            className="bg-primary rounded-3xl py-2 px-4 cursor-pointer flex items-center gap-2 shadow-md"
          >
            <Image src={download} alt="Download" className="w-[15px]" />
            <span className="text-[14px] text-[#818181]">Download</span>
          </div>
          <div className="bg-secondary rounded-3xl py-2 px-4 cursor-pointer flex items-center gap-2 shadow-md">
            <Image src={preview} alt="Preview" className="w-[15px]" />
            <span className="text-[14px] text-[#ffffff]">Preview</span>
          </div>
          <span className="bg-[#D9D9D9] w-[2px] h-[30px]" />
          <div className="cursor-pointer">
            <Image src={crown} alt="Subscription" />
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src={user} alt="User" />
            <FaAngleDown className="text-[#707275]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
