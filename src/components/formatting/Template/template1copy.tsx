"use client";
// ============
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
// ============
import { useDispatch, useSelector } from "react-redux";
import { setColumn, setList } from "@/redux/slices/rearrangeSlice";
import { addUserHeader, sectionEditMode } from "@/redux/slices/addSectionSlice";
// ============
import { BookUser, Mail, Phone } from "lucide-react";
// ============
import AllSummary from "../all-sections/sections-details/AllSummary";
import AllCertificates from "../all-sections/sections-details/AllCertificates";
import AllEducations from "../all-sections/sections-details/AllEducations";
import AllExperiences from "../all-sections/sections-details/AllExperiences";
import AllProjects from "../all-sections/sections-details/AllProjects";
import AllSoftSkills from "../all-sections/sections-details/AllSoftSkills";
import AllLanguages from "../all-sections/sections-details/AllLanguages";
import AllTechnicalSkills from "../all-sections/sections-details/AllTechnicalSkills";
import AllAwards from "../all-sections/sections-details/AllAwards";
import AllReferences from "../all-sections/sections-details/AllReferences";
import AllCustomSection from "../all-sections/sections-details/AllCustomSections";
import Watermark from "@/components/common/watermark/watermark";
import TemplateProfileImg from "@/components/profileImg/TemplateProfileImg";
const A4_HEIGHT_PX = 1122;

