"use client";
// ==============
import React, { useEffect, useRef, useState } from "react";
// ==============
import { FaHome } from 'react-icons/fa';
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoLocationSharp } from "react-icons/io5";
// ==============
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { removeSection, addUserCustomSection, sectionEditMode } from "@/redux/slices/addSectionSlice";
// ==============
import AiRobo from "../../aiAssistant/AiRobo";
import CustomDatePicker from "../../custom/CustomDatePicker";
import EditableField from "@/components/editor/editable-field";
import SectionToolbar from "../../section-toolbar/SectionToolbar";
import { ImMoveDown, ImMoveUp } from "react-icons/im";

type CustomSectionType = {
  title: string;
  description?: string;
  companyName?: string;
  location?: string;
  sectionFields?: any;
  icon?: any;
};

type AllCustomSectionType = {
  data?: any;
  textColor?: string;
  textAltColor?: string;
  templateColor?: string;
  secNewNames?: any;
  fontSize?: any;
  fontFamily?: any;
  term2?: any;
  term3?: any;
  iconSize?: any;
  dotPosition?: any;
  isVerticleHeader?: any;
  headerPosition?: any;
  textEditorPosition?: any;
  isDot?: any;
  highlightText?: (text: any) => any;
};

const AllCustomSection = ({
  secNewNames,
  data = {},
  textColor = "#000",
  fontSize,
  fontFamily,
  term2,
  term3,
  iconSize,
  dotPosition,
  isVerticleHeader,
  headerPosition,
  textEditorPosition,
  isDot,
  highlightText
}: AllCustomSectionType) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userCustomSections, addedSections, showIcons } = useSelector(
    (state: RootState) => state.addSection
  );
  const [editable, setEditable] = useState<boolean>(false);
  const [customSectionFields, setCustomSectionFields] = useState<any>();
  const [editableIndex, setEditableIndex] = useState<any>();

  const [customSections, setCustomSection] = useState<CustomSectionType[]>([
    {
      companyName: "",
      description: "",
      title: "",
      location: "",
      icon: "",
    },
  ]);
  const hasField = (field: string) => {
    return (
      Array.isArray(customSectionFields?.[0]?.sectionFields) && customSectionFields[0].sectionFields.includes(field)
    );
  };

  const handleEditableSection = () => {
    setEditable(true);
    dispatch(sectionEditMode(true));
  };

  //====== Handle input changes for each field in an customSections entry
  const handleInputChange = (
    index: number,
    field: keyof CustomSectionType,
    value: string
  ) => {
    const updated = [...customSections];
    updated[index] = { ...updated[index], [field]: value };
    setCustomSection(updated);
  };

  //====== Add a new blank customSections entry
  const handleAddCustomSection = () => {
    const newIndex = customSections.length;
    setCustomSection([
      ...customSections,
      { title: "", description: "", companyName: "", location: "", icon: "" },
    ]);
    setEditableIndex(newIndex);
    dispatch(sectionEditMode(true));
  };

  //====== Remove the entire section and reset associated customSections in the Redux store
  const handleRemoveSection = () => {
    if (data) {
      dispatch(removeSection(data));
      dispatch(
        addUserCustomSection({
          sectionId: data.id,
          detail: [],
          newSecName: secNewNames,
        })
      );
    }
  };

  //====== Delete a specific customSections entry by index
  const handleDelete = (index: number) => {
    if (customSections?.length <= 1 && index === 0) {
      handleRemoveSection();
    }
    const updated = customSections.filter((_, i) => i !== index);
    setCustomSection(updated);
  };

  let arrayy: any[] = [];
  useEffect(() => {
    if (Array.isArray(userCustomSections) && userCustomSections.length > 0) {
      setCustomSection(userCustomSections);
    }
    const sections = addedSections?.filter((d: any) => d?.name === 'Custom Section');
    sections?.forEach((item: any) => {
      const alreadyExists = arrayy.some(existing => existing?.id === item?.id);
      if (!alreadyExists) {
        arrayy.push(item);
      }
    });
    setCustomSectionFields(arrayy)
  }, [userCustomSections, addedSections]);

  //====== Detect click outside the component to disable editing and save data to Redux
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setEditable(false);
        dispatch(sectionEditMode(false));
        dispatch(
          addUserCustomSection({
            sectionId: data.id,
            detail: customSections,
            newSecName: secNewNames,
          })
        );
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [customSections, dispatch, data?.id, secNewNames]);

  const moveItem = (arr: any[], from: number, to: number) => {
    const updated = [...arr];
    const [movedItem] = updated.splice(from, 1);
    updated.splice(to, 0, movedItem);
    return updated;
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const updated = moveItem(customSections, index, index - 1);
    setCustomSection(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index >= customSections.length - 1) return;
    const updated = moveItem(customSections, index, index + 1);
    setCustomSection(updated);
  };
  const handleEditableIndex = (index: number) => {
    setEditableIndex(index);
    dispatch(sectionEditMode(true));
  };

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
          onCopy={handleAddCustomSection}
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

      {/* ===== Section Box ===== */}
      <div className="flex flex-col gap-3 divide-y-[1px] px-1 mb-2">
        {customSections.length > 0 &&
          customSections.map((exp, index) => (
            <div key={index}
              onClick={() => handleEditableIndex(index)}
              className={`p-2 ${editable && editableIndex === index ? 'bg-white rounded-sm' : 'bg-transparent'}`}
            >
              <div className={`flex flex-col ${index === 0 ? 'mt-0' : 'mt-2'}`}>
                <div className={`flex ${term2 ? "flex-col items-start justify-start text-left" : "flex-row items-center justify-between"} `}>
                  <div className="flex items-center justify-between gap-1 w-full">
                    {/* ====== Icon ====== */}
                    {hasField("Icon") && showIcons && (
                      <FaHome className="mb-1 text-indigo-600 h-4 w-8" size={iconSize} />
                    )}

                    {/* ====== Job Title ====== */}
                    {hasField("Title") && (
                      <div className="flex items-center justify-start gap-1 w-full">
                        <EditableField
                          html={exp.title || ""}
                          onChange={(val) => handleInputChange(index, "title", val)}
                          placeholder="Title"
                          className="bg-transparent !text-[15px]"
                          placeholderClassName="!text-[15px]"
                          style={{
                            color: textColor,
                            fontSize: fontSize,
                            fontFamily: fontFamily,
                          }}
                          highlightText={highlightText}
                        />
                      </div>
                    )}
                  </div>

                  {/* ====== Date Picker ====== */}
                  {hasField("Date") && (
                    term3 ? null :
                      <CustomDatePicker onChange={(dates) => console.log(dates)} dateAlign={term2 && "justify-start  mb-1"} />
                  )}
                </div>

                {/* ====== Location ====== */}
                {hasField("Location") && (
                  <div className="flex items-center justify-start gap-1">
                    {/* ====== Icon ====== */}
                    {showIcons && <IoLocationSharp className="mb-1 text-indigo-600" size={14} />}
                    <EditableField
                      html={exp.location || ""}
                      onChange={(val) => handleInputChange(index, "location", val)}
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
                )}

                {/* ====== Date Picker ====== */}
                {hasField("Date") && (
                  term3 ?
                    <CustomDatePicker onChange={(dates) => console.log(dates)} dateAlign={term3 && "justify-start mb-1"} />
                    : null
                )}

                {/* ====== Description ====== */}
                {hasField("Description") && (
                  <div className="flex items-center justify-start gap-1 w-full">
                    <EditableField
                      html={exp.description || ""}
                      onChange={(val) => handleInputChange(index, "description", val)}
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
                )}
              </div>

              {/*====== AI Assistant Button ======*/}
              {editable && editableIndex === index && (
                <AiRobo
                  input={false}
                  positionClass="-left-[70px] hover:-left-[154px] top-20"
                  info={
                    exp.title?.trim()
                      ? "Generate ideas for new bullets."
                      : "Please include more information in your resume and I will help you with improving and tailoring it."
                  }
                />
              )}

              {/* ====== Delete Button ====== */}
              {editable && editableIndex === index && (
                <div className={`absolute bottom-0 -right-9 gap-1 flex flex-col transition-all duration-300 ease-in-out ${editable ? 'opacity-100 ' : 'opacity-0 '}`}>
                  {customSections?.length > 1 &&
                    <button
                      onClick={() => handleMoveUp(index)}
                      className="bg-indigo-600/15 backdrop-blur-lg  rounded-full text-indigo-600 text-sm w-6 h-6 flex justify-center items-center hover:scale-105 transition-transform duration-300"
                      title="Move up"
                    >
                      <ImMoveUp size={14} />
                    </button>}
                  {customSections?.length > 1 && <button
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
    </div>
  );
};

export default AllCustomSection;
