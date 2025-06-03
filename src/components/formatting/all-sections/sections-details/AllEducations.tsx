"use client";
// ==============
import React, { useEffect, useRef, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
// ==============
import CustomDatePicker from "../../custom/CustomDatePicker";
// ==============
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserEducation,
  removeSection,
  sectionEditMode,
} from "@/redux/slices/addSectionSlice";
import { RiAddCircleFill, RiDeleteBin6Line } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import SectionToolbar from "../../section-toolbar/SectionToolbar";
import EditableField from "@/components/editor/editable-field";
import { IoLocationSharp } from "react-icons/io5";
import { moveItem } from "@/utils/moveUpDown";
import { ImMoveDown, ImMoveUp } from "react-icons/im";

type EducationType = {
  degree: string;
  schoolName: string;
  location?: string;
};

type AllEducationType = {
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
};

const AllEducation = ({
  data = {},
  textColor = "#000",
  textAltColor,
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
  highlightText
}: AllEducationType) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userEducation } = useSelector((state: RootState) => state.addSection);
  const [inputData, setInputData] = useState<any>({});
  const [editable, setEditable] = useState<boolean>(false);
  const [educations, setEducations] = useState<EducationType[]>([{
    degree: "",
    schoolName: "",
    location: ""
  }]);
  console.log(userEducation, "userEducationuserEducation")
  const handleEditableSection = () => {
    setEditable(true);
    dispatch(sectionEditMode(true));
  };
  useEffect(() => {
    if (Array.isArray(userEducation) && userEducation.length > 0) {
      setEducations(userEducation);
    }
  }, [userEducation]);



  const handleContentChange = (
    index: number,
    field: keyof EducationType,
    value: string
  ) => {
    const updated = [...educations];
    console.log(updated, "updatedupdatedupdated")
    updated[index] = { ...updated[index], [field]: value };
    setEducations(updated);
  };

  // Add a new blank education entry
  const handleAddEducation = () => {
    setEducations([
      ...educations,
      { degree: "", location: "", schoolName: "" },
    ]);
  };

  // Remove the entire education section and reset its Redux data
  const handleRemoveSection = () => {
    if (data) {
      dispatch(removeSection(data));
      dispatch(
        addUserEducation({
          sectionId: data.id,
          detail: [],
        })
      );
    }
  };

  // Delete a single education entry by index
  const handleDelete = (index: number) => {
    if (educations?.length <= 1 && index === 0) {
      handleRemoveSection();
    }
    const updated = educations.filter((_, i) => i !== index);
    console.log(updated)
    setEducations(updated);
  };

  // Handle click outside the section to save changes and exit edit mode
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setEditable(false);
        dispatch(sectionEditMode(false));
        dispatch(
          addUserEducation({
            sectionId: data.id,
            detail: educations,
          })
        );
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [educations, dispatch, data?.id]);

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const updated = moveItem(educations, index, index - 1);
    setEducations(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index >= educations.length - 1) return;
    const updated = moveItem(educations, index, index + 1);
    setEducations(updated);
  };
  return (
    <div
      ref={containerRef}
      className={`flex flex-col pt-2 ${editable ? 'bg-white rounded-sm' : ''}`}

    >
      <div onClick={handleEditableSection}>
        {/* ====== Add and Delete Section Buttons ====== */}

        <SectionToolbar
          isTextEditor={true}
          onCopy={handleAddEducation}
          onDelete={handleRemoveSection}
          mainClass={`transition-all duration-500 ease-in-out ${editable ? "block " : "hidden"}`}
          isVerticleHeader={isVerticleHeader}
          textEditorPosition={textEditorPosition ? textEditorPosition : `top-1 left-[25%] `}
          headerPosition={headerPosition ? headerPosition : `top-1 right-0`}
          showDot={true}
          dotPosition={dotPosition}
          isDot={isDot}
        />
        {/* ===== Education Box ===== */}
        <div className="flex flex-col gap-3 divide-y-[1px] px-1 mb-2 ">
          {/* <Editor/> */}
          {educations.length > 0 &&
            educations.map((exp, index) => (
              <div key={index} className={`relative `}>
                <div className={`flex flex-col ${index === 0 ? 'mt-0' : 'mt-2'}`}>
                  {/* ====== Degree and Field of Study ====== */}
                  <div className={`flex ${term2 ? "flex-col items-start justify-start text-left" : "flex-row items-center justify-between"} `}>
                    <div className="w-full">
                      {/* {editable ? */}
                      <EditableField
                        html={exp.degree}
                        onChange={(val) =>
                          handleContentChange(index, "degree", val)
                        }
                        placeholder="Degree and Field of Study"
                        style={{
                          color: textAltColor ? textAltColor : textColor,
                          fontSize: fontSize,
                          fontFamily: fontFamily,
                        }}
                        className="bg-transparent"
                        highlightText={highlightText}
                      />
                      {/* :
                        <p
                          style={{
                            color: textAltColor ? textAltColor : textColor,
                            fontSize: fontSize,
                            fontFamily: fontFamily,
                          }}
                          className="bg-transparent"
                          dangerouslySetInnerHTML={{
                            __html: exp.degree,
                          }}
                        />
                      } */}
                    </div>
                    {/* ====== Date Picker ====== */}
                    {term3 ? null :
                      <CustomDatePicker onChange={(dates) => console.log(dates)} dateAlign={term2 && "justify-start  mb-1"} />}
                  </div>
                  {/* ====== Location ====== */}
                  <div className="w-full">
                    <div className="flex items-center justify-start gap-1 ">
                      {/* ====== Icon ====== */}
                      <IoLocationSharp className="mb-1 text-indigo-600" size={14} />
                      <EditableField
                        html={exp.location || ""}
                        onChange={(val) =>
                          handleContentChange(index, "location", val)
                        }
                        placeholder="Location"
                        className="bg-transparent text-left "
                        style={{
                          color: textColor,
                          fontSize: fontSize,
                          fontFamily: fontFamily,
                        }}
                        highlightText={highlightText}
                      />
                    </div>
                    {term3 ?
                      <div className={`flex flex-col items-start justify-start text-left  mb-1`}>
                        <CustomDatePicker onChange={(dates) => console.log(dates)} dateAlign={term3 && "justify-start"} />
                      </div> : null}
                  </div>
                  {/* ====== School or University ====== */}
                  <div className="flex items-center justify-between">
                    <div className="w-full">
                      <EditableField
                        html={exp.schoolName}
                        onChange={(val) =>
                          handleContentChange(index, "schoolName"
                            , val)
                        }
                        placeholder="School or University"
                        className="bg-transparent"
                        style={{
                          color: textColor,
                          fontSize: fontSize,
                          fontFamily: fontFamily,
                        }}
                        highlightText={highlightText}
                      />
                    </div>



                  </div>
                </div>
                {/* ====== Delete Button ====== */}
                {editable && (
                  <div className={`absolute bottom-0 -right-8 gap-1 flex flex-col transition-all duration-300 ease-in-out ${editable ? 'opacity-100 ' : 'opacity-0 '}`}>
                    {educations?.length > 1 &&
                      <button
                        onClick={() => handleMoveUp(index)}
                        className="bg-indigo-600/15 backdrop-blur-lg  rounded-full text-indigo-600 text-sm w-6 h-6 flex justify-center items-center hover:scale-105 transition-transform duration-300"
                        title="Move up"
                      >
                        <ImMoveUp size={14} />
                      </button>}
                    {educations?.length > 1 && <button
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
            )
            )}
        </div>
      </div>
    </div>
  );
};

export default AllEducation;
