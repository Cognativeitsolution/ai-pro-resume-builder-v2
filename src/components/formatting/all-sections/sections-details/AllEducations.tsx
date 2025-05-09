"use client";
import {
  addUserEducation,
  removeSection,
} from "@/redux/slices/addSectionSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { FaPen, FaTrash } from "react-icons/fa";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style
import "react-date-range/dist/theme/default.css"; // theme style
import { format } from "date-fns";

type AllEducationType = {
  data?: any;
};

interface Education {
  DegreeAndField: string;
  InstituteName: string;
  startDate: string;
  endDate: string;
}
type EducationProps = {
  edu: any;
  index: number;
  updateEducationField: (index: number, field: string, value: string) => void;
};

const AllEducations = ({ data = {} }: AllEducationType) => {
  const dispatch = useDispatch();

  const [inputSkill, setInputSkill] = useState<string>("");
  const [allEducationData, setAllEducationData] = useState<string[]>([]);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedSkill, setEditedSkill] = useState<string>("");
  const [showBtns, setShowBtns] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowBtns(false);

        // Dispatch to Redux when clicking outside
        if (allEducationData.length > 0 && data?.id) {
          const EducationPayload = allEducationData.map((skill) => ({
            type: "skill",
            name: skill,
          }));

          dispatch(
            addUserEducation({
              sectionId: data.id,
              detail: EducationPayload,
            })
          );
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [allEducationData, data?.id, dispatch]);

  const handleAddSkill = () => {
    if (inputSkill.trim() !== "") {
      setAllEducationData([...allEducationData, inputSkill.trim()]);
      setInputSkill("");
      setShowInput(false);
    }
  };

  const handleShowInput = () => {
    setShowInput(true);
  };

  const handleRemoveSection = () => {
    if (data) {
      dispatch(removeSection(data));
    }
  };

  const handleDeleteSkill = (index: number) => {
    const updated = allEducationData.filter((_, i) => i !== index);
    setAllEducationData(updated);
  };

  const handleEditSkill = (index: number) => {
    setEditingIndex(index);
    setEditedSkill(allEducationData[index]);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editedSkill.trim() !== "") {
      const updated = [...allEducationData];
      updated[editingIndex] = editedSkill.trim();
      setAllEducationData(updated);
      setEditingIndex(null);
      setEditedSkill("");
    }
  };
  const handleShowEditBtn = () => {
    setShowBtns(true);
  };

  const [education, setEducation] = useState<Education[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const updateEducationField = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };

  const addNewEducation = () => {
    setEducation([
      ...education,
      {
        DegreeAndField: "",
        InstituteName: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const handleDelete = (index: any) => {
    const updated = education.filter((_, i) => i !== index);
    setEducation(updated);
  };

  const [range, setRange] = useState(() => {
    const initialStartDate = education[0]?.startDate
      ? new Date(education[0].startDate)
      : new Date();
    const initialEndDate = education[0]?.endDate
      ? new Date(education[0].endDate)
      : new Date();

    return [
      {
        startDate: initialStartDate,
        endDate: initialEndDate,
        key: "selection",
      },
    ];
  });

  const handleSelect = (index: number, ranges: any) => {
    const start = ranges.selection.startDate;
    const end = ranges.selection.endDate;
    updateEducationField(index, "startDate", format(start, "yyyy-MM-dd"));
    updateEducationField(index, "endDate", format(end, "yyyy-MM-dd"));
    setRange([ranges.selection]);
  };

  return (
    <div
      ref={containerRef}
      className={`border p-4 relative flex flex-col gap-4 ${
        showBtns && "bg-white"
      }`}
      onClick={handleShowEditBtn}
    >
      <h1>{data?.name}</h1>
      {/* Buttons */}
      {showBtns && (
        <div className="flex gap-3 absolute top-2 right-2">
          {!showInput && (
            <button
              className="border px-3 py-1 rounded-md bg-gray-200 cursor-pointer"
              onClick={addNewEducation}
            >
              + Education
            </button>
          )}
          <button
            onClick={handleRemoveSection}
            className="border px-3 py-1 rounded-md bg-gray-200 cursor-pointer"
          >
            Delete
          </button>
        </div>
      )}
     

      {/* Education List */}
      <div className="mt-1 flex flex-wrap gap-2">
        {allEducationData?.length ? (
          allEducationData.map((skill, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                showBtns && "bg-gray-100"
              }`}
            >
              {editingIndex === index ? (
                <>
                  <input
                    className="px-2 py-1 text-sm border rounded"
                    value={editedSkill}
                    onChange={(e) => setEditedSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
                    autoFocus
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="text-green-600 text-xs"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <ul className="list-disc ps-2">
                    <li>{skill}</li>
                  </ul>
                  {showBtns && (
                    <>
                      <button
                        onClick={() => handleEditSkill(index)}
                        className="text-blue-400 text-xs"
                      >
                        <FaPen />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(index)}
                        className="text-red-400 text-xs"
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <span onClick={handleShowInput} className="text-gray-300">
            Add Education
          </span>
        )}
      </div>

      {/* Conditional Input Field */}
      {education.map((edu, index) => (
        <div key={index} className="pb-[5px] space-y-1">
          <input
            type="text"
            value={edu.DegreeAndField}
            placeholder="Degree And Field"
            onChange={(e) =>
              updateEducationField(index, "DegreeAndField", e.target.value)
            }
            className="w-full text-2xl rounded placeholder:text-2xl focus:outline-none focus:ring-0 focus:border-transparent"
          />
          <input
            type="text"
            value={edu.InstituteName}
            placeholder="Institute Name"
            onChange={(e) =>
              updateEducationField(index, "InstituteName", e.target.value)
            }
            className="w-full focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-blue-400"
          />
          <div className="relative">
            <input
              type="text"
              readOnly
              value={`${format(range[0].startDate, "yyyy-MM-dd")} to ${format(
                range[0].endDate,
                "yyyy-MM-dd"
              )}`}
              onClick={() => setShowCalendar(!showCalendar)}
              placeholder="Date Period"
              className="w-full cursor-pointer"
            />

            {showCalendar && (
              <div className="absolute z-50 mt-2 shadow-lg">
                <DateRange
                  editableDateInputs={true}
                  onChange={(ranges: any) => handleSelect(index, ranges)}
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                />
              </div>
            )}
          </div>

          <div className="text-right">
            <button
              onClick={() => handleDelete(index)}
              className="text-red-600 text-sm"
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ))}

      {/* Add New Experience Button */}
     
    </div>
  );
};

export default AllEducations;
