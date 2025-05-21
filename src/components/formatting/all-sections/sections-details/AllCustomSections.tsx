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
};

const AllCustomSection = ({
  secNewNames,
  data = {},
  textColor = "#000",
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
      className={`flex flex-col gap-4 ${editable && "bg-white"}`}
      onClick={handleEditableSection}
    >
      {/* ====== Add and Delete Section Buttons ====== */}
      {editable && (
        <SectionToolbar
          isTextEditor={true}
          onCopy={handleAddCustomSection}
          onDelete={handleRemoveSection}
          // onMoveUp={handleAddAward}
          position="top-7 right-0"
          showDot={true}
        />
      )}
      {/* ===== Section Box ===== */}
      <div className="flex flex-col gap-3 divide-y-[1px] px-1 ">
        {customSections.length > 0 &&
          customSections.map((exp, index) => (
            <div key={index}>
              <div className="flex flex-col mt-2">

                <div className="flex items-center justify-between gap-1">

                  {/* ====== Icon ====== */}
                  {hasField("Icon") && (
                    <FaHome className="text-[22px] mb-1 text-indigo-600" />
                  )}

                  {/* ====== Job Title ====== */}
                  {hasField("Title") && (
                    <EditableField
                      html={exp.title || ""}
                      onChange={(val) => handleInputChange(index, "title", val)}
                      placeholder="Title"
                      className="text-[16px] bg-transparent"
                      placeholderClassName=""
                    />
                  )}

                  {/* ====== Date Picker ====== */}
                  {hasField("Date") && (
                    <CustomDatePicker onChange={(dates) => console.log(dates)} />
                  )}
                </div>
                {/* ====== Location ====== */}
                {hasField("Location") && (
                  <EditableField
                    html={exp.location || ""}
                    onChange={(val) => handleInputChange(index, "location", val)}
                    placeholder="Location"
                    className="text-[16px] bg-transparent"
                    placeholderClassName=""
                  />
                )}
                {/* ====== Description ====== */}

                {hasField("Description") && (
                  <EditableField
                    html={exp.description || ""}
                    onChange={(val) =>
                      handleInputChange(index, "description", val)
                    }
                    placeholder="Description"
                    className="text-[16px] bg-transparent"
                    placeholderClassName=""
                  />
                )}
              </div>
              {/* ====== Delete Button ====== */}
              <div className="flex justify-end mt-2">
                <button
                  className="bg-red-800/30 text-red-800 text-sm w-6 h-6 flex justify-center items-center rounded-l-sm"
                  onClick={() => {
                    if (index > 0) return handleDelete(index);
                    return handleRemoveSection()
                  }}
                >
                  <RiDeleteBin6Line size={16} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllCustomSection;