type CurrentState = {
  fontSize: any;
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

const Template1 = ({ currentState }: ResumePreviewProps) => {
  const dispatch = useDispatch();
  const { addedSections, sectionBgColor, editMode } = useSelector(
    (state: any) => state.addSection
  );
  const { spellCheck, grammarCheck } = useSelector(
    (state: any) => state.ImproveText
  );
  const [incorrectWords, setIncorrectWords] = useState<string[]>([]);
  const [grammarErrors, setGrammarErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [secName, setSecName] = useState("");
  const [templateBgColor, setTemplateBgColor] = useState<any>("");
  const [editable, setEditable] = useState<boolean>(false);
  const [headerEditable, setHeaderEditable] = useState<boolean>(false);
  const containerHeaderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const [headerData, setHeaderData] = useState({ name: "", designation: "" });
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [measured, setMeasured] = useState(false);
  const [containerHeight , setContainerHeight] = useState(297)

  useEffect(() => {
    setSecName("Custom Section");
  }, []);

  const [pages, setPages] = useState<any[][]>([]);
  const HandleChangeSectionName = (data: any) => {
    console.log(data);
    setSecName(data);
  };

  // ===================
  useEffect(() => {
    setTemplateBgColor(sectionBgColor);
  }, [editMode, sectionBgColor]);

  //============= improve text logic

  //============= all sections
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
      setLoading(true);
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
        setLoading(false);
      }
    };

    fetchCorrections();
  }, [spellCheck, grammarCheck, fullText]);

  //============= Highlight function

  const highlightChange = (text: any) => {
    console.log(text, "text======>")
    return text.split(/\s+/).map((word: any) => {
      const cleaned = word.replace(/[.,!?]/g, "").toLowerCase();
      const isSpellingMistake = spellCheck && incorrectWords.includes(cleaned);
      const isGrammarMistake = grammarCheck && grammarErrors.includes(cleaned);

      let spanClass = '';
      if (isSpellingMistake) spanClass += 'text-red-500 ';
      if (isGrammarMistake) spanClass += 'bg-blue-200 underline';

      return `<span class="${spanClass.trim()}">${word}</span>`;
    }).join(' ');
  };

  // ========== Render Sections
  const renderSection = (section: any) => {
    switch (section?.name) {
      case "Summary":
        return <AllSummary data={section} highlightText={highlightChange} />;
      case "Soft Skills":
        return (
          <AllSoftSkills
            data={section}
            textColor="#fff"
            textAltColor="#000"
            templateColor="#fff"
            editableAltBG="bg-gray-900/80"
            isPillStyle={true}
            headerPosition="-top-[30px] -right-[50px]"
            isVerticleHeader={true}
            isDot={false}
          />
        );
      case "Technical Skills":
        return (
          <AllTechnicalSkills
            data={section}
            textColor="#fff"
            textAltColor="#000"
            templateColor="#fff"
            editableAltBG="bg-gray-900/80"
            isPillStyle={true}
            headerPosition="-top-[30px] -right-[50px]"
            isVerticleHeader={true}
            isDot={false}
          />
        );
      case "Certificate":
        return <AllCertificates data={section}
          fontSize={scaleFont(16, currentState.fontSize)}
          fontFamily={currentState.fontFamily}
        />;
      case "Education":
        return (
          <AllEducations
            data={section}
            textColor=""
            textAltColor=""
            templateColor=""
            fontSize={scaleFont(16, currentState.fontSize)}
            fontFamily={currentState.fontFamily}
            highlightText={highlightChange}
          />
        );
      case "Experience":
        return (
          <AllExperiences
            data={section}
            textColor=""
            textAltColor=""
            templateColor=""
            fontSize={scaleFont(16, currentState.fontSize)}
            fontFamily={currentState.fontFamily}
          />
        );
      case "Projects":
        return (
          <AllProjects
            data={section}
            textColor=""
            textAltColor=""
            templateColor=""
          />
        );
      case "Awards":
        return (
          <AllAwards
            data={section}
            textColor="#000"
            textAltColor={currentState.color}
            templateColor={currentState.color}
            fontSize={scaleFont(16, currentState.fontSize)}
            iconSize={scaleFont(13, currentState.fontSize)}
            fontFamily={currentState.fontFamily}
          />
        );
      case "References":
        return (
          <AllReferences
            data={section}
            textColor="#000"
            templateColor={currentState.color}
            textAltColor={currentState.color}
          />
        );
      case "Languages":
        return (
          <AllLanguages
            data={section}
            textColor="#fff"
            templateColor="#3358c5"
            editableAltBG="bg-gray-900/80"
            fontSize={scaleFont(16, currentState.fontSize)}
            fontFamily={currentState.fontFamily}
            headerPosition="-top-[30px] -right-[50px]"
            isVerticleHeader={true}
            isDot={false}
          />
        );
      case "Custom Section":
        return (
          <AllCustomSection
            secNewNames={secName}
            data={section}
            textColor="#000"
            templateColor="#fff"
            fontSize={scaleFont(16, currentState.fontSize)}
            fontFamily={currentState.fontFamily}
            iconSize={scaleFont(22, currentState.fontSize)}
          />
        );
      default:
        // return <p>{highlightWords(section?.content || "")}</p>;
        return <p>{highlightChange(section?.content || "")}</p>;
    }
  };

  const scaleFont = (base: number, size: string) => {
    const scaleMap: Record<string, number> = {
      small: 0.85,
      medium: 1,
      large: 1.2,
    };
    return `${base * (scaleMap[size] || 1)}px`;
  };
  const rightSideSections = ["Technical Skills", "Soft Skills", "Languages"];
  const leftSections = addedSections?.filter(
    (section: any) => !rightSideSections.includes(section?.name)
  );
  const rightSections = addedSections?.filter((section: any) =>
    rightSideSections.includes(section?.name)
  );


  const handleEditableSection = () => {
    setEditable(true);
    dispatch(sectionEditMode(true));
  };
  const handleEditableSectionHeader = () => {
    setHeaderEditable(true);
    dispatch(sectionEditMode(true));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setEditable(false);
        dispatch(sectionEditMode(false));
      }
      if (
        containerHeaderRef.current &&
        !containerHeaderRef.current.contains(event.target as Node)
      ) {
        setHeaderEditable(false);
        dispatch(sectionEditMode(false));
        dispatch(
          addUserHeader({
            sectionId: 1,
            detail: headerData,
          })
        );
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editable, headerData]);

  // rearrange
  useEffect(() => {
    dispatch(setList(rightSideSections));
    dispatch(setColumn(true));
  }, [addedSections]);

  const handleChangeHeader = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "name" | "designation"
  ) => {
    const value = e.target.value;
    setHeaderData((prev) => ({ ...prev, [key]: value }));
  };

  // Step 1: Measure section heights
  useEffect(() => {
    if (measured) return;

    const heights = sectionRefs.current.map((el) =>
      el ? el.getBoundingClientRect().height : 0
    );

    const newPages: any[][] = [];
    let currentPage: any[] = [];
    let currentHeight = 0;

    leftSections.forEach((section: any, i: any) => {
      const height = heights[i];
      if (currentHeight + height > A4_HEIGHT_PX && currentPage.length > 0) {
        newPages.push(currentPage);
        currentPage = [section];
        currentHeight = height;
      } else {
        currentPage.push(section);
        currentHeight += height;
      }
    });

    if (currentPage.length > 0) newPages.push(currentPage);

    setPages(newPages);
    setMeasured(true);
  }, [leftSections, measured]);


  useEffect(() => {
    const leftSec = leftRef.current?.getBoundingClientRect().bottom;
   const waterSec = watermarkRef.current?.getBoundingClientRect().top;
  const checkOverflowAndGrow = () => {
  if(leftSec!> waterSec!){
    setContainerHeight(prev=>prev+containerHeight)
  }  
  
  };

  // Give DOM time to render before measuring
  const timeout = setTimeout(checkOverflowAndGrow, 100);

  return () => clearTimeout(timeout);
}, [leftSections, rightSections]); // watch containerHeight too

  console.log(pages)
  return (
    <div
      className="resume-container"
      id="resume-content"
      style={{
        padding: `${currentState.padding || 0}px`,
        backgroundColor: editMode ? templateBgColor : undefined,
        transition: "background-color 0.3s ease-in-out",
      }}
    >

      <div style={{ minHeight: `${containerHeight}mm`, width: "210mm" }} className={`relative grid grid-cols-12 shadow-xl ${!editMode && "bg-white"} `}>
        {/* Left Column */}
       
        <div className="col-span-8  pr-8" style={{ padding: "30px" ,  height: "297mm" }} >
          {/* Header */}
          <div
            ref={containerHeaderRef}
            className={`flex flex-col ${headerEditable && "bg-white"}`}
            onClick={handleEditableSectionHeader}
          >
            <input
              name="name"
              placeholder="Name"
              value={headerData.name}
              onChange={(e) => handleChangeHeader(e, "name")}
              className="outline-none bg-transparent font-semibold text-zinc-900"
              style={{
                fontSize: scaleFont(30, currentState.fontSize),
                fontFamily: currentState.fontFamily,
              }}
            />
            <input
              name="designation"
              value={headerData.designation}
              placeholder="Designation"
              onChange={(e) => handleChangeHeader(e, "designation")}
              className="w-full rounded bg-transparent placeholder:text-lg focus:outline-none focus:ring-0 focus:border-0"
              style={{
                fontSize: scaleFont(18, currentState.fontSize),
                fontFamily: currentState.fontFamily,
                color: currentState.color,
              }}
            />
          </div>
 <div className="border" ref={leftRef}>
          {/* Left Sections */}
          {leftSections?.length > 0 ? (
            leftSections.map((section: any, index: number) => (
              <div key={index} className="pt-4 relative section-to-break">
                <div className="border-b">
                  {section?.name === "Custom Section" ? (
                    <div
                      ref={containerRef}
                      className={`flex flex-col pt-2 ${editable && "bg-white"}`}
                      onClick={handleEditableSection}
                    >
                      <input
                        type="text"
                        className="text-lg bg-transparent focus:outline-none font-semibold mb-1"
                        style={{ color: currentState.color }}
                        value={secName}
                        onChange={(e) =>
                          HandleChangeSectionName(e.target.value)
                        }
                      />
                    </div>
                  ) : (
                    <h2
                      className="text-lg font-semibold "
                      style={{ color: currentState.color }}
                      dangerouslySetInnerHTML={{
                        __html: highlightChange(section?.newSecName || section?.name),
                      }}
                    />
                  )}
                </div>
                <div className="">{renderSection(section)}</div>
              </div>
            ))
          ) : (
            <p>No sections added yet.</p>
          )}
          <div ref={watermarkRef} className="absolute left-0 bottom-14 border w-full" />
          <Watermark />
          {loading && (
            <p className="text-gray-500 mt-4">
              Checking for spelling/grammar errors...
            </p>
          )}
        </div>
        </div>

        {/* Right Column */}
        <div
          className="col-span-4 px-2  z-10"
          style={{ backgroundColor: currentState.color,height: `${containerHeight}mm` }}
        >
          {/* Profile Image */}
          <div className="p-3 py-12">
            <TemplateProfileImg
            // bgColor={currentState.color}
            />

            {/* Contact Info */}
            <div className="flex flex-col gap-2">
              <div
                className="text-start text-white flex items-center gap-2"
                style={{
                  fontSize: scaleFont(24, currentState.fontSize),
                  fontFamily: currentState.fontFamily,
                }}
              >
                <span className="text-xl">Contact Info</span>
              </div>
              <hr className="-mt-1" />
              {[
                { name: "Phone", icon: <Phone size={16} /> },
                { name: "Email", icon: <Mail size={16} /> },
              ].map((placeholder, idx) => (
                <div key={idx} className="flex items-center gap-2  text-white">
                  <div className="self-center  ">{placeholder.icon}</div>
                  <input
                    placeholder={placeholder.name}
                    className="w-full  placeholder:opacity-70 text-sm placeholder-white outline-none   focus:bg-transparent bg-transparent"
                  />
                </div>
              ))}
              <div className="flex items-start gap-2 text-white">
                <BookUser
                  size={16}
                  className=" self-center "
                />
                <input
                  placeholder="Address"
                  className="w-full placeholder:opacity-70 text-sm placeholder-white outline-none focus:bg-transparent bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Right Sections */}
          <div className="p-3">
            {rightSections?.length > 0 &&
              rightSections.map((section: any, index: number) => (
                <div key={index} className="pt-4 relative section-to-break">
                  <div className="border-b text-white">
                    {section?.name === "Custom Section" ? (
                      <div
                        ref={containerRef}
                        className={`flex flex-col pt-2 ${editable && "bg-white"
                          }`}
                        onClick={handleEditableSection}
                      >
                        <input
                          type="text"
                          className="text-lg bg-transparent focus:outline-none font-semibold mb-1"
                          style={{ color: currentState.color }}
                          value={secName}
                          onChange={(e) =>
                            HandleChangeSectionName(e.target.value)
                          }
                        />
                      </div>
                    ) : (
                      <h2 className="text-lg font-semibold mb-1"
                        dangerouslySetInnerHTML={{
                          __html: highlightChange(section?.newSecName || section?.name),
                        }}
                      />
                    )}
                  </div>
                  <div className="">{renderSection(section)}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template1;
