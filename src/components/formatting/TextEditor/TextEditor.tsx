"use client"
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import Image from 'next/image';
// ===============
// import { addSection } from '../../../redux/slices/fontSlice';
import AllSections from "../all-sections/AllSections";
import TemplateSwitch from "../template-switch/TemplateSwitch";
import DesignFont from "../DesignFont/DesignFont";
import ImproveText from "../improveText/improveText";
import AtsCheck from "../AtsCheck/AtsCheck";
import ReArrange from "../rearrange/rearrange";
import AiAssistant from "../aiAssistant/AiAssistant";
// ===============
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

  const [activeTab, setActiveTab] = useState<string>("Add Section");

  const handleTabChange = (tab: string): void => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="flex gap-2 sticky top-[11%]">
        <div className="w-[18%] py-4 bg-[#ffffff] border border-gray-300 rounded-xl">
          <ul className="flex flex-col gap-8">
            <li
              className={`flex flex-col items-center justify-center gap-2 text-[14px] leading-[1.1] font-medium cursor-pointer text-center ${activeTab === "Add Section" ? 'text-[#7B40EA]' : 'text-[#707275]'}`}
              onClick={() => handleTabChange("Add Section")}
            >
              <div>
                <Image src={sections} alt="Sections" />
              </div>
              <span>Add <br /> Section</span>
            </li>
            <li
              className={`flex flex-col items-center justify-center gap-2 text-[14px] leading-[1.1] font-medium cursor-pointer text-center ${activeTab === "Templates" ? 'text-[#7B40EA]' : 'text-[#707275]'}`}
              onClick={() => handleTabChange("Templates")}
            >
              <div>
                <Image src={templetes} alt="Templates" />
              </div>
              <span>Templates</span>
            </li>
            <li
              className={`flex flex-col items-center justify-center gap-2 text-[14px] leading-[1.1] font-medium cursor-pointer text-center ${activeTab === "Design & Font" ? 'text-[#7B40EA]' : 'text-[#707275]'}`}
              onClick={() => handleTabChange("Design & Font")}
            >
              <div>
                <Image src={design} alt="Design" />
              </div>
              <span>Design <br /> & Font</span>
            </li>
            <li
              className={`flex flex-col items-center justify-center gap-2 text-[14px] leading-[1.1] font-medium cursor-pointer text-center ${activeTab === "Improve Text" ? 'text-[#7B40EA]' : 'text-[#707275]'}`}
              onClick={() => handleTabChange("Improve Text")}
            >
              <div>
                <Image src={improve} alt="Improve" />
              </div>
              <span>Improve <br /> Text</span>
            </li>
            <li
              className={`flex flex-col items-center justify-center gap-2 text-[14px] leading-[1.1] font-medium cursor-pointer text-center ${activeTab === "ATS Check" ? 'text-[#7B40EA]' : 'text-[#707275]'}`}
              onClick={() => handleTabChange("ATS Check")}
            >
              <div>
                <Image src={ats} alt="ATS" />
              </div>
              <span>ATS <br /> Check</span>
            </li>
            <li
              className={`flex flex-col items-center justify-center gap-2 text-[14px] leading-[1.1] font-medium cursor-pointer text-center ${activeTab === "AI Assistant" ? 'text-[#7B40EA]' : 'text-[#707275]'}`}
              onClick={() => handleTabChange("AI Assistant")}
            >
              <div>
                <Image src={robot} alt="Robot" />
              </div>
              <span>AI <br /> Assistant</span>
            </li>
            <li
              className={`flex flex-col items-center justify-center gap-2 text-[14px] leading-[1.1] font-medium cursor-pointer text-center ${activeTab === "Summary Generator" ? 'text-[#7B40EA]' : 'text-[#707275]'}`}
              onClick={() => handleTabChange("Summary Generator")}
            >
              <div>
                <Image src={robot} alt="Robot" />
              </div>
              <span>Summary <br /> Generator</span>
            </li>
            <li
              className={`flex flex-col items-center justify-center gap-2 text-[14px] leading-[1.1] font-medium cursor-pointer text-center ${activeTab === "Rearrange" ? 'text-[#7B40EA]' : 'text-[#707275]'}`}
              onClick={() => handleTabChange("Rearrange")}
            >
              <div>
                <Image src={rearrange} alt="Rearrange" />
              </div>
              <span>Rearrange</span>
            </li>
          </ul>
        </div>

        <div className="w-[70%] p-4 bg-[#ffffff] border border-gray-300 rounded-xl relative overflow-hidden">
          <div className="flex justify-between items-center pb-3 border-b border-gray-300">
            <h3 className="text-[16px] text-[#707275] font-semibold">{activeTab}</h3>
          </div>
          {/* ===== Add Sections ===== */}
          {activeTab === "Add Section" && (
            <AllSections />
          )}
          {/* ===== Templates ===== */}
          {activeTab === "Templates" && <div>
            <TemplateSwitch />
          </div>}
          {/* ===== Design & Fonts ===== */}
          {activeTab === "Design & Font" && (
            <DesignFont
              currentState={currentState}
              updateState={updateState}
              lockedColors={lockedColors}
            />
          )}
          {/* ===== Improve Text ===== */}
          {activeTab === "Improve Text" && <ImproveText />}
          {/* ===== ATS Check ===== */}
          {activeTab === "ATS Check" && <AtsCheck />}
          {/* ===== AI Assistant ===== */}
          {activeTab === "AI Assistant" && <AiAssistant />}
          {/* ===== Summary Generator ===== */}
          {activeTab === "Summary Generator" && <div>Summary Generator Content</div>}
          {/* ===== Rearrange ===== */}
          {activeTab === "Rearrange" && <ReArrange />}
        </div>
      </div>
    </>
  );
};

export default TextEditor;
