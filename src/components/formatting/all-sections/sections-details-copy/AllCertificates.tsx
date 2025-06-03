"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  addUserCertificates,
  removeSection,
  sectionEditMode,
} from "@/redux/slices/addSectionSlice";
import { RiAddCircleFill, RiDeleteBin6Line } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import CustomDatePicker from "../../custom/CustomDatePicker";
import SectionToolbar from "../../section-toolbar/SectionToolbar";
import EditableField from "@/components/editor/editable-field";

type CertificateType = {
  title: string;
  description: string;
  institutionName: string;
};

type AllSummaryType = {
  data?: any;
  onRemove: () =>void;
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
};

const AllCertificates = ({
  data = {},
  onRemove,
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
  isDot
}: AllSummaryType) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userCertificates } = useSelector(
    (state: RootState) => state.addSection
  );
  const [editable, setEditable] = useState(false);
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
    setCertificates([
      ...certificates,
      { title: "", description: "", institutionName: "" },
    ]);
  };

  const handleRemoveSection = () => {
    if (data) {
      onRemove()
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

  return (
    <div
      ref={containerRef}
      className={`flex flex-col pt-2  ${editable && "bg-white rounded-sm"} `}
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
      <div className="flex flex-col gap-3 divide-y-[1px] px-1 mb-2">
        {certificates.length > 0 &&
          certificates.map((cert, index) => (
            <div key={index} className="relative ">
              <div className={`flex flex-col ${index === 0 ? 'mt-0' : 'mt-2'}`}>
                {/* ====== Job Title ====== */}
                <div className={`flex ${term2 || term3 ? "flex-col items-start justify-start text-left" : "flex-row items-center justify-between"} `}>
                  <div className="w-full">
                    <EditableField
                      html={cert.title || ""}
                      onChange={(val) =>
                        handleInputChange(index, "title", val)
                      }
                      placeholder="Title"
                      className="bg-transparent"
                      style={{
                        color: textAltColor ? textAltColor : textColor,
                        fontSize: fontSize,
                        fontFamily: fontFamily,
                      }}
                    />
                  </div>
                  {/* ====== Date Picker ====== */}
                  <CustomDatePicker onChange={(dates) => console.log(dates)} dateAlign={term2 || term3 && "justify-start  mb-1"} />
                </div>
                {/* ====== Company Name ====== */}
                <div className="w-full">
                  <EditableField
                    html={cert.institutionName || ""}
                    onChange={(val) =>
                      handleInputChange(index, "institutionName", val)
                    }
                    placeholder="Institution Name"
                    className="bg-transparent"
                    style={{
                      color: textColor,
                      fontSize: fontSize,
                      fontFamily: fontFamily,
                    }}
                  />
                </div>
                <div>
                  <EditableField
                    html={cert.description || ""}
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
              {editable && (
                <div className={`absolute bottom-0 -right-8 transition-all duration-300 ease-in-out
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
          ))}
      </div>
    </div>
  );
};

export default AllCertificates;
