"use client";
// ==============
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// ==============
import Template1 from "../Template/template1";
import Template2Old from "../Template/template2Old";
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
import Template2 from "../Template/template2";
import HuzaifaTemplate1 from "../Template/huzaifa-template";
import { setAllGrammarErrors, setAllIncorrectWords } from "@/redux/slices/improveTextSlice";

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
  const dispatch = useDispatch();
  const selectedTemplate = useSelector((state: any) => state.template.selectedTemplate);
  const { userSummary, userEducation, userExperiences, userProjects, userCertificates, userLanguages, userAwards, userReferences, userSoft_Skills, userTechnical_Skills, userCustomSections, showIcons, showProfile, isDisableIcons, isDisableProfile } = useSelector((state: RootState) => state.addSection);
  const { spellCheck, grammarCheck } = useSelector((state: any) => state.ImproveText);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfilePic, setShowProfilePic] = useState(false);
  const [shoeAllIcons, setShoeAllIcons] = useState(false);
  const [incorrectWords, setIncorrectWords] = useState<string[]>([]);
  const [grammarErrors, setGrammarErrors] = useState<string[]>([]);
  const [enableSpell, setEnableSpell] = useState<boolean>(false);

  const settingsRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  // font size 
  const scaleFont = (base: number, size: string) => {
    const scaleMap: Record<string, number> = {
      small: 0.85,
      medium: 1,
      large: 1.2,
    };
    return `${base * (scaleMap[size] || 1)}px`;
  };

  const getAllText = () => {
    let allText = "";

    // Summary
    if (typeof userSummary === "string") {
      allText += userSummary + " ";
    }

    // Education
    if (Array.isArray(userEducation)) {
      allText += userEducation
        .map((edu: any) =>
          [edu.degree, edu.schoolName, edu.location].filter(Boolean).join(" ")
        )
        .join(" ") + " ";
    }

    // Experience
    if (Array.isArray(userExperiences)) {
      allText += userExperiences
        .map((exp: any) =>
          [exp.title, exp.companyName, exp.description, exp.location].filter(Boolean).join(" ")
        )
        .join(" ") + " ";
    }

    // Projects
    if (Array.isArray(userProjects)) {
      allText += userProjects
        .map((proj: any) =>
          [proj.projectName, proj.description, proj.projectUrl, proj.location].filter(Boolean).join(" ")
        )
        .join(" ") + " ";
    }

    // Certificates
    if (Array.isArray(userCertificates)) {
      allText += userCertificates
        .map((cert: any) =>
          [cert.title, cert.description, cert.institutionName].filter(Boolean).join(" ")
        )
        .join(" ") + " ";
    }

    // Languages
    if (Array.isArray(userLanguages)) {
      allText += userLanguages.join(" ") + " ";
    }

    // Awards
    if (Array.isArray(userAwards)) {
      allText += userAwards
        .map((award: any) =>
          Object.values(award).join(" ")
        )
        .join(" ") + " ";
    }

    // References
    if (Array.isArray(userReferences)) {
      allText += userReferences
        .map((ref: any) =>
          Object.values(ref).join(" ")
        )
        .join(" ") + " ";
    }

    // Soft Skills
    if (Array.isArray(userSoft_Skills)) {
      allText += userSoft_Skills.join(" ") + " ";
    }

    // Technical Skills
    if (Array.isArray(userTechnical_Skills)) {
      allText += userTechnical_Skills
        .map((skill: any) =>
          typeof skill === 'string' ? skill : skill.title
        )
        .join(" ") + " ";
    }

    // Custom Sections
    if (Array.isArray(userCustomSections)) {
      allText += userCustomSections
        .map((custom: any) =>
          [custom.title, custom.description, custom.companyName].filter(Boolean).join(" ")
        )
        .join(" ") + " ";
    }

    return allText.trim();
  };

  const fullText = getAllText();
  console.log("🔍 fullText value:", `"${fullText}"`);

  function enablePopup() {
    setEnableSpell(!enableSpell);
    console.log(enableSpell, "showSpellCorrection3")
  }

  //============= Highlight function
  const highlightChange = (text: string) => {
    return text.split(/\s+/).map((word, index) => {
      const cleaned = word.replace(/[.,!?]/g, "").toLowerCase();
      const isSpellingMistake = spellCheck && incorrectWords.includes(cleaned);
      const isGrammarMistake = grammarCheck && grammarErrors.includes(cleaned);

      let spanClass = '';
      if (isSpellingMistake) spanClass += 'text-red-500 bg-red-100';
      if (isGrammarMistake) spanClass += 'bg-blue-200 underline';

      if (isSpellingMistake || isGrammarMistake) {
        return `<span class="${spanClass.trim()}" data-highlighted="true" data-word="${word}" key="${index}">${word}</span>`;
      } else {
        return word;
      }
    }).join(' ');
  };


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
        dispatch(setAllIncorrectWords(spellingMistakes));

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
        dispatch(setAllGrammarErrors(grammarMistakes));

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

  // ==================== Detect highlighted word clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.dataset?.highlighted === "true") {
        enablePopup(); // Open popup if highlighted word clicked
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  // ==================== Outside click to close popup
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;

      // If not clicking on popup or highlighted word
      if (
        popupRef.current &&
        !popupRef.current.contains(target) &&
        !(target as HTMLElement)?.dataset?.highlighted
      ) {
        setEnableSpell(false); // ✅ Close popup
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);


  // template redering
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "template1":
        return <Template1 currentState={currentState} scaleFont={scaleFont} incorrectTextChange={highlightChange} />;
      case "Template1copy":
        return <Template1Copy currentState={currentState} updateState={updateState} />;
      case "HuzaifaTemplate":
        return <HuzaifaTemplate1 currentState={currentState} updateState={updateState} />;
      case "template2":
        return <Template2 currentState={currentState} scaleFont={scaleFont} incorrectTextChange={highlightChange} />;
      // case "template2Old":
      //   return <Template2Old currentState={currentState} updateState={updateState} />;
      case "templateText":
        return <ResumeTemplate />
      case "template3":
        return <Template3 incorrectTextChange={highlightChange} scaleFont={scaleFont} currentState={currentState} />;
      case "template6":
        return <Template6
          currentState={currentState}
          scaleFont={scaleFont}
          incorrectTextChange={highlightChange}
          enableSpellCorrection={enableSpell}
          popupRefSummary={popupRef} />;
      case "template8":
        return <Template8 currentState={currentState} updateState={updateState} />;
      case "template9":
        return <Template9 currentState={currentState} updateState={updateState} />;
      case "template10":
        return <Template10 currentState={currentState} updateState={updateState} />;
      default:
        return <Template1 currentState={currentState} scaleFont={scaleFont} incorrectTextChange={highlightChange} />;
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
    setShowProfilePic(isDisableProfile === true && false);
    setShoeAllIcons(isDisableIcons === true && false);
  }, [isDisableIcons, isDisableProfile]);

  console.log(showProfile, showIcons, "showIconsshowIconsshowIconsshowIcons");
  return (
    <div ref={settingsRef} className="min-h-full max-w-max mx-auto relative">
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
            <div className="cursor-pointer py-2 px-1 flex justify-between items-center gap-x-2">Show Icon
              <CustomSwitch
                size="sm"
                checked={shoeAllIcons}
                disableToogle={isDisableIcons}
                onChange={setShoeAllIcons}
              />
            </div>
            <div className="cursor-pointer py-2 px-1 flex justify-between items-center gap-x-2">Show profile
              <CustomSwitch
                size="sm"
                checked={showProfilePic}
                disableToogle={isDisableProfile}
                onChange={setShowProfilePic}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResumeActiveTemplate;


