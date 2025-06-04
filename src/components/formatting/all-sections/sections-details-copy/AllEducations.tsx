"use client";
import React, { useEffect, useRef, useState } from "react";
import CustomDatePicker from "../../custom/CustomDatePicker";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserEducation,
  removeSection,
  sectionEditMode,
} from "@/redux/slices/addSectionSlice";
import SectionToolbar from "../../section-toolbar/SectionToolbar";
import EditableField from "@/components/editor/editable-field";
import { IoLocationSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

type EducationDetail = {
  degree: string;
  schoolName: string;
  location?: string;
};

type AllEducationType = {
  data: { id: number; name: string; detail: EducationDetail[] };

  onRemove: () => void;
  onDelete: () => void;
  onAdd: () => void;
  textColor?: string;
  textAltColor?: string;
  templateColor?: string;
  fontSize?: any;
  fontFamily?: any;
  term2?: boolean;
  term3?: boolean;
  dotPosition?: any;
  isVerticleHeader?: boolean;
  headerPosition?: string;
  textEditorPosition?: string;
  isDot?: boolean;
};

const AllEducation = ({
  data,

  onRemove,
  onDelete,
  onAdd,
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
}: AllEducationType) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userEducation } = useSelector((state: RootState) => state.addSection);
  const [editable, setEditable] = useState<boolean>(false);

  const handleEditableSection = () => {
    setEditable(true);
    dispatch(sectionEditMode(true));
  };

  // Remove entire section
  const handleRemove = (index: number) => {


    if(data.detail.length == 1){
      onDelete();
    
    return
    }

    onRemove()
  
  };
  const handleDel = () => {
    onDelete();
    dispatch(removeSection(data));
    dispatch(
      addUserEducation({
        sectionId: data.id,
        detail: [],
      })
    );
  };
  // When user clicks outside this section, persist all details to Redux
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
            detail: data.detail,
          })
        );
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [data.detail, dispatch, data.id]);

useEffect(() => {
  if (data.detail.length === 0) {
    onAdd();
  }
}, []);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col pt-2 ${editable ? "bg-white rounded-sm" : ""}`}
      onClick={handleEditableSection}
    >
      {/* ====== Toolbar with Add / Remove ====== */}
      <SectionToolbar
        isTextEditor={true}
        onCopy={() => {
          onAdd();
        }}
        onDelete={handleDel}
        mainClass={`transition-all duration-500 ease-in-out ${
          editable ? "block" : "hidden"
        }`}
        isVerticleHeader={isVerticleHeader}
        textEditorPosition={textEditorPosition ?? `top-1 left-[25%]`}
        headerPosition={headerPosition ?? `top-1 right-0`}
        showDot={true}
        dotPosition={dotPosition}
        isDot={isDot}
      />

      {/* ====== Render each detail() from data.detail ====== */}
      <div className="flex flex-col gap-3 divide-y-[1px] px-1 mb-2">
        {data.detail.map((exp, index) => (
          <div
            key={index}
            className="relative"
          >
            <div className={`flex flex-col ${index === 0 ? "mt-0" : "mt-2"}`}>
              {/* Degree / Field of Study */}
              <div
                className={`flex ${
                  term2
                    ? "flex-col items-start justify-start text-left"
                    : "flex-row items-center justify-between"
                }`}
              >
                <div className="w-full">
                  <EditableField
                    html={exp.degree}
                    onChange={(val) => {
                      const updated = [...data.detail];
                      updated[index] = { ...updated[index], degree: val };
                      dispatch(
                        addUserEducation({
                          sectionId: data.id,
                          detail: updated,
                        })
                      );
                    }}
                    placeholder="Degree and Field of Study"
                    style={{
                      color: textAltColor ?? textColor,
                      fontSize: fontSize,
                      fontFamily: fontFamily,
                    }}
                    className="bg-transparent"
                  />
                </div>
                {term3 ? null : (
                  <CustomDatePicker
                    onChange={(dates) => console.log(dates)}
                    dateAlign={term2 ? "justify-start mb-1" : undefined}
                  />
                )}
              </div>

              {/* Location */}
              <div className="w-full">
                <div className="flex items-center justify-start gap-1">
                  <IoLocationSharp className="mb-1 text-indigo-600" size={14} />
                  <EditableField
                    html={exp.location || ""}
                    onChange={(val) => {
                      const updated = [...data.detail];
                      updated[index] = { ...updated[index], location: val };
                      dispatch(
                        addUserEducation({
                          sectionId: data.id,
                          detail: updated,
                        })
                      );
                    }}
                    placeholder="Location"
                    className="bg-transparent text-left"
                    style={{
                      color: textColor,
                      fontSize: fontSize,
                      fontFamily: fontFamily,
                    }}
                  />
                </div>
                {term3 && (
                  <div className="flex flex-col items-start justify-start text-left mb-1">
                    <CustomDatePicker
                      onChange={(dates) => console.log(dates)}
                      dateAlign="justify-start"
                    />
                  </div>
                )}
              </div>

              {/* School or University */}
              <div className="flex items-center justify-between">
                <div className="w-full">
                  <EditableField
                    html={exp.schoolName}
                    onChange={(val) => {
                      const updated = [...data.detail];
                      updated[index] = {
                        ...updated[index],
                        schoolName: val,
                      };
                      dispatch(
                        addUserEducation({
                          sectionId: data.id,
                          detail: updated,
                        })
                      );
                    }}
                    placeholder="School or University"
                    className="bg-transparent"
                    style={{
                      color: textColor,
                      fontSize: fontSize,
                      fontFamily: fontFamily,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Delete Button for this entry */}
            {editable && (
              <div
                className={`absolute bottom-0 -right-8 transition-all duration-300 ease-in-out ${
                  editable ? "opacity-100" : "opacity-0"
                }`}
              >
                <button
                  onClick={()=>handleRemove(index)}
                  className="bg-red-800/20 shadow-md rounded-full text-red-600 text-sm w-6 h-6 flex justify-center items-center"
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

export default AllEducation;
