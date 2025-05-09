"use client";
import { useSelector } from "react-redux";
import Template1 from "../Template/template1";
import Template3 from "../Template/template3";
import Template10 from "../Template/template10";
import { useEffect } from "react";
import Template2 from "../Template/template2";

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
};

const ResumeActiveTemplate = ({ currentState, updateState }: ResumePreviewProps) => {
  const selectedTemplate = useSelector((state: any) => state.template.selectedTemplate);
  console.log(selectedTemplate, "selectedTemplate===========>")


  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "template1":
        return <Template1 currentState={currentState} updateState={updateState} />;
      case "template2":
        return <Template2 currentState={currentState} updateState={updateState} />;
      case "template3":
        return <Template3 currentState={currentState} updateState={updateState} />;
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
    <div className="bg-[#ffffff] border border-gray-300 rounded-md min-h-full max-w-[1000px] mx-auto">
      {renderTemplate()}
    </div>
  );
};

export default ResumeActiveTemplate;


