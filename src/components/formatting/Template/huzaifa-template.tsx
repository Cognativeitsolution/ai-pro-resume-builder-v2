"use client";
// ============
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
// ============
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setProfileImage } from "@/redux/slices/profileImageSlice";
import { setColumn, setList } from "@/redux/slices/rearrangeSlice";
import { addUserHeader, sectionEditMode } from "@/redux/slices/addSectionSlice";
// ============
import { BookUser, Mail, Phone } from "lucide-react";
// ============
import AllSummary from "../all-sections/sections-details-copy/AllSummary";
import AllCertificates from "../all-sections/sections-details-copy/AllCertificates";
import AllEducations from "../all-sections/sections-details-copy/AllEducations";
import AllExperiences from "../all-sections/sections-details-copy/AllExperiences";
import AllProjects from "../all-sections/sections-details-copy/AllProjects";
import AllSoftSkills from "../all-sections/sections-details-copy/AllSoftSkills";
import AllLanguages from "../all-sections/sections-details-copy/AllLanguages";
import AllTechnicalSkills from "../all-sections/sections-details-copy/AllTechnicalSkills";
import AllAwards from "../all-sections/sections-details-copy/AllAwards";
import AllReferences from "../all-sections/sections-details-copy/AllReferences";
import AllCustomSection from "../all-sections/sections-details-copy/AllCustomSections";
import Watermark from "@/components/common/watermark/watermark";
import TemplateProfileImg from "@/components/profileImg/TemplateProfileImg";

type CurrentState = {
  fontSize: any;
  fontFamily: string;
  fontWeight: string;
  color: string;
  margin: number;
  padding: number;
  text: any;
};

type EducationDetail = {
  degree: string;
  schoolName: string;
  location: string;
};

type ExperienceDetail = {
  title: string;
  description: string;
  companyName: string;
  location: string;
};

type CertificationDetail = {
  description: string;
  institutionName: string;
  title: string;
};

type AwardDetail = {
  title: string;
};

type ReferenceDetail = {
  name: string;
  contact: string;
};

type CustomSectionDetail = {
  companyName: string;
  description: string;
  title: string;
  location: string;
  icon: string;
};

type ProjectDetail = {
  description: string;
  projectName: string;
  projectUrl: string;
  location: string;
};

type leftSection =
  | { id: 2; name: "Summary"; description: string }
  | { id: 3; name: "Education"; detail: EducationDetail[] }
  | { id: 4; name: "Experience"; detail: ExperienceDetail[] }
  | { id: 8; name: "Certificate"; detail: CertificationDetail[] }
  | { id: 9; name: "Awards"; detail: AwardDetail[] }
  | { id: 11; name: "References"; detail: ReferenceDetail[] }
  | { id: 12; name: "Custom Section"; detail: CustomSectionDetail[] }
  | { id: 5; name: "Projects"; detail: ProjectDetail[] };

type rightSection =
  | { name: "Summary"; description: string }
  | { name: "Education"; detail: EducationDetail[] }
  | { name: "Experience"; detail: ExperienceDetail[] }
  | { name: "Certificate"; detail: CertificationDetail[] }
  | { name: "Awards"; detail: AwardDetail[] }
  | { name: "References"; detail: ReferenceDetail[] }
  | { name: "Custom Section"; detail: CustomSectionDetail[] }
  | { name: "Projects"; detail: ProjectDetail[] };

type ResumePreviewProps = {
  currentState: CurrentState;
  updateState: (newState: CurrentState) => void;
};

type Page = {
  left: leftSection[];
  right: rightSection[];
};

