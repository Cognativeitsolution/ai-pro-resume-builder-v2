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
  textColor?: string;
  textAltColor?: string;
  templateColor?: string;
};

const AllCertificates = ({
  data = {},
  textColor,
  textAltColor,
  templateColor
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
      className={`flex flex-col pt-2  ${editable && "bg-white"} `}
      onClick={handleEditableSection}
    >
      {editable && (
        <SectionToolbar
          isTextEditor={true}
          onCopy={handleAddCertificate}
          onDelete={handleRemoveSection}
          position={`top-1 right-0 `}
          mainClass={`transition-all duration-500 ease-in-out ${editable ? "block " : "hidden"}`}
          showDot={true}
        />
      )}
      <div className="flex flex-col gap-3 divide-y-[1px] px-1 mb-2">
        {certificates.length > 0 &&
          certificates.map((cert, index) => (
            <div key={index} className="relative ">
              <div className="flex flex-col mt-2 ">
                {/* ====== Job Title ====== */}
                <div className="flex items-center justify-between">
                  <div className="w-full">
                    <EditableField
                      html={cert.title || ""}
                      onChange={(val) =>
                        handleInputChange(index, "title", val)
                      }
                      placeholder="Title"
                      className="text-[16px] bg-transparent"
                      style={{
                        color: textAltColor ? textAltColor : textColor
                      }}
                    />
                  </div>
                  {/* ====== Date Picker ====== */}
                  <CustomDatePicker onChange={(dates) => console.log(dates)} />
                </div>
                {/* ====== Company Name ====== */}
                <div className="w-full">
                  <EditableField
                    html={cert.institutionName || ""}
                    onChange={(val) =>
                      handleInputChange(index, "institutionName", val)
                    }
                    placeholder="Institution Name"
                    className="text-[16px] bg-transparent"
                    style={{
                      color: textColor
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
                    className="text-[16px] bg-transparent"
                    style={{
                      color: textColor
                    }}
                  />
                </div>
              </div>
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
          ))}
      </div>
    </div>
  );
};

export default AllCertificates;
