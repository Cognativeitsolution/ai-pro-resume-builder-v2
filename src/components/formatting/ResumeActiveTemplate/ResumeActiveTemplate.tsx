"use client";
// ==============
import { useEffect, useRef, useState } from "react";
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
import { RootState } from "@/redux/store";
import axios from "axios";

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
  const { showProfile, isTempIcons, isTempProfile } = useSelector((state: RootState) => state.addSection);
  const { spellCheck, grammarCheck } = useSelector((state: any) => state.ImproveText);
  const settingsRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const [showSettings, setShowSettings] = useState(false);
  const [showProfilePic, setShowProfilePic] = useState(false);
  const [shoeAllIcons, setShoeAllIcons] = useState(false);

  const [incorrectWords, setIncorrectWords] = useState<string[]>([]);
  const [grammarErrors, setGrammarErrors] = useState<string[]>([]);

  // font size 
  const scaleFont = (base: number, size: string) => {
    const scaleMap: Record<string, number> = {
      small: 0.85,
      medium: 1,
      large: 1.2,
    };
    return `${base * (scaleMap[size] || 1)}px`;
  };

  // improve Text 


  const getAllText = () => {
    return addedSections
      ?.map((section: any) => {
        // Education
        if (section.name === "Education" && Array.isArray(section.detail)) {
          console.log("EDUCATION DEBUG", section.detail);
          return section.detail
            .map((edu: any) =>
              [edu.degree, edu.schoolName, edu.location].filter(Boolean).join(" ")
            )
            .join(" ");
        }

        // Generic string description support
        if (typeof section.description === "string") return section.description;

        // Fallback for array-based description
        if (Array.isArray(section.description)) {
          return section.description
            .map((item: any) => Object.values(item).join(" "))
            .join(" ");
        }

        return "";
      })
      .join("\n");
  };

  const fullText = getAllText();

  useEffect(() => {
    const fetchCorrections = async () => {
      if (!spellCheck && !grammarCheck) return;
      // setLoading(true);
      try {
        let spellingMistakes: string[] = [];
        let grammarMistakes: string[] = [];

        if (spellCheck) {
          const spellResponse = await axios.post(
            "https://ai.spellcheck.aiproresume.com/api/v1/spell-correction",
            { text: fullText },
            { headers: { "Content-Type": "application/json" } }
          );
          spellingMistakes =
            spellResponse.data?.data?.map(
              (item: any) => item?.misspelledWord
            ) || [];
        }

        if (grammarCheck) {
          const grammarResponse = await axios.post(
            "https://ai.grmcheck.aiproresume.com/api/v1/grammar-correction",
            { text: fullText },
            { headers: { "Content-Type": "application/json" } }
          );
          grammarMistakes =
            grammarResponse.data?.data?.map((item: any) => item?.wrongWords) ||
            [];
        }

        setIncorrectWords(spellingMistakes);
        setGrammarErrors(grammarMistakes);
      } catch (err) {
        console.error("Error during API call:", err);
      } finally {
        // setLoading(false);
      }
    };

    fetchCorrections();
  }, [spellCheck, grammarCheck, fullText]);

  //============= Highlight function

  const highlightChange = (text: string) => {
    return text.split(/\s+/).map((word) => {
      const cleaned = word.replace(/[.,!?]/g, "").toLowerCase();
      const isSpellingMistake = spellCheck && incorrectWords.includes(cleaned);
      const isGrammarMistake = grammarCheck && grammarErrors.includes(cleaned);

      let spanClass = '';
      if (isSpellingMistake) spanClass += 'text-red-500 ';
      if (isGrammarMistake) spanClass += 'bg-blue-200 underline';

      if (isSpellingMistake || isGrammarMistake) {
        return `<span class="${spanClass.trim()}">${word}</span>`;
      } else {
        return word;
      }
    }).join(' ');
  };
  // template redering
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "template1":
        return <Template1 currentState={currentState} scaleFont={scaleFont} highlightChange={highlightChange} />;
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
        return <Template1 currentState={currentState} scaleFont={scaleFont} highlightChange={highlightChange} />;
    }
  };



  useEffect(() => {
    console.log("Re-rendered due to selectedTemplate change:", selectedTemplate);
  }, [selectedTemplate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSettings]);

  useEffect(() => {
    dispatch(sectionShowIcons(shoeAllIcons))
    dispatch(sectionShowProfile(showProfilePic))
  }, [shoeAllIcons, showProfilePic]);

  useEffect(() => {
    setShowProfilePic(showProfile);
  }, [showProfile]);

  return (
    <div ref={settingsRef} className="bg-[#ffffff] border border-gray-300 min-h-full max-w-max mx-auto relative">
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
          <div className="absolute top-1 z-10 right-[0px] bg-gray-900 text-sm text-white divide-y-[1px] rounded-sm p-2 w-40">
            <div className="cursor-pointer py-2 px-1 flex justify-between items-center gap-x-2">Show Icon <CustomSwitch size="sm" checked={shoeAllIcons} disableToogle={isTempIcons} onChange={setShoeAllIcons} /></div>
            <div className="cursor-pointer py-2 px-1 flex justify-between items-center gap-x-2">Show profile <CustomSwitch size="sm" checked={showProfilePic} disableToogle={isTempProfile} onChange={setShowProfilePic} /> </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResumeActiveTemplate;


