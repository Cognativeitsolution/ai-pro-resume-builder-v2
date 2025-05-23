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
import Editor from "@/components/editor/editor";
import EditableField from "@/components/editor/editable-field";

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
};

const AllEducation = ({
  data = {},
  textColor = "#000",
  textAltColor,
  templateColor,
}: AllEducationType) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userEducation } = useSelector((state: RootState) => state.addSection);
  const [editable, setEditable] = useState<boolean>(false);
  const [educations, setEducations] = useState<EducationType[]>([{
    degree: "",
    schoolName: "",
    location: ""
  }]);
  console.log(userEducation)
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
    console.log(updated)
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

  return (
    <div
      ref={containerRef}
      className={`flex flex-col pt-2 ${editable ? 'bg-white' : ''}`}
      onClick={handleEditableSection}
    >
      {/* ====== Add and Delete Section Buttons ====== */}

      <SectionToolbar
        isTextEditor={true}
        onCopy={handleAddEducation}
        onDelete={handleRemoveSection}
        position={`top-1 right-0 `}
        mainClass={`transition-all duration-500 ease-in-out ${editable ? "block " : "hidden"}`}
        showDot={true}
      />
      {/* ===== Education Box ===== */}
      <div className="flex flex-col gap-3 divide-y-[1px] px-1 mb-2 ">
        {/* <Editor/> */}
        {educations.length > 0 &&
          educations.map((exp, index) => (
            <div key={index} className={`relative pb-6`}>
              <div className="flex flex-col mt-2 ">
                {/* ====== Degree and Field of Study ====== */}
                <div className="flex items-center justify-between">
                  <div className="w-full">
                    <EditableField
                      html={exp.degree}
                      onChange={(val) =>
                        handleContentChange(index, "degree", val)
                      }
                      placeholder="Degree and Field of Study"
                      style={{
                        color: textAltColor ? textAltColor : textColor
                      }}
                      className="text-[16px] bg-transparent"
                    />
                  </div>
                  {/* ====== Date Picker ====== */}
                  <CustomDatePicker onChange={(dates) => console.log(dates)} />
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
                      className="text-[16px] bg-transparent"
                      style={{
                        color: textColor
                      }}
                    />
                  </div>
                  {/* ====== Location ====== */}
                  <div className="w-full">
                    <EditableField
                      html={exp.location || ""}
                      onChange={(val) =>
                        handleContentChange(index, "location", val)
                      }
                      placeholder="Location"
                      className="text-[16px] bg-transparent text-right"
                      placeholderClassName="right-0"
                      style={{
                        color: textColor
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* ====== Delete Button ====== */}
              {editable && (
                <div className={`absolute bottom-0 right-0 transition-all duration-300 ease-in-out
                ${editable ? 'opacity-100 ' : 'opacity-0 '}
              `}>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-800/20 shadow-md rounded-full text-red-600 text-sm w-6 h-6 flex justify-center items-center"
                  >
                    <RiDeleteBin6Line size={16} />
                  </button>
                </div>
              )}

            </div>
          )
          )}
      </div>
    </div>
  );
};

export default AllEducation;
