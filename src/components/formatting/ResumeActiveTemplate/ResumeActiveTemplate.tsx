"use client";
// ==============
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// ==============
import Template1 from "../Template/template1";
import Template2 from "../Template/template2";
import Template3 from "../Template/template3";
import Template6 from "../Template/template6";
import Template8 from "../Template/template8";
import Template9 from "../Template/template9";
import Template10 from "../Template/template10";
import { IoSettingsOutline } from "react-icons/io5";
import CustomSwitch from "@/components/common/switch/switch";
import Template1Copy from "../Template/template1copy";
import ResumeTemplate from "../Template/template";
import { sectionShowIcons, sectionShowProfile } from "@/redux/slices/addSectionSlice";

type CurrentState = {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  color: string;
  margin: number;
  padding: number;
  text: any;
};

type ResumePreviewProps = {
  currentState: CurrentState;
  updateState: (newState: CurrentState) => void;
  addedSections?: any
};

const ResumeActiveTemplate = ({ currentState, updateState, addedSections }: ResumePreviewProps) => {
  const selectedTemplate = useSelector((state: any) => state.template.selectedTemplate);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfilePic, setShowProfilePic] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const dispatch = useDispatch();

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "template1":
        return <Template1 currentState={currentState} updateState={updateState} />;
      case "Template1copy":
        return <Template1Copy currentState={currentState} updateState={updateState} />;
      case "template2":
        return <Template2 currentState={currentState} updateState={updateState} />;
      case "templateText":
        return <ResumeTemplate />
      case "template3":
        return <Template3 currentState={currentState} updateState={updateState} />;
      case "template6":
        return <Template6 currentState={currentState} updateState={updateState} />;
      case "template8":
        return <Template8 currentState={currentState} updateState={updateState} />;
      case "template9":
        return <Template9 currentState={currentState} updateState={updateState} />;
      case "template10":
        return <Template10 currentState={currentState} updateState={updateState} />;
      default:
        return <Template1 currentState={currentState} updateState={updateState} />;
    }
  };

  useEffect(() => {
    console.log("Re-rendered due to selectedTemplate change:", selectedTemplate);
  }, [selectedTemplate]);

  useEffect(() => {
    console.log("Show icon toggled:", showProfilePic, showIcons);
    dispatch(sectionShowIcons(showIcons))
    dispatch(sectionShowProfile(showProfilePic))
  }, [showIcons, showProfilePic]);

  return (
    <div className="bg-[#ffffff] border border-gray-300 min-h-full max-w-max mx-auto relative">
      {renderTemplate()}
      <button className="cursor-pointer absolute top-0 -right-8 rounded-sm bg-slate-900/70 p-1" onClick={() => setShowSettings((prev) => !prev)}>
        <IoSettingsOutline
          size={22}
          className="text-white hover:text-gray-200 hover:scale-110 transition-transform duration-300"
        />
      </button>

      {/* Dropdown */}
      {showSettings && (
        <>
          <div className="absolute top-1 z-10 right-[0px] bg-slate-900 border border-indigo-200 text-sm text-white rounded-sm py-2 px-2 w-40">
            <div className="cursor-pointer p-1 flex justify-between items-center gap-x-2">Show Icon <CustomSwitch checked={showIcons} onChange={setShowIcons} /> </div>
          </div>
          <div className="absolute top-14 z-10 right-[0px] bg-slate-900 border border-indigo-200 text-sm text-white rounded-sm py-2 px-2 w-40">
            <div className="cursor-pointer p-1 flex justify-between items-center gap-x-2">Show profile <CustomSwitch checked={showProfilePic} onChange={setShowProfilePic} /> </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResumeActiveTemplate;


