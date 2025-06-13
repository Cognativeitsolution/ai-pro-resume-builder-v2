"use client";
// ==============
import React, { useEffect, useRef, useState } from "react";
// ==============
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoLocationSharp } from "react-icons/io5";
import { ImMoveDown, ImMoveUp } from "react-icons/im";
// ==============
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserExperience,
  removeSection,
  sectionEditMode,
} from "@/redux/slices/addSectionSlice";
import { moveItem } from "@/utils/moveUpDown";
// ==============
import AiRobo from "../../aiAssistant/AiRobo";
import CustomDatePicker from "../../custom/CustomDatePicker";
import EditableField from "@/components/editor/editable-field";
import SectionToolbar from "../../section-toolbar/SectionToolbar";
import BotPopup from '../../aiAssistant/BotPopup';
import { useSpellCorrection } from '@/app/configs/store/useSpellCorrection';

type ExperienceType = {
  title: string;
  description: string;
  companyName: string;
  location?: string;
};

type AllExperienceType = {
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
  popupRefExperience?: any;
  enableSpellCorrection?: boolean;
};

const AllExperiences = ({
  data = {},
  textColor = "#000",
  textAltColor = "#000",
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
  popupRefExperience,
  enableSpellCorrection = false,
}: AllExperienceType) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const popupRefSpell = useRef<HTMLDivElement | null>(null);
  const { correctedText, correctedWords } = useSpellCorrection(data?.description || '');
  console.log(correctedText, "correctedText Experience")
  const { userExperiences, showIcons } = useSelector(
    (state: RootState) => state.addSection
  );
  const [editable, setEditable] = useState<boolean>(false);
  const [editableIndex, setEditableIndex] = useState<any>();
  const [experiences, setExperiences] = useState<ExperienceType[]>([
    {
      title: "",
      companyName: "",
      description: "",
      location: "",
    },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupSpell, setShowPopupSpell] = useState(false);
  // const [showSpellCorrection, setShowSpellCorrection] = useState(enableSpellCorrection); // ✅ local state

  const handleEditableSection = () => {
    setEditable(true);
    dispatch(sectionEditMode(true));
  };

  const handleSpellingCorrection = () => {
    setShowPopup(false);
    setShowPopupSpell(false);
  };

  //====== Sync local state with Redux store whenever userExperiences changes
  useEffect(() => {
    if (Array.isArray(userExperiences) && userExperiences.length > 0) {
      setExperiences(userExperiences);
    }
  }, [userExperiences]);

  //====== Handle input changes for each field in an experience entry
  const handleInputChange = (
    index: number,
    field: keyof ExperienceType,
    value: string
  ) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiences(updated);
  };

  //====== Add a new blank experience entry
  const handleAddExperience = () => {
    const newIndex = experiences.length;
    setExperiences([
      ...experiences,
      { title: "", description: "", companyName: "", location: "" },
    ]);
    setEditableIndex(newIndex);
    dispatch(sectionEditMode(true));
  };

  //====== Remove the entire section and reset associated experiences in the Redux store
  const handleRemoveSection = () => {
    if (data) {
      dispatch(removeSection(data));
      dispatch(
        addUserExperience({
          sectionId: data.id,
          detail: [],
        })
      );
    }
  };

  //====== Delete a specific experience entry by index
  const handleDelete = (index: number) => {
    if (experiences?.length <= 1 && index === 0) {
      handleRemoveSection();
    }
    experiences?.length <= 1 && index === 0 && handleRemoveSection();
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
  };

  const highlightCorrectedWords = (text: string): string => {
    // console.log(text, "Experience text");

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

  // Close AI popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRefSpell.current && !popupRefSpell.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    };
    if (showPopupSpell) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopupSpell]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setEditable(false);
        dispatch(sectionEditMode(false));
        dispatch(
          addUserExperience({
            sectionId: data.id,
            detail: experiences,
          })
        );
        console.log("Dispatching experiences to Redux:", experiences); // ✅ log here
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [experiences, dispatch, data?.id]);

  // Inside your AllExperiences component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRefExperience.current && !popupRefExperience.current.contains(event.target as Node)) {
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



  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const updated = moveItem(experiences, index, index - 1);
    setExperiences(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index >= experiences.length - 1) return;
    const updated = moveItem(experiences, index, index + 1);
    setExperiences(updated);
  };
  const handleEditableIndex = (index: number) => {
    setEditableIndex(index);
    dispatch(sectionEditMode(true));
  };

  // useEffect(() => {
  //   setShowSpellCorrection(enableSpellCorrection);
  // }, [enableSpellCorrection]);

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
          onCopy={handleAddExperience}
          onDelete={handleRemoveSection}
          mainClass={`transition-all duration-500 ease-in-out ${editable ? "block " : "hidden"
            }`}
          isVerticleHeader={isVerticleHeader}
          textEditorPosition={
            textEditorPosition ? textEditorPosition : `top-1 left-[25%] `
          }
          headerPosition={headerPosition ? headerPosition : `top-1 right-0`}
          showDot={true}
          dotPosition={dotPosition}
          isDot={isDot}
        />
      )}

      {/* ===== Experience Box ===== */}
      <div className="flex flex-col gap-3 divide-y-[1px] px-1 mb-2">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`relative ${editable && editableIndex === index
              ? "bg-white rounded-sm"
              : "bg-transparent"
              } p-2 transition-colors duration-300`}
            onClick={() => handleEditableIndex(index)}
          >
            <div className={`flex flex-col ${index === 0 ? "mt-0" : "mt-2"}`}>
              {/* ====== Job Title ====== */}
              <div
                className={`flex ${term2
                  ? "flex-col items-start justify-start text-left"
                  : "flex-row items-center justify-between"
                  } `}
              >
                <div className="w-full">
                  <EditableField
                    html={exp.title || ""}
                    onChange={(val) => handleInputChange(index, "title", val)}
                    placeholder="Title"
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
                {term3 ? null : (
                  <CustomDatePicker
                    onChange={(dates) => console.log(dates)}
                    dateAlign={term2 && "justify-start  mb-1"}
                  />
                )}
              </div>

              {/* ====== Location ====== */}
              <div className="w-full">
                <div className="flex items-center justify-start gap-1 ">
                  {/* ====== Icon ====== */}
                  {showIcons && (
                    <IoLocationSharp
                      className="mb-1 text-indigo-600"
                      size={14}
                    />
                  )}
                  <EditableField
                    html={exp.location || ""}
                    onChange={(val) =>
                      handleInputChange(index, "location", val)
                    }
                    placeholder="Location"
                    placeholderClassName="!text-[14px]"
                    className="bg-transparent text-left !text-[14px]"
                    style={{
                      color: textColor,
                      fontSize: fontSize,
                      fontFamily: fontFamily,
                    }}
                  />
                </div>
                {term3 ? (
                  <div
                    className={`flex flex-col items-start justify-start text-left `}
                  >
                    <CustomDatePicker
                      onChange={(dates) => console.log(dates)}
                      dateAlign={term3 && "justify-start mb-1"}
                    />
                  </div>
                ) : null}
              </div>

              {/* ====== Company Name ====== */}
              <div className="flex items-center justify-between">
                <div className="w-full">
                  <EditableField
                    html={exp.companyName || ""}
                    onChange={(val) =>
                      handleInputChange(index, "companyName", val)
                    }
                    placeholder="Company Name"
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
                  html={exp.description || ""}
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

                {/*====== AI Assistant Button ======*/}
                {/* {editable && editableIndex === index && (
                  <AiRobo
                    input={false}
                    positionClass="-left-[75px] hover:-left-[159px] top-8"
                    info={
                      exp.title?.trim()
                        ? "Generate ideas for new bullets."
                        : "Please include more information in your resume and I will help you with improving and tailoring it."
                    }
                  />
                )} */}
              </div>
            </div>

            {/* ====== Delete Button ====== */}
            {editable && editableIndex === index && (
              <div
                className={`absolute bottom-0 -right-9 gap-1 flex flex-col transition-all duration-300 ease-in-out ${editable ? "opacity-100 " : "opacity-0 "
                  }`}
              >
                {experiences?.length > 1 && (
                  <button
                    onClick={() => handleMoveUp(index)}
                    className="bg-indigo-600/15 backdrop-blur-lg  rounded-full text-indigo-600 text-sm w-6 h-6 flex justify-center items-center hover:scale-105 transition-transform duration-300"
                    title="Move up"
                  >
                    <ImMoveUp size={14} />
                  </button>
                )}
                {experiences?.length > 1 && (
                  <button
                    onClick={() => handleMoveDown(index)}
                    className="bg-indigo-600/15 backdrop-blur-lg  rounded-full text-indigo-600 text-sm w-6 h-6 flex justify-center items-center hover:scale-105 transition-transform duration-300"
                    title="Move Down"
                  >
                    <ImMoveDown size={14} />
                  </button>
                )}
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

      {editable && (
        <div ref={popupRef}>
          <AiRobo
            positionClass="-left-[70px] hover:-left-[154px] top-14"
            info="Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
            popupTitle="AI Assistant"
            popupTitleBtn="Generate"
          />
        </div>
      )}

      {/* {showSpellCorrection && correctedText && ( */}
      {/* <div ref={popupRefSpell}>
        <BotPopup
          info={highlightCorrectedWords(correctedText) || "No spell mistake found"}
          popupTitle="Spelling Correction"
          popupTitleBtn="Apply"
          popupTheme="blue"
          onClickPopup={handleSpellingCorrection}
          popupWidth="w-full"
          popupPosition="top-[100%] -left-[5%]"
        />
      </div> */}
      {/* )} */}

    </div>
  );
};

export default AllExperiences;
