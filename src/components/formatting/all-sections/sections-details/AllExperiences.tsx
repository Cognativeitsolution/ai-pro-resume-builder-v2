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
  addUserExperience,
  removeSection,
  sectionEditMode,
} from "@/redux/slices/addSectionSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import SectionToolbar from "../../section-toolbar/SectionToolbar";
import EditableField from "@/components/editor/editable-field";
import { IoLocationSharp } from "react-icons/io5";

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
};

const AllExperiences = ({
  data = {},
  textColor = "#000",
  textAltColor = "#000",
  templateColor,
  fontSize,
  fontFamily,
}: AllExperienceType) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userExperiences } = useSelector(
    (state: RootState) => state.addSection
  );
  const [editable, setEditable] = useState<boolean>(false);
  const [experiences, setExperiences] = useState<ExperienceType[]>([
    {
      title: "",
      companyName: "",
      description: "",
      location: "",
    },
  ]);

  const handleEditableSection = () => {
    setEditable(true);
    dispatch(sectionEditMode(true));
  };

  // Sync local state with Redux store whenever userExperiences changes
  useEffect(() => {
    if (Array.isArray(userExperiences) && userExperiences.length > 0) {
      setExperiences(userExperiences);
    }
  }, [userExperiences]);

  // Handle input changes for each field in an experience entry
  const handleInputChange = (
    index: number,
    field: keyof ExperienceType,
    value: string
  ) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiences(updated);
  };

  // Add a new blank experience entry
  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      { title: "", description: "", companyName: "", location: "" },
    ]);
  };

  // Remove the entire section and reset associated experiences in the Redux store
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

  // Delete a specific experience entry by index
  const handleDelete = (index: number) => {
    if (experiences?.length <= 1 && index === 0) {
      handleRemoveSection();
    }
    experiences?.length <= 1 && index === 0 && handleRemoveSection()
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
  };
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
          addUserExperience({
            sectionId: data.id,
            detail: experiences,
          })
        );
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [experiences, dispatch, data?.id]);

  const handleAddFirstExperience = (value: string) => {
    const newSkill = {
      title: value.trim(),
      description: "",
      companyName: "",
      location: "",
    };
    if (newSkill.title !== "") {
      setExperiences([newSkill]);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col pt-2 ${editable ? 'bg-white' : ''}`}
      onClick={handleEditableSection}
    >
      {/* ====== Add and Delete Section Buttons ====== */}
      {editable && (
        <SectionToolbar
          isTextEditor={true}
          onCopy={handleAddExperience}
          onDelete={handleRemoveSection}
          position={`top-1 right-0 `}
          mainClass={`transition-all duration-500 ease-in-out ${editable ? "block " : "hidden"}`}
          showDot={true}
        />
      )}
      {/* ===== Education Box ===== */}
      <div className="flex flex-col gap-3 divide-y-[1px] px-1 mb-2 ">
        {experiences.map((exp, index) => (
          <div key={index} className={`relative `}>
            <div className="flex flex-col mt-2">
              {/* ====== Job Title ====== */}
              <div className="flex items-center justify-between">
                <div className="w-full">
                  <EditableField
                    html={exp.title || ""}
                    onChange={(val) =>
                      handleInputChange(index, "title", val)
                    }
                    placeholder="Title"
                    style={{
                      color: textAltColor ? textAltColor : textColor,
                      fontSize: fontSize,
                      fontFamily: fontFamily,
                    }}
                    className="bg-transparent"
                  />
                </div>
                {/* ====== Date Picker ====== */}
                <CustomDatePicker onChange={(dates) => console.log(dates)} />
              </div>
              {/* ====== Location ====== */}
              <div className="w-full">
                <div className="flex items-center justify-start gap-1 ">
                  {/* ====== Icon ====== */}
                  <IoLocationSharp className="mb-1 text-indigo-600" size={14} />
                  <EditableField
                    html={exp.location || ""}
                    onChange={(val) =>
                      handleInputChange(index, "location", val)
                    }
                    placeholder="Location"
                    className="bg-transparent text-left"
                    style={{
                      color: textColor,
                      fontSize: fontSize,
                      fontFamily: fontFamily,
                    }}
                  />
                </div>
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
                    style={{
                      color: textColor,
                      fontSize: fontSize,
                      fontFamily: fontFamily,
                    }}
                    className="bg-transparent"
                  />
                </div>
              </div>
              {/* ====== Description ====== */}
              <div>
                {/* <textarea
                  value={exp.description}
                  disabled={!editable}
                  onChange={(e) =>
                    handleInputChange(index, "description", e.target.value)
                  }
                  placeholder="Description"
                  style={{
                    color: textColor,
                    fontSize: fontSize,
                    fontFamily: fontFamily,
                  }}
                  className="w-full text-[14px] bg-transparent placeholder:text-[14px] focus:outline focus:outline-[0.1px] focus:outline-indigo-600 "
                ></textarea> */}
                <EditableField
                  html={exp.description || ""}
                  onChange={(val) =>
                    handleInputChange(index, "description", val)
                  }
                  placeholder="Description"
                  className="bg-transparent"
                  style={{
                    color: textColor,
                    fontSize: fontSize,
                    fontFamily: fontFamily,
                  }}
                />
              </div>
            </div>
            {/* ====== Delete Button ====== */}
            {editable && (
              <div className={`absolute bottom-0 -right-8 transition-all duration-300 ease-in-out
                ${editable ? 'opacity-100 ' : 'opacity-0 '}
              `}>
                <button
                  className="bg-red-800/20 shadow-md rounded-full text-red-600 text-sm w-6 h-6 flex justify-center items-center"
                  onClick={() => handleDelete(index)}
                >
                  <RiDeleteBin6Line size={16} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllExperiences;
