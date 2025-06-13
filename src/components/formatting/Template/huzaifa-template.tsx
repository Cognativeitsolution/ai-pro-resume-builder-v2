"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setColumn, setList } from "@/redux/slices/rearrangeSlice";
import { addUserHeader, sectionEditMode } from "@/redux/slices/addSectionSlice";
import { BookUser, Mail, Phone } from "lucide-react";
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
import { RootState } from "@/redux/store";
import { addSectionToPage, addVariantToSection, removeSectionFromPage, removeVariantFromSection, setPages } from "@/redux/slices/pageSlice";
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
  | { id: 6; name: "Soft Skills"; detail: any[] }
  | { id: 7; name: "Technical Skills"; detail: any[] }
  | { id: 10; name: "Languages"; detail: any[] };

type ResumePreviewProps = {
  currentState: CurrentState;
  updateState: (newState: CurrentState) => void;
};
type ResumeSection = {
  id: number;
  name: string;
  description?: string;
  detail?: any[];
};
type Page = {
  left: ResumeSection[];
  right: ResumeSection[];
};

const HuzaifaTemplate1 = ({ currentState }: ResumePreviewProps) => {
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
  const rightSideSections = ["Technical Skills", "Soft Skills", "Languages"];
  const variantRefs = useRef<{
    [pageIdx: number]: { [sectionIdx: number]: HTMLElement[] };
  }>({});

  const [templateBgColor, setTemplateBgColor] = useState<any>("");
  const [editable, setEditable] = useState<boolean>(false);
  const [headerEditable, setHeaderEditable] = useState<boolean>(false);
  const containerHeaderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [headerData, setHeaderData] = useState({ name: "", designation: "" });
  const leftRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightRef = useRef<(HTMLDivElement | null)[]>([]);
  const watermarkRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { pages } = useSelector((state: RootState) => state.pages); 
  const [activePageIndex, setActivePageIndex] = useState<number | null>(null);

  useEffect(() => {
    setSecName("Custom Section");
  }, []);

 const handleDelSection = (
  sectionToRemove: string,
  pageIndex: number,
  side: "left" | "right"
) => {
  setPages((prev) => {
    const updatedPages = [...prev];

    const page = updatedPages[pageIndex];
    if (!page) return prev;

    // 1. Remove the section
    const updatedSideSections = page[side].filter(
      (sec) => sec.name !== sectionToRemove
    );
    updatedPages[pageIndex] = {
      ...page,
      [side]: updatedSideSections,
    };

    // 2. Try pulling up section detail(s) from the next pages
    for (let i = pageIndex; i < updatedPages.length - 1; i++) {
      const currentPage = updatedPages[i];
      const nextPage = updatedPages[i + 1];
      if (!nextPage) break;

      const ref = side === "left" ? leftRef.current[i] : rightRef.current[i];
      const watermark = watermarkRefs.current[i];
      if (!ref || !watermark) continue;

      const currentBottom = ref.getBoundingClientRect().bottom;
      const watermarkTop = watermark.getBoundingClientRect().top;

      const hasSpace = watermarkTop - currentBottom > 50;
      if (!hasSpace) break;

      const fromSections = nextPage[side];
      const toSections = currentPage[side];

      const foundIdx = fromSections.findIndex(
        (sec) => Array.isArray(sec.detail) && sec.detail.length > 0
      );

      if (foundIdx === -1) break;

      const fromSec = fromSections[foundIdx];
      const toSecIdx = toSections.findIndex((sec) => sec.name === fromSec.name);

      if (fromSec?.detail?.length! > 1) {
        const movedDetail = fromSec?.detail?.shift(); // remove first variant

        if (toSecIdx !== -1) {
          toSections[toSecIdx].detail?.push(movedDetail);
        } else {
          toSections.push({
            ...fromSec,
            detail: [movedDetail],
          });
        }
      } else {
        // move the whole section
        if (toSecIdx !== -1) {
          toSections[toSecIdx].detail?.push(...fromSec?.detail!);
        } else {
          toSections.push(fromSec);
        }
        fromSections.splice(foundIdx, 1);
      }

      // Remove nextPage if it becomes empty
      const isEmpty =
        nextPage.left.length === 0 && nextPage.right.length === 0;
      if (isEmpty) {
        updatedPages.splice(i + 1, 1);
        break; // Stop after removal to avoid indexing issues
      }
    }

    // 3. Remove this page if it becomes empty and not the first page
    const isCurrentPageEmpty =
      updatedPages[pageIndex].left.length === 0 &&
      updatedPages[pageIndex].right.length === 0;
    if (pageIndex > 0 && isCurrentPageEmpty) {
      updatedPages.splice(pageIndex, 1);
    }

    return updatedPages;
  });
};

 const handleRemoveSection = (
  sectionToRemove: string,
  _pageIndex: number,
  side: "left" | "right"
) => {
  
  const prevPages = pages; 

  const newPages = prevPages.map((pg) => ({
    left: [...pg.left],
    right: [...pg.right],
  }));

  const removeOneOrSection = (sections: any[]) => {
    return sections
      .map((sec) => {
        if (sec.name !== sectionToRemove) return sec;
        if (Array.isArray(sec.detail) && sec.detail.length > 1) {
          return { ...sec, detail: sec.detail.slice(0, -1) };
        }
        return null;
      })
      .filter(Boolean);
  };

  const active = newPages[activePageIndex!];
  if (!active) return;

  if (side === "left") {
    active.left = removeOneOrSection(active.left);
  } else {
    active.right = removeOneOrSection(active.right);
  }

  for (let i = activePageIndex!; i < newPages.length - 1; i++) {
    const currentPage = newPages[i];
    const nextPage = newPages[i + 1];
    if (!currentPage || !nextPage) continue;

    const ref = side === "left" ? leftRef.current[i] : rightRef.current[i];
    const watermark = watermarkRefs.current[i];
    if (!ref || !watermark) continue;

    const currentBottom = ref.getBoundingClientRect().bottom;
    const watermarkTop = watermark.getBoundingClientRect().top;
    const hasSpace = watermarkTop > currentBottom;
    if (!hasSpace) break;

    const fromSections = nextPage[side];
    const toSections = currentPage[side];

    const foundIdx = fromSections.findIndex(
      (sec) => Array.isArray(sec.detail) && sec.detail.length > 0
    );
    if (foundIdx === -1) continue;

    const fromSec = fromSections[foundIdx];
    const toSecIdx = toSections.findIndex((sec) => sec.name === fromSec.name);

    if (fromSec.detail.length > 1) {
      const movedVariant = fromSec.detail[0];
      fromSec.detail = fromSec.detail.slice(1);

      if (toSecIdx !== -1) {
        toSections[toSecIdx].detail.push(movedVariant);
      } else {
        toSections.push({
          ...fromSec,
          detail: [movedVariant],
        });
      }
    } else {
      if (toSecIdx !== -1) {
        toSections[toSecIdx].detail.push(...fromSec.detail);
      } else {
        toSections.push(fromSec);
      }
      fromSections.splice(foundIdx, 1);
    }

    const nextLeftEmpty = nextPage.left.length === 0;
    const nextRightEmpty = nextPage.right.length === 0;
    if (nextLeftEmpty && nextRightEmpty) {
      newPages.splice(i + 1, 1);
    }
  }

  dispatch(setPages(newPages));
};

 
const handleAddVariantToSection = (secName: string, side: "left" | "right") => {

  const updatedPages = JSON.parse(JSON.stringify(pages)); 
  let sectionPageIndex = -1;
  let sectionIndex = -1;

  for (let i = 0; i < updatedPages.length; i++) {
    const page = updatedPages[i];
    const index = page[side].findIndex((sec:any) => sec.name === secName);
    if (index !== -1) {
      sectionPageIndex = i;
      sectionIndex = index;
    }
  }

  if (sectionPageIndex === -1 || sectionIndex === -1) return;

  const section = updatedPages[sectionPageIndex][side][sectionIndex];

  let newDetailItem: any = {};
  switch (secName) {
    case "Education":
      newDetailItem = { degree: "", schoolName: "", location: "" };
      break;
    case "Experience":
      newDetailItem = {
        title: "",
        description: "",
        companyName: "",
        location: "",
      };
      break;
    case "Certificate":
      newDetailItem = {
        description: "",
        institutionName: "",
        title: "",
      };
      break;
    case "Awards":
      newDetailItem = { title: "" };
      break;
    case "References":
      newDetailItem = { name: "", contact: "" };
      break;
    case "Custom Section":
      newDetailItem = {
        companyName: "",
        description: "",
        title: "",
        location: "",
        icon: "",
      };
      break;
    case "Projects":
      newDetailItem = {
        description: "",
        projectName: "",
        projectUrl: "",
        location: "",
      };
      break;
    default:
      newDetailItem = {};
  }

  section?.detail?.push(newDetailItem);

  const ref = side === "left" ? leftRef : rightRef;
  const pageRef = ref.current[sectionPageIndex]?.getBoundingClientRect();
  const watermarkTop =
    watermarkRefs.current[sectionPageIndex]?.getBoundingClientRect()?.top;

  const isOverflow =
    pageRef?.bottom && watermarkTop && pageRef.bottom + 100 > watermarkTop;

  if (isOverflow) {
    const nextPageIndex = sectionPageIndex + 1;
    if (!updatedPages[nextPageIndex]) {
      updatedPages[nextPageIndex] = { left: [], right: [] };
    }

    const currentPageSections = updatedPages[sectionPageIndex][side];
    const nextPageSections = updatedPages[nextPageIndex][side];

    const lastSection = currentPageSections[currentPageSections.length - 1];

    if (lastSection?.detail?.length > 1) {
      const movedDetail = lastSection.detail.pop();
      const nextPageSection = nextPageSections.find(
        (s:any) => s.name === lastSection.name
      );

      if (nextPageSection) {
        nextPageSection.detail.unshift(movedDetail);
      } else {
        nextPageSections.unshift({
          ...lastSection,
          detail: [movedDetail],
        });
      }
    } else {
      const removed = currentPageSections.pop();
      nextPageSections.unshift(removed!);
    }
  }

  dispatch(setPages(updatedPages));
};


const handleAddSectionToPages = (
  secName: string,
  _pageIndex: number,
  side: "left" | "right"
) => {


  let targetPageIndex = -1;
  for (let i = 0; i < pages.length; i++) {
    const ref = side === "left" ? leftRef.current[i] : rightRef.current[i];
    const watermark = watermarkRefs.current[i];
    if (!ref || !watermark) continue;

    const secBottom = ref.getBoundingClientRect()?.bottom;
    const watermarkTop = watermark.getBoundingClientRect()?.top;

    if (secBottom && watermarkTop && secBottom < watermarkTop) {
      targetPageIndex = i;
      break;
    }
  }

  if (targetPageIndex === -1) {
    targetPageIndex = pages.length;

    dispatch({
      type: 'pages/setPages',
      payload: [
        ...pages,
        { left: [], right: [] }
      ]
    });
  }

  pages.forEach((_, pageIndex) => {
    dispatch(removeSectionFromPage({
      sectionName: secName,
      pageIndex,
      side,
    }));
  });

  let newDetailItem: any = {};
  switch (secName) {
    case "Education":
      newDetailItem = { degree: "", schoolName: "", location: "" };
      break;
    case "Experience":
      newDetailItem = {
        title: "",
        description: "",
        companyName: "",
        location: "",
      };
      break;
    case "Certificate":
      newDetailItem = {
        description: "",
        institutionName: "",
        title: "",
      };
      break;
    case "Awards":
      newDetailItem = { title: "" };
      break;
    case "References":
      newDetailItem = { name: "", contact: "" };
      break;
    case "Custom Section":
      newDetailItem = {
        companyName: "",
        description: "",
        title: "",
        location: "",
        icon: "",
      };
      break;
    case "Projects":
      newDetailItem = {
        description: "",
        projectName: "",
        projectUrl: "",
        location: "",
      };
      break;
    default:
      newDetailItem = {};
  }

  const newSection = {
    id: Date.now(),
    name: secName,
    detail: [newDetailItem],
  };

  dispatch(addSectionToPage({
    section: newSection,
    pageIndex: targetPageIndex,
    side,
  }));
};


useEffect(() => {
  if (!addedSections?.length) return;

  const existingSectionNames = new Set(
    pages.flatMap((page) =>
      [...page.left, ...page.right].map((sec) => sec.name)
    )
  );

  const newSections = addedSections.filter(
    (section: any) => !existingSectionNames.has(section.name)
  );

  if (newSections.length === 0) return;

  newSections.forEach((section: any) => {
    const side = rightSideSections.includes(section.name) ? "right" : "left";
    const sectionData = {
      ...section,
      detail: Array.isArray(section.detail) ? section.detail : [],
    };

    dispatch(
      addSectionToPage({
        section: sectionData,
        pageIndex: 0,
        side,
      })
    );
  });
}, [addedSections, pages, dispatch]);



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
              [edu.degree, edu.schoolName, edu.location]
                .filter(Boolean)
                .join(" ")
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

  const renderSection = (
    section: leftSection | rightSection,
    pageIndex: number,
 
  ) => {
   
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
            onAddVar={() => handleAddVariantToSection(section.name, "right")}
            onAdd={() =>
              handleAddSectionToPages(section.name, pageIndex, "right")
            }
            onDelete={() => handleDelSection(section.name, pageIndex, "right")}
            isDot={false}
            onRemove={() =>
              handleRemoveSection(section.name, pageIndex, "right")
            }
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
            onAddVar={() => handleAddVariantToSection(section.name, "right")}
            onAdd={() =>
              handleAddSectionToPages(section.name, pageIndex, "right")
            }
            onDelete={() => handleDelSection(section.name, pageIndex, "right")}
            isDot={false}
            onRemove={() =>
              handleRemoveSection(section.name, pageIndex, "right")
            }
          />
        );
      case "Certificate":
        return (
          <AllCertificates
            data={section}
            fontSize={scaleFont(16, currentState.fontSize)}
            fontFamily={currentState.fontFamily}
            onAdd={() =>
              handleAddSectionToPages(section.name, pageIndex, "left")
            }
            onAddVar={() => handleAddVariantToSection(section.name, "left")}
            onDelete={() => handleDelSection(section.name, pageIndex, "left")}
            term3={true}
            onRemove={() =>
              handleRemoveSection(section.name, pageIndex, "left")
            }
          />
        );
      case "Education":
        return (
          <AllEducations
            data={section}
            onRemove={() =>
              handleRemoveSection(section.name, pageIndex, "left")
            }
            onAddVar={() => handleAddVariantToSection(section.name, "left")}
            onAdd={() =>
              handleAddSectionToPages(section.name, pageIndex, "left")
            }
            onDelete={() => handleDelSection(section.name, pageIndex, "left")}
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
            onAddVar={() => handleAddVariantToSection(section.name, "left")}
            onAdd={() =>
              handleAddSectionToPages(section.name, pageIndex, "left")
            }
            onDelete={() => handleDelSection(section.name, pageIndex, "left")}
            fontFamily={currentState.fontFamily}
            term3={true}
            onRemove={() =>
              handleRemoveSection(section.name, pageIndex, "left")
            }
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
            onAddVar={() => handleAddVariantToSection(section.name, "left")}
            onAdd={() =>
              handleAddSectionToPages(section.name, pageIndex, "left")
            }
            onDelete={() => handleDelSection(section.name, pageIndex, "left")}
            onRemove={() =>
              handleRemoveSection(section.name, pageIndex, "left")
            }
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
            onAddVar={() => handleAddVariantToSection(section.name, "left")}
            onAdd={() =>
              handleAddSectionToPages(section.name, pageIndex, "left")
            }
            onDelete={() => handleDelSection(section.name, pageIndex, "left")}
            onRemove={() =>
              handleRemoveSection(section.name, pageIndex, "left")
            }
          />
        );
      case "References":
        return (
          <AllReferences
            data={section}
            textColor="#000"
            templateColor={currentState.color}
            textAltColor={currentState.color}
            onAddVar={() => handleAddVariantToSection(section.name, "left")}
            onAdd={() =>
              handleAddSectionToPages(section.name, pageIndex, "left")
            }
            onDelete={() => handleDelSection(section.name, pageIndex, "left")}
            onRemove={() =>
              handleRemoveSection(section.name, pageIndex, "left")
            }
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
            onAddVar={() => handleAddVariantToSection(section.name, "right")}
            headerPosition="-top-[30px] -right-[50px]"
            isVerticleHeader={true}
            isDot={false}
            onAdd={() =>
              handleAddSectionToPages(section.name, pageIndex, "right")
            }
            onDelete={() => handleDelSection(section.name, pageIndex, "right")}
            onRemove={() =>
              handleRemoveSection(section.name, pageIndex, "right")
            }
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
            onAddVar={() => handleAddVariantToSection(section.name, "left")}
            onAdd={() =>
              handleAddSectionToPages(section.name, pageIndex, "left")
            }
            onDelete={() => handleDelSection(section.name, pageIndex, "left")}
            onRemove={() =>
              handleRemoveSection(section.name, pageIndex, "left")
            }
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
          className={`relative grid mb-4 grid-cols-12  shadow-xl ${
            !editMode && "bg-white"
          }`}
        >
          {/* Left Column */}
          <div
            ref={(el) => void (leftRef.current[idx] = el)}
            className="col-span-8 pr-8 mb-14 border border-red-400 h-fit"
            style={{ padding: "20px" }}
          >
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

            {section.left?.length > 0
              ? section.left.map((leftSec: any, index: number) => (
                  <div
                    key={index}
                    onClick={() => setActivePageIndex(idx)}
                    className="pt-4 relative section-to-break"
                  >
                    <div className="border-b">
                      {leftSec?.name === "Custom Section" ? (
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
                          className="text-lg font-semibold"
                          style={{ color: currentState.color }}
                        >
                          {highlightWords(leftSec?.newSecName || leftSec?.name)}
                        </h2>
                      )}
                    </div>
                    <div>
                      {renderSection(leftSec, idx)}
                    </div>
                  </div>
                ))
              : null}
            <div
              ref={(el) => void (watermarkRefs.current[idx] = el)}
              className="absolute bottom-14 left-0  w-full border border-red-400"
            ></div>
            <Watermark />
            {loading && (
              <p className="text-gray-500 mt-4">
                Checking for spelling/grammar errors...
              </p>
            )}
          </div>

          {/* Right Column */}
          <div
            className="col-span-4 px-2 z-10 "
            style={{ backgroundColor: currentState.color, height: "297mm" }}
          >
            {idx == 0 && (
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
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-white"
                    >
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
            )}

            <div
              ref={(el) => void (rightRef.current[idx] = el)}
              className="p-3  border border-white"
            >
              {section.right?.length > 0 &&
                section.right.map((rightSec: any, index: number) => (
                  <div key={index} className="pt-4 relative section-to-break">
                    <div className="border-b text-white">
                      {rightSec?.name === "Custom Section" ? (
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
                          {highlightWords(
                            rightSec?.newSecName || rightSec?.name
                          )}
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
