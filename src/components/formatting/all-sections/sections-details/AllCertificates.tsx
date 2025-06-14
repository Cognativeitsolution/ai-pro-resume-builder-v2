"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  addUserCertificates,
  removeSection,
  sectionEditMode,
} from "@/redux/slices/addSectionSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import CustomDatePicker from "../../custom/CustomDatePicker";
import SectionToolbar from "../../section-toolbar/SectionToolbar";
import EditableField from "@/components/editor/editable-field";
import { ImMoveDown, ImMoveUp } from "react-icons/im";
import AiRobo from "../../aiAssistant/AiRobo";

type CertificateType = {
  title: string;
  description: string;
  institutionName: string;
};

type AllSummaryType = {
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

const AllCertificates = ({
  data = {},
  textColor,
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
}: AllSummaryType) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userCertificates } = useSelector(
    (state: RootState) => state.addSection
  );
  const [editable, setEditable] = useState(false);
  const [editableIndex, setEditableIndex] = useState<any>();
  const [certificates, setCertificates] = useState<CertificateType[]>([
    {
      description: "",
      institutionName: "",
      title: "",
    },
  ]);

  useEffect(() => {
    if (Array.isArray(userCertificates) && userCertificates.length > 0) {
      const normalizedCertificates = userCertificates.map((Certificate) => ({
        title: Certificate.title ?? "",
        description: Certificate.description ?? "",
        institutionName: Certificate.institutionName ?? "",
      }));
      setCertificates(normalizedCertificates);
    }
  }, [userCertificates]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setEditable(false);
        dispatch(sectionEditMode(false))
        const validCertificates = certificates.filter(
          certificate => certificate.title.trim() && certificate.institutionName.trim()
        );

        // Only dispatch if something actually changed or is valid
        if (validCertificates.length > 0) {
          dispatch(addUserCertificates({
            sectionId: data.id,
            detail: validCertificates
          }));
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [certificates, dispatch, data.id]);

  const handleEditableSection = () => {
    setEditable(true);
    dispatch(sectionEditMode(true));
  };

  const handleAddCertificate = () => {
    const newIndex = certificates.length;
    setCertificates([
      ...certificates,
      { title: "", description: "", institutionName: "" },
    ]);
    setEditableIndex(newIndex);
    dispatch(sectionEditMode(true));
  };

  const handleRemoveSection = () => {
    if (data) {
      dispatch(removeSection(data));
      dispatch(addUserCertificates({ sectionId: data.id, detail: [] }));
    }
  };

  const handleInputChange = (
    index: number,
    field: keyof CertificateType,
    value: string
  ) => {
    const updated = [...certificates];
    updated[index] = { ...updated[index], [field]: value };
    setCertificates(updated);
  };

  const handleDelete = (index: number) => {
    if (certificates?.length <= 1 && index === 0) {
      handleRemoveSection();
    }
    const updated = certificates.filter((_, i) => i !== index);
    setCertificates(updated);
  };
  const moveItem = (arr: any[], from: number, to: number) => {
    const updated = [...arr];
    const [movedItem] = updated.splice(from, 1);
    updated.splice(to, 0, movedItem);
    return updated;
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const updated = moveItem(certificates, index, index - 1);
    setCertificates(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index >= certificates.length - 1) return;
    const updated = moveItem(certificates, index, index + 1);
    setCertificates(updated);
  };

  const handleEditableIndex = (index: number) => {
    setEditableIndex(index);
    dispatch(sectionEditMode(true));
  };
  return (
    <div
      ref={containerRef}
      className={`flex flex-col`}
      onClick={handleEditableSection}>
      {editable && (
        <SectionToolbar
          isTextEditor={true}
          onCopy={handleAddCertificate}
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
      <div className="flex flex-col gap-3 divide-y-[1px] mb-2">
        {certificates.length > 0 &&
          certificates.map((cert, index) => (
            <div key={index}
              onClick={() => handleEditableIndex(index)}
              className={`${editable && editableIndex === index ? 'bg-white rounded-sm' : 'bg-transparent'} relative p-2`}
            >
              <div className={`flex flex-col ${index === 0 ? 'mt-0' : 'mt-2'}`}>
                {/* ====== Certificate Title ====== */}
                <div className={`flex ${term2 || term3 ? "flex-col items-start justify-start text-left" : "flex-row items-center justify-between"} `}>
                  <div className="w-full">
                    <EditableField
                      html={cert.title || ""}
                      onChange={(val) =>
                        handleInputChange(index, "title", val)
                      }
                      placeholder="Certificate Title"
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
                  <CustomDatePicker onChange={(dates) => console.log(dates)} dateAlign={term2 || term3 && "justify-start  mb-1"} />
                </div>

                {/* ====== Institute Name ====== */}
                <div className="w-full">
                  <EditableField
                    html={cert.institutionName || ""}
                    onChange={(val) =>
                      handleInputChange(index, "institutionName", val)
                    }
                    placeholder="Institution Name"
                    className="bg-transparent !text-[14px]"
                    placeholderClassName="!text-[14px]"
                    style={{
                      color: textColor,
                      fontSize: fontSize,
                      fontFamily: fontFamily,
                    }}
                  />
                </div>

                {/* ====== Description ====== */}
                <div>
                  <EditableField
                    html={cert.description || ""}
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
                  {editable && editableIndex === index && (
                    <AiRobo
                      input={false}
                      positionClass="-left-[75px] hover:-left-[159px] top-5"
                      info={
                        cert.title?.trim()
                          ? "Generate ideas for new bullets."
                          : "Please include more information in your resume and I will help you with improving and tailoring it."
                      }
                    />
                  )}
                </div>
              </div>

              {/* ====== Delete Button ====== */}
              {editable && editableIndex === index && (
                <div className={`absolute bottom-0 -right-9 gap-1 flex flex-col transition-all duration-300 ease-in-out ${editable ? 'opacity-100 ' : 'opacity-0 '}`}>
                  {certificates?.length > 1 &&
                    <button
                      onClick={() => handleMoveUp(index)}
                      className="bg-indigo-600/15 backdrop-blur-lg  rounded-full text-indigo-600 text-sm w-6 h-6 flex justify-center items-center hover:scale-105 transition-transform duration-300"
                      title="Move up"
                    >
                      <ImMoveUp size={14} />
                    </button>}
                  {certificates?.length > 1 && <button
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

export default AllCertificates;
