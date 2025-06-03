"use client";
// ============
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
// ============
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setProfileImage } from "@/redux/slices/profileImageSlice";
import { setColumn, setList } from "@/redux/slices/rearrangeSlice";
import { addUserHeader, sectionEditMode } from "@/redux/slices/addSectionSlice";
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

import Watermark from "@/components/common/watermark/watermark";
import { placeHolderImage } from "@/constant/placeholder-image-base64";

const A4_HEIGHT_PX = 1400; // A4 height in pixels (approx. at 96 DPI)
const PAGE_PADDING = 60; // adjust based on your layout padding
const CONTENT_HEIGHT_PER_PAGE = A4_HEIGHT_PX  ;
// Define a type for a page
type Page = {
  left: any[];
  right: any[];
  currentLeftHeight: number;
  currentRightHeight: number;
};
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

const Template1Copy = ({ currentState, updateState }: ResumePreviewProps) => {
  const dispatch = useDispatch();
  const { addedSections, sectionBgColor, editMode } = useSelector(
    (state: any) => state.addSection
  );

   const endPageRef = useRef<HTMLDivElement>(null)
console.log(currentState.fontSize)
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
  const [pages, setPages] = useState<any[]>([]);

  const getAllText = useCallback(() => {
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
  }, [addedSections]);

  useEffect(() => {
    setSecName("Custom Section");
  }, []);

  const HandleChangeSectionName = (data: any) => {
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
          className={`
           ${isSpellingMistake ? "text-red-500" : ""}  
           ${isGrammarMistake ? "bg-blue-200 underline" : ""}
                    `}
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
            textColor="#fff"
            textAltColor="#000"
            templateColor="#fff"
            editableAltBG="bg-gray-900/80"
            isPillStyle={true}
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
          />
        );
      case "Certificate":
        return <AllCertificates data={section} />;
      case "Education":
        return (
          <AllEducations
            data={section}
            textColor=""
            textAltColor=""
            templateColor=""
          />
        );
      case "Experience":
        return (
          <AllExperiences
            data={section}
            textColor=""
            textAltColor=""
            templateColor=""
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
          />
        );
      case "Custom Section":
        return (
          <AllCustomSection
            secNewNames={secName}
            data={section}
            textColor="#000"
            templateColor="#fff"
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

  const rightSideSections = ["Technical Skills", "Soft Skills", "Languages"];
  const leftSections = useMemo(() => {
    return addedSections?.filter(
      (section: any) => !rightSideSections.includes(section?.name)
    );
  }, [addedSections]);

  const rightSections = useMemo(() => {
    return addedSections?.filter(
      (section: any) => rightSideSections.includes(section?.name)
    );
  }, [addedSections]);

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
          dispatch(setProfileImage(reader.result));
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

useEffect(() => {
  const generatePages = () => {
    const newPages: Page[] = [];
    let currentPage: Page = {
      left: [],
      right: [],
      currentLeftHeight: 0,
      currentRightHeight: 0,
    };
    newPages.push(currentPage);

    // Estimate header height (only on the first page)
    const estimatedHeaderHeight = 100; // Adjust as needed, measure this accurately
    if (newPages.length === 1) {
      // Assuming header is in the left column or spans both but contributes to left's height for pagination
      currentPage.currentLeftHeight += estimatedHeaderHeight;
    }

    // Function to get estimated section height (REPLACE WITH ACTUAL MEASUREMENT)
    const getSectionHeight = (section: any) => {
      // IMPORTANT: In a real application, you'd use a more accurate measurement
      // (e.g., rendering off-screen and measuring with refs).
      // These are placeholders. Adjust these values to better reflect your content.
      if (section.name === "Summary") return 150;
      if (section.name === "Experience" || section.name === "Education" || section.name === "Projects") return 250;
      if (section.name === "Technical Skills" || section.name === "Soft Skills" || section.name === "Languages") return 120;
      if (section.name === "Awards" || section.name === "References") return 100;
      if (section.name === "Custom Section") return 150;
      return 100; 
    };

    // Combine all sections, preserving their original order and column assignment
    const allSections = addedSections.map((section: any) => ({
      ...section,
      estimatedHeight: getSectionHeight(section),
      // Assign target column for easier processing
      targetColumn: rightSideSections.includes(section?.name) ? 'right' : 'left',
    }));

    // Temporary storage for sections that couldn't fit on the current page
    let remainingLeftSections = [...leftSections];
    let remainingRightSections = [...rightSections];

    // Loop until all sections are placed
    while (remainingLeftSections.length > 0 || remainingRightSections.length > 0) {
      let pageToFill = newPages[newPages.length - 1];

      let sectionAddedToCurrentPage = false;

      // First, try to fill the left column as much as possible
      for (let i = 0; i < remainingLeftSections.length; i++) {
        const section = remainingLeftSections[i];
        const sectionHeight = getSectionHeight(section);

        if (pageToFill.currentLeftHeight + sectionHeight <= CONTENT_HEIGHT_PER_PAGE) {
          pageToFill.left.push(section);
          pageToFill.currentLeftHeight += sectionHeight;
          remainingLeftSections.splice(i, 1); // Remove section after adding
          i--; // Adjust index because we removed an element
          sectionAddedToCurrentPage = true;
        } else {
          // Can't fit this left section, break and move to right or new page
          break;
        }
      }

      // Then, try to fill the right column with its designated sections
      for (let i = 0; i < remainingRightSections.length; i++) {
        const section = remainingRightSections[i];
        const sectionHeight = getSectionHeight(section);

        if (pageToFill.currentRightHeight + sectionHeight <= CONTENT_HEIGHT_PER_PAGE) {
          pageToFill.right.push(section);
          pageToFill.currentRightHeight += sectionHeight;
          remainingRightSections.splice(i, 1); // Remove section after adding
          i--; // Adjust index because we removed an element
          sectionAddedToCurrentPage = true;
        } else {
          // Can't fit this right section, break and move to a new page
          break;
        }
      }

      // If no sections were added to the current page in this iteration (meaning both columns are full
      // or the remaining sections are too large for the current page), create a new page.
      if (!sectionAddedToCurrentPage && (remainingLeftSections.length > 0 || remainingRightSections.length > 0)) {
        currentPage = {
          left: [],
          right: [],
          currentLeftHeight: 0,
          currentRightHeight: 0,
        };
        newPages.push(currentPage);
      } else if (remainingLeftSections.length === 0 && remainingRightSections.length === 0) {
        // All sections placed, exit loop
        break;
      }
    }
    setPages(newPages);
  };

  generatePages();
}, [addedSections, headerData]); // Regenerate pages when sections or header data change


const paginatedFunction = () =>{

}
  return (
    <div
      className="resume-container flex flex-col  items-center "
      id="resume-content"
      style={{
        padding: `${currentState.padding || 0}px`,
        backgroundColor: editMode ? templateBgColor : undefined,
        transition: "background-color 0.3s ease-in-out",
        
      }}
    >
      {pages.map((page, pageIndex) => (
        <div
        id={`page-${pageIndex}`}
          key={pageIndex}
          className={`relative  grid grid-cols-12 mb-8 overflow-x-hidden  shadow-xl  ${!editMode && "bg-white"} `}
          style={{ height: "297mm", width: "210mm", pageBreakAfter: "always" }}
        >
          {/* Left Column */}
          <div className="col-span-8 pr-8" style={{ padding: "30px" }}>
            {/* Header (only on the first page, or if specific header per page is desired) */}
            {pageIndex === 0 && (
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
            )}
            {/* Left Sections */}
            {page.left?.length > 0 ? (
              page.left.map((section: any, index: number) => (
                <div key={`${pageIndex}-left-${index}`} className="pt-4 relative section-to-break">
                  <div className="border-b">
                    {section?.name === "Custom Section" ? (
                      <div
                        ref={containerRef}
                        className={`flex flex-col pt-2 ${
                          editable && "bg-white"
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
              pageIndex === 0 && <p>No sections added yet.</p> // Only show message on first page
            )}
              <div ref={endPageRef} ></div>
            <Watermark />
            {loading && (
              <p className="text-gray-500 mt-4">
                Checking for spelling/grammar errors...
              </p>
            )}
          </div>

          {/* Right Column */}
          <div
            className="col-span-4 px-2 z-10"
            style={{ backgroundColor: currentState.color, height: "297mm" }}
          >
            {/* Profile Image (only on the first page) */}
            {pageIndex === 0 && (
              <div className="p-3 py-12">
                <div className="flex justify-center mb-6 w-40 h-40 mx-auto rounded-full overflow-hidden cursor-pointer">
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
                  <hr className="" />
                  {[
                    { name: "Phone", icon: <Phone size={16} /> },
                    { name: "Email", icon: <Mail size={16} /> },
                  ].map((placeholder, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-white"
                    >
                      <div className="self-center ">{placeholder.icon}</div>
                      <input
                        placeholder={placeholder.name}
                        className="w-full placeholder:opacity-70 text-sm placeholder-white outline-none focus:bg-transparent bg-transparent"
                      />
                    </div>
                  ))}
                  <div className="flex items-start gap-2 text-white">
                    <BookUser size={16} className=" self-center " />
                    <input
                      placeholder="Address"
                      className="w-full placeholder:opacity-70 text-sm placeholder-white outline-none focus:bg-transparent bg-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Right Sections */}
            <div className="p-3">
              {page.right?.length > 0 &&
                page.right.map((section: any, index: number) => (
                  <div key={`${pageIndex}-right-${index}`} className="pt-4 relative section-to-break">
                    <div className="border-b text-white">
                      {section?.name === "Custom Section" ? (
                        <div
                          ref={containerRef}
                          className={`flex flex-col pt-2 ${
                            editable && "bg-white"
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
                        <h2 className="text-lg font-semibold mb-1">
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
      ))}
    </div>
  );
};

export default Template1Copy;