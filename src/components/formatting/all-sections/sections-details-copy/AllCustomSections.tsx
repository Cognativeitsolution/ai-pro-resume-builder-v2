"use client";
import React, { useEffect, useRef, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import CustomDatePicker from "../../custom/CustomDatePicker";
import SectionToolbar from "../../section-toolbar/SectionToolbar";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  removeSection,
  addUserCustomSection,
  sectionEditMode,
} from "@/redux/slices/addSectionSlice";
import EditableField from "@/components/editor/editable-field";
import { FaHome } from 'react-icons/fa';
import { IoLocationSharp } from "react-icons/io5";

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
  onRemove:()=>void;
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
};

const AllCustomSection = ({
  secNewNames,
  onRemove,
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
  isDot
}: AllCustomSectionType) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userCustomSections, addedSections } = useSelector(
    (state: RootState) => state.addSection
  );
  const [editable, setEditable] = useState<boolean>(false);
  const [customSectionFields, setCustomSectionFields] = useState<any>();
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



  // Handle input changes for each field in an customSections entry
  const handleInputChange = (
    index: number,
    field: keyof CustomSectionType,
    value: string
  ) => {
    const updated = [...customSections];
    updated[index] = { ...updated[index], [field]: value };
    setCustomSection(updated);
  };

  // Add a new blank customSections entry
  const handleAddCustomSection = () => {
    setCustomSection([
      ...customSections,
      { title: "", description: "", companyName: "", location: "", icon: "" },
    ]);
  };

  // Remove the entire section and reset associated customSections in the Redux store
  const handleRemoveSection = () => {
    if (data) {
      dispatch(removeSection(data));
      onRemove()
      dispatch(
        addUserCustomSection({
          sectionId: data.id,
          detail: [],
          newSecName: secNewNames,
        })
      );
    }
  };

  // Delete a specific customSections entry by index
  const handleDelete = (index: number) => {
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

  // Detect click outside the component to disable editing and save data to Redux
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

  return (
    <div
      ref={containerRef}
      className={`flex flex-col pt-2 ${editable && "bg-white rounded-sm"}`}
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
      <div className="flex flex-col gap-3 divide-y-[1px] px-1 mb-2 ">
        {customSections.length > 0 &&
          customSections.map((exp, index) => (
            <div key={index}>
              <div className={`flex flex-col ${index === 0 ? 'mt-0' : 'mt-2'}`}>
                <div
                  // className="flex items-center justify-between gap-1"
                  className={`flex ${term2 ? "flex-col items-start justify-start text-left" : "flex-row items-center justify-between"} `}
                >
                  <div className="flex items-center justify-between gap-1">
                    {/* ====== Icon ====== */}
                    {hasField("Icon") && (
                      <FaHome className="mb-1 text-indigo-600 h-4 w-8" size={iconSize} />
                    )}

                    {/* ====== Job Title ====== */}
                    {hasField("Title") && (
                      <EditableField
                        html={exp.title || ""}
                        onChange={(val) => handleInputChange(index, "title", val)}
                        placeholder="Title"
                        className="bg-transparent"
                        placeholderClassName=""
                        style={{
                          fontSize: fontSize,
                          fontFamily: fontFamily,
                        }}
                      />
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
                  <div className="flex items-center justify-start gap-1 ">
                    {/* ====== Icon ====== */}
                    <IoLocationSharp className="mb-1 text-indigo-600" size={14} />
                    <EditableField
                      html={exp.location || ""}
                      onChange={(val) => handleInputChange(index, "location", val)}
                      placeholder="Location"
                      className="bg-transparent"
                      placeholderClassName=""
                      style={{
                        fontSize: fontSize,
                        fontFamily: fontFamily,
                      }}
                    />
                  </div>
                )}

                {/* ====== Date Picker ====== */}
                {hasField("Date") && (
                  term3 ?
                    <CustomDatePicker onChange={(dates) => console.log(dates)} dateAlign={term3 && "justify-start  mb-1"} />
                    : null
                )}
                {/* ====== Description ====== */}

                {hasField("Description") && (
                  <EditableField
                    html={exp.description || ""}
                    onChange={(val) =>
                      handleInputChange(index, "description", val)
                    }
                    placeholder="Description"
                    className="bg-transparent"
                    placeholderClassName=""
                    style={{
                      fontSize: fontSize,
                      fontFamily: fontFamily,
                    }}
                  />
                )}
              </div>
              {/* ====== Delete Button ====== */}
              {editable && (
                <div className={`absolute bottom-0 -right-[27px] transition-all duration-300 ease-in-out
                ${editable ? 'opacity-100 ' : 'opacity-0 '}
              `}>
                  <button
                    className="bg-red-800/20 shadow-md rounded-full text-red-600 text-sm w-6 h-6 flex justify-center items-center"
                    onClick={() => {
                      if (index > 0) return handleDelete(index);
                      return handleRemoveSection()
                    }}
                  >
                    <RiDeleteBin6Line size={16} />
                  </button>
                </div>)}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllCustomSection;
