"use client";
// ==============
import React, { useEffect, useRef, useState } from "react";
// ==============
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoLocationSharp } from "react-icons/io5";
import { ImMoveUp, ImMoveDown } from 'react-icons/im';
// ==============
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addUserProjects, removeSection, sectionEditMode } from "@/redux/slices/addSectionSlice";
import { moveItem } from "@/utils/moveUpDown";
// ==============
import AiRobo from "../../aiAssistant/AiRobo";
import CustomDatePicker from "../../custom/CustomDatePicker";
import EditableField from "@/components/editor/editable-field";
import SectionToolbar from "../../section-toolbar/SectionToolbar";
import BotPopup from '../../aiAssistant/BotPopup';
import { useSpellCorrection } from '@/app/configs/store/useSpellCorrection';

type ProjectType = {
  projectName: string;
  description: string;
  projectUrl: string;
  location?: string;
};

type AllProjectsType = {
  data?: any;
  textColor?: string;
  textAltColor?: string;
  templateColor?: string;
  fontSize?: any;
  fontFamily?: any;
  term2?: any;
  term3?: any;
  dotPosition?: any;
  isVerticleHeader?: any;
  headerPosition?: any;
  textEditorPosition?: any;
  isDot?: any;
  highlightText?: (text: string) => string;
  popupRefSummary?: any;
  enableSpellCorrection?: boolean;
  AiRoboPosition?: string;
  BotPopupPosition?: string;
};

