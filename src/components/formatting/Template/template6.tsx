"use client";
// ============
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
// ============
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setProfileImage } from "@/redux/slices/profileImageSlice";
import { setColumn, setList } from "@/redux/slices/rearrangeSlice";
import { addUserHeader, hideTemplateIcons, hideTemplateProfile, sectionEditMode, sectionShowIcons, sectionShowProfile } from "@/redux/slices/addSectionSlice";
// ============
import * as FaIcons from "react-icons/fa";
import { BookUser, Mail, Phone } from "lucide-react";
// ============
import placeHolderImg from "media/assets/reusme_placeholder_image.webp";
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
import IconDropdown from "../icon-dropdown/IconDropdown";
import AllCustomSection from "../all-sections/sections-details/AllCustomSections";
import Logo from "media/assets/logo_resume_white.svg";
import Watermark from "@/components/common/watermark/watermark";
import { placeHolderImage } from "@/constant/placeholder-image-base64";
import EditableField from "@/components/editor/editable-field";
const A4_HEIGHT_PX = 1122;
const PAGE_PADDING = 60; // adjust based on your layout padding

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

const Template6 = ({ currentState, updateState }: ResumePreviewProps) => {
  const dispatch = useDispatch();
  const { addedSections, sectionBgColor, editMode, showProfile, showIcons } = useSelector(
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
  const [headerData, setHeaderData] = useState({ name: "", designation: "" });
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [measured, setMeasured] = useState(false);
  //============= all sections
  const getAllText = () => {
    return addedSections
      ?.map((section: any) => {
        if (typeof section?.content === "string") return section.content;
        if (Array.isArray(section?.content)) {
          return section.content
            .map((item: any) => Object.values(item).join(" "))
            .join(" ");
        }
        return "";
      })
      .join("\n");
  };

  useEffect(() => {
    setSecName("Custom Section");
  }, []);

  const [pages, setPages] = useState<any[][]>([]);
  const HandleChangeSectionName = (data: any) => {
    console.log(data);
    setSecName(data);
  };
  const fullText = getAllText();

  // ===================
  useEffect(() => {
    setTemplateBgColor(sectionBgColor);
  }, [editMode, sectionBgColor]);

  //============= improve text logic
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
  const highlightWords = (text: string) => {
    return text.split(/\s+/).map((word, index) => {
      const cleaned = word.replace(/[.,!?]/g, "").toLowerCase();
      const isSpellingMistake = spellCheck && incorrectWords.includes(cleaned);
      const isGrammarMistake = grammarCheck && grammarErrors.includes(cleaned);

      return (
        <span
          key={index}
          className={`${isSpellingMistake ? "text-red-500" : ""}
                        ${isGrammarMistake ? "bg-blue-200 underline" : ""}`}
        >
          {word}{" "}
        </span>
      );
    });
  };

  // ========== Render Sections
  const renderSection = (section: any) => {
    switch (section?.name) {
      case "Summary":
        return <AllSummary data={section} />;
      case "Soft Skills":
        return (
          <AllSoftSkills
            data={section}
            textColor=""
            textAltColor="#000"
            templateColor="#000"
            dotPosition="hidden"
            headerPosition="-top-[30px] -left-[50px]"
            isVerticleHeader={true}
            isDot={false}
          />
        );
      case "Technical Skills":
        return (
          <AllTechnicalSkills
            data={section}
            textColor=""
            textAltColor="#000"
            templateColor="#000"
            dotPosition="hidden"
            headerPosition="-top-[30px] -left-[50px]"
            isVerticleHeader={true}
            isDot={false}
          />
        );
      case "Certificate":
        return <AllCertificates data={section}
          fontSize={scaleFont(16, currentState.fontSize)}
          fontFamily={currentState.fontFamily}
          headerPosition="top-[30px] -left-[50px]"
          textEditorPosition='top-1 right-0'
          isVerticleHeader={true}
          isDot={false}
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
            term2={true}
            headerPosition="top-[30px] -left-[50px]"
            textEditorPosition='top-1 right-0'
            isVerticleHeader={true}
            isDot={false}
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
            term2={true}
            headerPosition="top-[30px] -left-[50px]"
            textEditorPosition='top-1 right-0'
            isVerticleHeader={true}
            isDot={false}
          />
        );
      case "Projects":
        return (
          <AllProjects
            data={section}
            textColor=""
            textAltColor=""
            templateColor=""
            term2={true}
            headerPosition="top-[30px] -left-[50px]"
            textEditorPosition='top-1 right-0'
            isVerticleHeader={true}
            isDot={false}
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
            headerPosition="top-[30px] -left-[50px]"
            textEditorPosition='top-1 right-0'
            isVerticleHeader={true}
            isDot={false}
          />
        );
      case "References":
        return (
          <AllReferences
            data={section}
            textColor="#000"
            templateColor={currentState.color}
            textAltColor={currentState.color}
            headerPosition="top-[30px] -left-[50px]"
            textEditorPosition='top-1 right-0'
            isVerticleHeader={true}
            isDot={false}
          />
        );
      case "Languages":
        return (
          <AllLanguages
            data={section}
            textColor="#000"
            templateColor="#3358c5"
            // editableAltBG="bg-gray-900/80"
            fontSize={scaleFont(16, currentState.fontSize)}
            fontFamily={currentState.fontFamily}
            headerPosition="-top-[30px] -left-[50px]"
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
            headerPosition="top-[30px] -left-[50px]"
            textEditorPosition='top-1 right-0'
            isVerticleHeader={true}
            isDot={false}
          />
        );
      default:
        return <p>{highlightWords(section?.content || "")}</p>;
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
  const rightSideSections = ["Summary", "Certificate", "References", "Awards", "Custom Section"];
  const leftSections = addedSections?.filter(
    (section: any) => !rightSideSections.includes(section?.name)
  );
  const rightSections = addedSections?.filter((section: any) =>
    rightSideSections.includes(section?.name)
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageSrc = useSelector((state: RootState) => state.profileImage.image);
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          // dispatch(setProfileImage(reader.result));
          dispatch(setProfileImage({
            image: reader.result,
            scale: 1,
            position: { x: 0, y: 0 },
            rotation: 0,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
    dispatch(hideTemplateIcons(true))
    dispatch(hideTemplateProfile(true))
  }, [showProfile, showIcons]);

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

      <div style={{ minHeight: "297mm", width: "210mm" }} className="relative  shadow-xl p-[30px]">
        <div className="grid grid-cols-12">
          {/* Header Left Column */}
          <div className="col-span-8 py-[15px]  border" >
            <div
              ref={containerHeaderRef}
              className={`flex flex-col ${headerEditable && "bg-white"}`}
              onClick={handleEditableSectionHeader}
            >
              <EditableField
                html={headerData.name}
                onChange={(e: any) => handleChangeHeader(e, "name")}
                placeholder="Name"
                style={{
                  fontSize: scaleFont(25, currentState.fontSize),
                  fontFamily: currentState.fontFamily,
                }}
                className="bg-transparent"
              />
              <EditableField
                html={headerData.designation}
                onChange={(e: any) => handleChangeHeader(e, "designation")}
                placeholder="designation"
                style={{
                  fontSize: scaleFont(18, currentState.fontSize),
                  fontFamily: currentState.fontFamily,
                }}
                className="bg-transparent"
              />
              <div className="flex flex-wrap gap-y-2 pt-2">
                {[
                  { name: "Phone", icon: <Phone size={16} /> },
                  { name: "Email", icon: <Mail size={16} /> },
                ].map((placeholder, idx) => (
                  <div key={idx} className="flex items-center gap-2  text-black w-[50%]">
                    <div className="self-center  ">{placeholder.icon}</div>
                    <input
                      placeholder={placeholder.name}
                      className="w-full  placeholder:opacity-70 text-sm placeholder-black outline-none   focus:bg-transparent bg-transparent"
                    />
                  </div>
                ))}
                <div className="flex items-start gap-2 text-black w-full ">
                  <BookUser
                    size={16}
                    className=" self-center "
                  />
                  <input
                    placeholder="Address"
                    className="w-full placeholder:opacity-70 text-sm placeholder-black outline-none focus:bg-transparent bg-transparent"
                  />
                </div>
              </div>
            </div>


          </div>

          {/* Header Right Column */}
          <div className="col-span-4 border">
            {/* Profile Image */}
            <div className="px-3  ">
              <div className="flex justify-center w-40 h-40 mx-auto rounded-full overflow-hidden cursor-pointer">

                <Image
                  src={imageSrc || placeHolderImage}
                  alt="Profile"
                  width={160}
                  height={160}
                  className="w-full"
                  onClick={handleImageClick}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="col-span-6 ">
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
                      >
                        {highlightWords(section?.newSecName || section?.name)}
                      </h2>
                    )}
                  </div>
                  <div className="">{renderSection(section)}</div>
                </div>
              ))
            ) : (
              <p>No sections added yet.</p>
            )}
            <Watermark />
            {loading && (
              <p className="text-gray-500 mt-4">
                Checking for spelling/grammar errors...
              </p>
            )}
          </div>
          {/* Right Column */}
          <div className="col-span-6 ">
            {/* Right Sections */}
            {rightSections?.length > 0 &&
              rightSections.map((section: any, index: number) => (
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
                      >
                        {highlightWords(section?.newSecName || section?.name)}
                      </h2>
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

export default Template6;
