"use client";
// ==============
import { useEffect } from "react";
import { useSelector } from "react-redux";
// ==============
import Template1 from "../Template/template1";
import Template2 from "../Template/template2";
import Template3 from "../Template/template3";
import Template8 from "../Template/template8";
import Template9 from "../Template/template9";
import Template10 from "../Template/template10";

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

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "template1":
        return <Template1 currentState={currentState} updateState={updateState} />;
      case "template2":
        return <Template2 currentState={currentState} updateState={updateState} />;
      case "template3":
        return <Template3 currentState={currentState} updateState={updateState} />;
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

  return (
    <div className="bg-[#ffffff] border border-gray-300 min-h-full max-w-max mx-auto">
      {renderTemplate()}
    </div>
  );
};

export default ResumeActiveTemplate;


