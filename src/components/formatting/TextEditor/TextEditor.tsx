"use client"
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import Image from 'next/image';
// ===============
import { ImproveText, AllSections } from "@/components";
// import { addSection } from '../../../redux/slices/fontSlice';
// ===============
import DesignFont from "../DesignFont/DesignFont";
import sections from 'media/builderIcons/sections.svg';
import templetes from 'media/builderIcons/templetes.svg';
import design from 'media/builderIcons/design.svg';
import improve from 'media/builderIcons/improve.svg';
import ats from 'media/builderIcons/ats.svg';
import robot from 'media/builderIcons/robot.svg';
import rearrange from 'media/builderIcons/rearrange.svg';

type TextEditorProps = {
  currentState: {
    color: string;
    selectedIndex: number;
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    margin: number | string;
    padding: number | string;
  };
  updateState: (newState: TextEditorProps['currentState']) => void;
  isSubscribed?: boolean;
  lockedColors?: number[];
};

const TextEditor = (props: TextEditorProps) => {
  const { currentState, updateState, lockedColors = [] } = props;
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState<string>("Design & Font");

  const handleTabChange = (tab: string): void => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="flex gap-2">
        <div className="w-[18%] py-4 bg-[#ffffff] border border-gray-300 rounded-md">
          <ul className="flex flex-col gap-8">
            <li
              className={`flex flex-col items-center justify-center gap-2 text-[12px] leading-[1.2] font-medium cursor-pointer ${activeTab === "Add Section" ? 'text-[#7B40EA]' : 'text-[#707275]'}`}
              onClick={() => handleTabChange("Add Section")}
            >
              <div>
                <Image src={sections} alt="Sections" />
              </div>
              <span>Add <br /> Section</span>
            </li>
            <li
              className={`flex flex-col items-center justify-center gap-2 text-[12px] leading-[1.2] font-medium cursor-pointer ${activeTab === "Templates" ? 'text-[#7B40EA]' : 'text-[#707275]'}`}
              onClick={() => handleTabChange("Templates")}
            >
              <div>
                <Image src={templetes} alt="Templates" />
              </div>
              <span>Templates</span>
            </li>
            <li
              className={`flex flex-col items-center justify-center gap-2 text-[12px] leading-[1.2] font-medium cursor-pointer ${activeTab === "Design & Font" ? 'text-[#7B40EA]' : 'text-[#707275]'}`}
              onClick={() => handleTabChange("Design & Font")}
            >
              <div>
                <Image src={design} alt="Design" />
              </div>
              <span>Design <br /> & Font</span>
            </li>
            <li
              className={`flex flex-col items-center justify-center gap-2 text-[12px] leading-[1.2] font-medium cursor-pointer ${activeTab === "Improve Text" ? 'text-[#7B40EA]' : 'text-[#707275]'}`}
              onClick={() => handleTabChange("Improve Text")}
            >
              <div>
                <Image src={improve} alt="Improve" />
              </div>
              <span>Improve <br /> Text</span>
            </li>
            <li
              className={`flex flex-col items-center justify-center gap-2 text-[12px] leading-[1.2] font-medium cursor-pointer ${activeTab === "ATS Check" ? 'text-[#7B40EA]' : 'text-[#707275]'}`}
              onClick={() => handleTabChange("ATS Check")}
            >
              <div>
                <Image src={ats} alt="ATS" />
              </div>
              <span>ATS <br /> Check</span>
            </li>
            <li
              className={`flex flex-col items-center justify-center gap-2 text-[12px] leading-[1.2] font-medium cursor-pointer ${activeTab === "AI Assistant" ? 'text-[#7B40EA]' : 'text-[#707275]'}`}
              onClick={() => handleTabChange("AI Assistant")}
            >
              <div>
                <Image src={robot} alt="Robot" />
              </div>
              <span>AI <br /> Assistant</span>
            </li>
            <li
              className={`flex flex-col items-center justify-center gap-2 text-[12px] leading-[1.2] font-medium cursor-pointer ${activeTab === "Rearrange" ? 'text-[#7B40EA]' : 'text-[#707275]'}`}
              onClick={() => handleTabChange("Rearrange")}
            >
              <div>
                <Image src={rearrange} alt="Rearrange" />
              </div>
              <span>Rearrange</span>
            </li>
          </ul>
        </div>

        <div className="w-[70%] p-4 bg-[#ffffff] border border-gray-300 rounded-md">
          <div className="flex justify-between items-center">
            <h3 className="text-[16px] text-[#707275] font-bold">{activeTab}</h3>
          </div>
          {/* ===== Add Sections ===== */}
          {activeTab === "Add Section" && (
            <AllSections />
          )}
          {/* ===== Add Sections ===== */}
          {activeTab === "Templates" && <div>Templates Content</div>}
          {/* ===== Add Sections ===== */}
          {activeTab === "Design & Font" && (
            <DesignFont
              currentState={currentState}
              updateState={updateState}
              lockedColors={lockedColors}
            />
          )}
          {/* ===== Add Sections ===== */}
          {activeTab === "Improve Text" && <ImproveText />}
          {/* ===== Add Sections ===== */}
          {activeTab === "ATS Check" && <div>ATS Check Content</div>}
          {/* ===== Add Sections ===== */}
          {activeTab === "AI Assistant" && <div>AI Assistant Content</div>}
          {/* ===== Add Sections ===== */}
          {activeTab === "Rearrange" && <div>Rearrange Content</div>}
        </div>
      </div>
    </>
  );
};

export default TextEditor;