const HuzaifaTemplate1 = ({
  currentState,
  updateState,
}: ResumePreviewProps) => {
  const dispatch = useDispatch();
  const { addedSections, sectionBgColor, editMode } = useSelector(
    (state: any) => state.addSection
  );
  const {
    userExperiences,
    userEducation,
    userCertificates,
    userSummary,
    userAwards,
    userReferences,
    userCustomSections,
    userSoft_Skills
  } = useSelector((state: RootState) => state.addSection);

  const { spellCheck, grammarCheck } = useSelector(
    (state: any) => state.ImproveText
  );
  const [incorrectWords, setIncorrectWords] = useState<string[]>([]);
  const [grammarErrors, setGrammarErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [secName, setSecName] = useState("");

const variantRefs = useRef<{ [pageIdx: number]: { [sectionIdx: number]: HTMLElement[] } }>({});

  const [templateBgColor, setTemplateBgColor] = useState<any>("");
  const [editable, setEditable] = useState<boolean>(false);
  const [headerEditable, setHeaderEditable] = useState<boolean>(false);
  const containerHeaderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [headerData, setHeaderData] = useState({ name: "", designation: "" });
  const sectionRefs = useRef<(HTMLDivElement | null)[][]>([]); // Refs for sections per page
  const watermarkRefs = useRef<(HTMLDivElement | null)[]>([]); // Refs for watermarks per page
  const [pages, setPages] = useState<Page[]>([
    {
      left: [],
      right: [],
    },
  ]);

// useEffect(() => {
//   sectionRefs.current = pages.map((page) =>
//     Array(page.left.length + page.right.length).fill(null)
//   );
//   watermarkRefs.current = Array(pages.length).fill(null);
// }, [pages]);

  const mapToSection = (section: any): leftSection => {
    switch (section.name) {
      case "Summary":
        return { id: 2, name: "Summary", description: section.description || "" };
      case "Education":
        return { id: 3, name: "Education", detail: [] };
      case "Experience":
        return { id: 4, name: "Experience", detail: [] };
      case "Certificate":
        return { id: 8, name: "Certificate", detail: [] };
      case "Awards":
        return { id: 9, name: "Awards", detail: [] };
      case "References":
        return { id: 11, name: "References", detail: [] };
      case "Custom Section":
        return { id: 12, name: "Custom Section", detail: [] };
      case "Projects":
        return { id: 5, name: "Projects", detail: [] };
      default:
        throw new Error("Unknown section type: " + section.name);
    }
  };

  const pushToPages = (addedSections: any[]) => {
    setPages((prevPages) => {
      const existingSectionNames = new Set(
        prevPages.flatMap((page) =>
          [...page.left, ...page.right].map((section) => section.name)
        )
      );

      const newSections = addedSections
        .filter((section) => !existingSectionNames.has(section.name))
        .map(mapToSection);

      if (newSections.length === 0) return prevPages;

      const updatedFirstPage = {
        ...prevPages[0],
        left: [...prevPages[0].left, ...newSections],
      };

      return [updatedFirstPage, ...prevPages.slice(1)];
    });
  };
  useEffect(() => {
    const pushAndCheckOverlap = () => {
      // Step 1: Push new sections to pages
      setPages((prevPages) => {
        const existingSectionNames = new Set(
          prevPages.flatMap((page) =>
            [...page.left, ...page.right].map((section) => section.name)
          )
        );

        const newSections = addedSections
          .filter((section: any) => !existingSectionNames.has(section.name))
          .map(mapToSection);

        if (newSections.length === 0) return prevPages;

        // Ensure we always have at least one page to add to
        const pagesToUpdate = prevPages.length > 0 ? [...prevPages] : [{ left: [], right: [] }];

        const updatedFirstPage = {
          ...pagesToUpdate[0],
          left: [...pagesToUpdate[0].left, ...newSections],
        };

        return [updatedFirstPage, ...pagesToUpdate.slice(1)];
      });

      // Step 2: Check for overlaps
      setPages((prevPages) => {
        let newPages = JSON.parse(JSON.stringify(prevPages)); // Deep copy to avoid direct mutation issues
        let hasOverlap = false;

        newPages.forEach((page:any, pageIndex:any) => {
          const watermark = watermarkRefs.current[pageIndex];
          if (!watermark) return;

          const pageContainer = watermark.parentElement?.parentElement;
          if (!pageContainer) return;

          const pageRect = pageContainer.getBoundingClientRect();
          const pageBottom = pageRect.bottom;
          const watermarkRect = watermark.getBoundingClientRect();
          const containerBottom = Math.min(watermarkRect.top, pageBottom);

          if (containerBottom === 0) {
            console.log("Watermark position not set for page", pageIndex);
            return;
          }

          let sectionsMovedInCurrentPage = false;

          // Check left column sections
          const currentLeftSections = [...newPages[pageIndex].left]; // Use the latest state of sections
          for (let i = 0; i < currentLeftSections.length; i++) {
            const sectionRef = sectionRefs.current[pageIndex]?.[i];
            console.log(sectionRef , "--------------->section ref all when"); // Keep for debugging if needed
            if (!sectionRef) continue;

            const sectionRect = sectionRef.getBoundingClientRect();
            const sectionBottom = sectionRect.bottom;

            if (sectionBottom > containerBottom) {
              console.log(
                `Overflow detected in left column, page ${pageIndex}, section ${currentLeftSections[i].name}`
              );
              const sectionsToMove = currentLeftSections.slice(i);
              newPages[pageIndex].left = currentLeftSections.slice(0, i); // Remove from current page

              if (pageIndex + 1 >= newPages.length) {
                newPages.push({ left: [], right: [] });
              }
              newPages[pageIndex + 1].left = [
                ...newPages[pageIndex + 1].left, // Keep existing sections on the next page
                ...sectionsToMove,
              ];
              sectionsMovedInCurrentPage = true;
              hasOverlap = true;
              break; // Stop checking left column for this page, as sections have been moved
            }
          }

          if (sectionsMovedInCurrentPage) {
            // If sections moved from left, it might affect the right column's position
            // or indicate the page is full. For simplicity in this logic, we move on.
            // If you have inter-column dependencies on the *same* page, you might need a more complex re-evaluation here.
            return;
          }


          // Check right column sections
          const currentRightSections = [...newPages[pageIndex].right]; // Use the latest state of sections
          for (let i = 0; i < currentRightSections.length; i++) {
            // Adjust index for right column sections if you store them sequentially in sectionRefs.
            // Assuming sectionRefs[pageIndex] contains all sections (left then right).
            const sectionRef = sectionRefs.current[pageIndex]?.[prevPages[pageIndex].left.length + i];
            if (!sectionRef) continue;

            const sectionRect = sectionRef.getBoundingClientRect();
            const sectionBottom = sectionRect.bottom;

            if (sectionBottom > containerBottom) {
              console.log(
                `Overflow detected in right column, page ${pageIndex}, section ${currentRightSections[i].name}`
              );
              const sectionsToMove = currentRightSections.slice(i);
              newPages[pageIndex].right = currentRightSections.slice(0, i); // Remove from current page

              if (pageIndex + 1 >= newPages.length) {
                newPages.push({ left: [], right: [] });
              }
              newPages[pageIndex + 1].right = [
                ...newPages[pageIndex + 1].right, // Keep existing sections on the next page
                ...sectionsToMove,
              ];
              hasOverlap = true;
              break; // Stop checking right column for this page
            }
          }
        });

        // FIX: Clean up empty pages unconditionally after all overlap checks and movements
        let cleanedPages = newPages.filter(
          (page:any) => page.left.length > 0 || page.right.length > 0
        );

        // Ensure there's always at least one page, even if it's empty
        if (cleanedPages.length === 0) {
          cleanedPages = [{ left: [], right: [] }];
        }

        // Only return the cleaned pages.
        // The `hasOverlap` flag can be used if you need to trigger a re-run
        // or for debugging, but the `setPages` itself should always reflect the cleaned state.
        // A deep comparison is more robust to prevent unnecessary renders,
        // but for now, returning `cleanedPages` directly is fine if rendering cost isn't prohibitive.
        // If no overlap happened and the pages are identical, React might optimize the re-render.
        return cleanedPages;
      });
    };

    // Run immediately after mount or when dependencies change
    // Using a setTimeout of 0 to ensure DOM is painted before measurement
    const timer = setTimeout(() => {
      pushAndCheckOverlap();
    }, 0);

    // Observe DOM changes
    // This is crucial for reacting to content size changes.
    const observer = new ResizeObserver((entries) => {
      // console.log("ResizeObserver triggered", entries); // Debugging
      // Only re-run if something relevant to our layout changed.
      // A simple check like `hasOverlap` can be used, or you can run `pushAndCheckOverlap` unconditionally.
      // Running it unconditionally is safer as it covers cases where content shrinks.
      pushAndCheckOverlap();
    });

    // Observe all section refs and watermark refs
    // Ensure that refs are consistently available before observing.
    // This might be tricky with dynamic content. You might need to re-observe
    // whenever pages/sections are added/removed.
    watermarkRefs.current.forEach((ref) => ref && observer.observe(ref));

    // Observe all currently rendered section elements
    sectionRefs.current.forEach((pageRefs) => {
      pageRefs?.forEach((ref) => ref && observer.observe(ref));
    });


    return () => {
      clearTimeout(timer);
      observer.disconnect();
      // Clear refs on unmount to prevent memory leaks, though not strictly necessary for simple cases.
      watermarkRefs.current = [];
      sectionRefs.current = [];
    };
  }, [addedSections, headerData, currentState.fontSize, secName]);
  useEffect(() => {
    pushToPages(addedSections);
  }, [addedSections]);

  useEffect(() => {
    setSecName("Custom Section");
  }, []);


useEffect(()=>{

  if(pages.length > 1){
    
  }
},[])

  const handleRemoveSection = (sectionToRemove: any, pageIndex: number) => {
    setPages((prevPages) => {
      const newPages = [...prevPages];
      const page = newPages[pageIndex];
      if (page) {
        page.left = page.left.filter((sec) => sec.name !== sectionToRemove);
        page.right = page.right.filter((sec) => sec.name !== sectionToRemove);
        return newPages;
      }
      return prevPages;
    });
  };

  const HandleChangeSectionName = (data: any) => {
    setSecName(data);
  };

  useEffect(() => {
    setTemplateBgColor(sectionBgColor);
  }, [editMode, sectionBgColor]);

  const getAllText = () => {
    return addedSections
      ?.map((section: any) => {
        if (section.name === "Education" && Array.isArray(section.detail)) {
          return section.detail
            .map((edu: any) =>
              [edu.degree, edu.schoolName, edu.location].filter(Boolean).join(" ")
            )
            .join(" ");
        }

        if (typeof section.description === "string") return section.description;

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

  const highlightWords = (text: string) => {
    return text?.split(/\s+/)?.map((word, index) => {
      const cleaned = word.replace(/[.,!?]/g, "").toLowerCase();
      const isSpellingMistake = spellCheck && incorrectWords.includes(cleaned);
      const isGrammarMistake = grammarCheck && grammarErrors.includes(cleaned);

      return (
        <span
          key={index}
          className={`${isSpellingMistake ? "text-red-500" : ""} ${
            isGrammarMistake ? "bg-blue-200 underline" : ""
          } `}
        >
          {word}{" "}
        </span>
      );
    });
  };

  const renderSection = (section: any, pageIndex: number, registerVariantRef?: (variantEl: HTMLElement, variantIndex: number) => void) => {
    switch (section?.name) {
      case "Summary":
        return (
          <AllSummary
            data={section}
            highlightSpellingMistakes={highlightWords}
          />
        );
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
            onRemove={() => handleRemoveSection(section.name, pageIndex)}
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
            onRemove={() => handleRemoveSection(section.name, pageIndex)}
          />
        );
      case "Certificate":
        return (
          <AllCertificates
            data={section}
            fontSize={scaleFont(16, currentState.fontSize)}
            fontFamily={currentState.fontFamily}
            term3={true}
            onRemove={() => handleRemoveSection(section.name, pageIndex)}
          />
        );
      case "Education":
        return (
          <AllEducations
            data={section}
            onRemove={() => handleRemoveSection(section.name, pageIndex)}
            registerVariantRef={registerVariantRef!}
            textColor=""
            textAltColor=""
            templateColor=""
            fontSize={scaleFont(16, currentState.fontSize)}
            fontFamily={currentState.fontFamily}
            term3={true}
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
            term3={true}
            onRemove={() => handleRemoveSection(section.name, pageIndex)}
          />
        );
      case "Projects":
        return (
          <AllProjects
            data={section}
            textColor=""
            textAltColor=""
            templateColor=""
            term3={true}
            onRemove={() => handleRemoveSection(section.name, pageIndex)}
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
            onRemove={() => handleRemoveSection(section.name, pageIndex)}
          />
        );
      case "References":
        return (
          <AllReferences
            data={section}
            textColor="#000"
            templateColor={currentState.color}
            textAltColor={currentState.color}
            onRemove={() => handleRemoveSection(section.name, pageIndex)}
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
            onRemove={() => handleRemoveSection(section.name, pageIndex)}
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
            term3={true}
            onRemove={() => handleRemoveSection(section.name, pageIndex)}
          />
        );
      default:
        return null;
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
      {pages?.map((section, idx) => (
        <div
          key={idx}
          style={{ height: "297mm", width: "210mm" }}
          className={`relative grid mb-4 grid-cols-12 shadow-xl ${!editMode && "bg-white"}`}
        >
          {/* Left Column */}
          <div className="col-span-8 pr-8 mb-14" style={{ padding: "30px" }}>
            {idx === 0 && (
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

            {section.left?.length > 0 ? (
              section.left.map((leftSec: any, index: number) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (!sectionRefs.current[idx]) {
                      sectionRefs.current[idx] = [];
                    }
                    sectionRefs.current[idx][index] = el;
                  }}
                  className="pt-4 relative section-to-break"
                >
                  <div className="border-b">
                    {leftSec?.name === "Custom Section" ? (
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
                          onChange={(e) => HandleChangeSectionName(e.target.value)}
                        />
                      </div>
                    ) : (
                      <h2
                        className="text-lg font-semibold"
                        style={{ color: currentState.color }}
                      >
                        {highlightWords(leftSec?.newSecName || leftSec?.name)}
                      </h2>
                    )}
                  </div>
                  <div>{renderSection(leftSec, idx , (variantEl) => {
  if (!variantRefs.current[idx]) variantRefs.current[idx] = {};
  if (!variantRefs.current[idx][index]) variantRefs.current[idx][index] = [];
  variantRefs.current[idx][index].push(variantEl);
})}</div>
                </div>
              ))
            ) : (
              <p>No sections added yet.</p>
            )}
          <div
              ref={(el) => void(watermarkRefs.current[idx] = el)}
              style={{ position: "absolute", bottom: "10px", left: "30px", width: "calc(100% - 60px)" }}
            >
              <Watermark />
            </div>
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
            {idx== 0 && 
            <div className="p-3 py-12">
              <TemplateProfileImg />
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
                  <div key={idx} className="flex items-center gap-2 text-white">
                    <div className="self-center">{placeholder.icon}</div>
                    <input
                      placeholder={placeholder.name}
                      className="w-full placeholder:opacity-70 text-sm placeholder-white outline-none focus:bg-transparent bg-transparent"
                    />
                  </div>
                ))}
                <div className="flex items-start gap-2 text-white">
                  <BookUser size={16} className="self-center" />
                  <input
                    placeholder="Address"
                    className="w-full placeholder:opacity-70 text-sm placeholder-white outline-none focus:bg-transparent bg-transparent"
                  />
                </div>
              </div>
            </div>
            }

            <div className="p-3">
              {section.right?.length > 0 &&
                section.right.map((rightSec: any, index: number) => (
                  <div
                    key={index}
                    ref={(el) => {
                      if (!sectionRefs.current[idx]) {
                        sectionRefs.current[idx] = [];
                      }
                      sectionRefs.current[idx][section.left.length + index] = el;
                    }}
                    className="pt-4 relative section-to-break"
                  >
                    <div className="border-b text-white">
                      {rightSec?.name === "Custom Section" ? (
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
                            onChange={(e) => HandleChangeSectionName(e.target.value)}
                          />
                        </div>
                      ) : (
                        <h2 className="text-lg font-semibold mb-1">
                          {highlightWords(rightSec?.newSecName || rightSec?.name)}
                        </h2>
                      )}
                    </div>
                    <div>{renderSection(rightSec, idx)}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HuzaifaTemplate1;