const AllProjects = ({
  data = {},
  textColor = "#000",
  textAltColor = "",
  templateColor,
  fontSize,
  fontFamily,
  term2,
  term3,
  dotPosition,
  isVerticleHeader,
  headerPosition,
  textEditorPosition,
  isDot,
  highlightText,
  popupRefSummary,
  enableSpellCorrection = false,
  AiRoboPosition,
  BotPopupPosition
}: AllProjectsType) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const { correctedText, correctedWords } = useSpellCorrection(data?.description || '');

  const { userProjects, showIcons } = useSelector(
    (state: RootState) => state.addSection
  );
  const [editable, setEditable] = useState<boolean>(false);
  const [editableIndex, setEditableIndex] = useState<any>();
  const [projects, setProjects] = useState<ProjectType[]>([
    {
      description: "",
      projectName: "",
      projectUrl: "",
      location: "",
    },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [showSpellCorrection, setShowSpellCorrection] = useState(enableSpellCorrection); // ✅ local state

  const handleEditableSection = () => {
    setEditable(true);
    dispatch(sectionEditMode(true));
  };

  const handleSpellingCorrection = () => {
    setShowPopup(false);
    setShowSpellCorrection(false);
  };

  //====== Sync local state with Redux store when userProjects changes
  useEffect(() => {
    if (Array.isArray(userProjects) && userProjects.length > 0) {
      setProjects(userProjects);
    }
  }, [userProjects]);

  //====== Handle changes in the project fields (e.g., name, description)
  const handleInputChange = (
    index: number,
    field: keyof ProjectType,
    value: string
  ) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  //====== Add a new, empty project entry to the list
  const handleAddProject = () => {
    const newIndex = projects.length;
    setProjects([
      ...projects,
      { projectName: "", description: "", projectUrl: "", location: "" },
    ]);
    setEditableIndex(newIndex);
    dispatch(sectionEditMode(true));
  };

  //====== Remove the entire section from Redux and clear its data
  const handleRemoveSection = () => {
    if (data) {
      dispatch(removeSection(data));
      dispatch(addUserProjects({ sectionId: data.id, detail: [] }));
    }
  };

  //====== Delete a specific project from the list based on index
  const handleDelete = (index: number) => {
    if (projects?.length <= 1 && index === 0) {
      handleRemoveSection();
    }
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  const highlightCorrectedWords = (text: string): string => {
    return text.split(/\s+/).map(word => {
      const cleaned = word.replace(/[.,!?]/g, "").toLowerCase();
      if (correctedWords.map(w => w.toLowerCase()).includes(cleaned)) {
        return `<span class="text-blue-500">${word}</span>`;
      }
      return word;
    }).join(" ");
  };

  // Close AI popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    };
    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        dispatch(sectionEditMode(false));

        setEditable(false);
        dispatch(addUserProjects({ sectionId: data.id, detail: projects }));
      }
    };

    //====== Attach listener on mount
    document.addEventListener("mousedown", handleClickOutside);

    //====== Clean up on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [projects, dispatch, data?.id]);


  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const updated = moveItem(projects, index, index - 1);
    setProjects(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index >= projects.length - 1) return;
    const updated = moveItem(projects, index, index + 1);
    setProjects(updated);
  };
  const handleEditableIndex = (index: number) => {
    setEditableIndex(index);
    dispatch(sectionEditMode(true));
  };

  useEffect(() => {
    setShowSpellCorrection(enableSpellCorrection);
  }, [enableSpellCorrection]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col pt-2`}
      onClick={handleEditableSection}
    >
      {/* ====== Add and Delete Section Buttons ====== */}
      {editable && (
        <SectionToolbar
          isTextEditor={true}
          onCopy={handleAddProject}
          onDelete={handleRemoveSection}
          mainClass={`transition-all duration-500 ease-in-out ${editable ? "block " : "hidden"}`}
          isVerticleHeader={isVerticleHeader}
          textEditorPosition={textEditorPosition ? textEditorPosition : `top-1 left-[25%] `}
          headerPosition={headerPosition ? headerPosition : `top-1 right-0`}
          showDot={true}
          dotPosition={dotPosition}
          isDot={isDot}
        />
      )}

      {/* ===== Project Box ===== */}
      <div className="flex flex-col gap-3 divide-y-[1px] px-1 mb-2">
        {projects.map((project, index) => (
          <div key={index}
            onClick={() => handleEditableIndex(index)}
            className={`relative p-2 ${editable && editableIndex === index ? 'bg-white rounded-sm' : 'bg-transparent'}`}>
            <div className={`flex flex-col ${index === 0 ? 'mt-0' : 'mt-2'}`}>
              {/* ====== Degree and Field of Study ====== */}
              <div className={`flex ${term2 ? "flex-col items-start justify-start text-left" : "flex-row items-center justify-between"} `}>
                <div className="w-full">
                  <EditableField
                    html={project.projectName || ""}
                    onChange={(val) =>
                      handleInputChange(index, "projectName", val)
                    }
                    placeholder="Project Name"
                    className="bg-transparent !text-[15px]"
                    placeholderClassName="!text-[15px]"
                    style={{
                      color: textAltColor ? textAltColor : textColor,
                      fontSize: fontSize,
                      fontFamily: fontFamily,
                    }}
                    highlightText={highlightText}
                  />
                </div>
                {/* ====== Date Picker ====== */}
                {term3 ? null :
                  <CustomDatePicker onChange={(dates) => console.log(dates)} dateAlign={term2 && "justify-start mb-1"} />
                }
              </div>
              <div>
                <div>
                  {/* ====== Location ====== */}
                  <div className="flex items-center justify-start gap-1 ">
                    {/* ====== Icon ====== */}
                    {showIcons && <IoLocationSharp className="mb-1 text-indigo-600" size={14} />}
                    <EditableField
                      html={project.location || ""}
                      onChange={(val) =>
                        handleInputChange(index, "location", val)
                      }
                      placeholder="Location"
                      className="bg-transparent !text-[14px]"
                      placeholderClassName="!text-[14px]"
                      style={{
                        color: textColor,
                        fontSize: fontSize,
                        fontFamily: fontFamily,
                      }}
                    />
                  </div>
                  {term3 ?
                    <div className={`flex flex-col items-start justify-start text-left  mb-1`}>
                      <CustomDatePicker onChange={(dates) => console.log(dates)} dateAlign={term3 && "justify-start"} />
                    </div> : null}
                </div>

                {/* ====== Project URL ====== */}
                <div className="w-full">
                  <EditableField
                    html={project.projectUrl || ""}
                    onChange={(val) =>
                      handleInputChange(index, "projectUrl", val)
                    }
                    placeholder="Project Url"
                    className="bg-transparent !text-[14px]"
                    placeholderClassName="!text-[14px]"
                    style={{
                      color: textColor,
                      fontSize: fontSize,
                      fontFamily: fontFamily,
                    }}
                  />
                </div>
              </div>

              {/* ====== Description ====== */}
              <div>
                <EditableField
                  html={project.description || ""}
                  onChange={(val) =>
                    handleInputChange(index, "description", val)
                  }
                  placeholder="Description"
                  className="bg-transparent !text-[14px]"
                  placeholderClassName="!text-[14px]"
                  style={{
                    color: textColor,
                    fontSize: fontSize,
                    fontFamily: fontFamily,
                  }}
                  highlightText={highlightText}
                />
              </div>
            </div>

            {/*====== AI Assistant Button ======*/}
            {editable && editableIndex === index && (
              <AiRobo
                input={false}
                positionClass={AiRoboPosition ? AiRoboPosition : "-left-[75px] hover:-left-[159px] top-8"}
                info={
                  project.projectName?.trim()
                    ? "Generate ideas for new bullets."
                    : "Please include more information in your resume and I will help you with improving and tailoring it."
                }
              />
            )}

            {/* ====== Delete Button ====== */}
            {editable && editableIndex === index && (
              <div className={`absolute bottom-0 -right-9 gap-1 flex flex-col transition-all duration-300 ease-in-out ${editable ? 'opacity-100 ' : 'opacity-0 '}`}>
                {projects?.length > 1 &&
                  <button
                    onClick={() => handleMoveUp(index)}
                    className="bg-indigo-600/15 backdrop-blur-lg  rounded-full text-indigo-600 text-sm w-6 h-6 flex justify-center items-center hover:scale-105 transition-transform duration-300"
                    title="Move up"
                  >
                    <ImMoveUp size={14} />
                  </button>}
                {projects?.length > 1 && <button
                  onClick={() => handleMoveDown(index)}
                  className="bg-indigo-600/15 backdrop-blur-lg  rounded-full text-indigo-600 text-sm w-6 h-6 flex justify-center items-center hover:scale-105 transition-transform duration-300"
                  title="Move Down"
                >
                  <ImMoveDown size={14} />
                </button>}
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-800/15 backdrop-blur-lg rounded-full text-red-600 text-sm w-6 h-6 flex justify-center items-center hover:scale-105 transition-transform duration-300"
                  title="Delete"
                >
                  <RiDeleteBin6Line size={14} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* {editable && (
        <div ref={popupRef}>
          <AiRobo
            positionClass="-left-[70px] hover:-left-[154px] top-14"
            info="Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
            popupTitle="AI Assistant"
            popupTitleBtn="Generate"
          />
        </div>
      )} */}

      {showSpellCorrection && correctedText && (
        <div ref={popupRefSummary}>
          <BotPopup
            info={highlightCorrectedWords(correctedText) || "No spell mistake found"}
            popupTitle="Spelling Correction"
            popupTitleBtn="Apply"
            popupTheme="red"
            onClickPopup={handleSpellingCorrection}
            popupWidth="w-full"
            popupPosition={BotPopupPosition ? BotPopupPosition : "top-[110%] -left-[25%]"}
          />
        </div>
      )}
    </div>
  );
};

export default AllProjects;
