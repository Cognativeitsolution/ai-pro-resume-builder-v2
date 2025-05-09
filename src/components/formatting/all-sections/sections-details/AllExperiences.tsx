"use client";
import {
  addUserExperience,
  removeSection,
} from "@/redux/slices/addSectionSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { format } from "date-fns";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style
import "react-date-range/dist/theme/default.css"; // theme style

type AllExperienceType = {
  data?: any;
};

interface Experience {
  title: string;
  companyName: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}
type ExperienceProps = {
  exp: any;
  index: number;
  updateExperienceField: (index: number, field: string, value: string) => void;
};

const AllExperiences = ({ data = {} }: AllExperienceType) => {
  const dispatch = useDispatch();

  const [allExperienceData, setAllExperienceData] = useState<string[]>([]);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedSkill, setEditedSkill] = useState<string>("");
  const [showBtns, setShowBtns] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowBtns(false);

        // Dispatch to Redux when clicking outside
        if (allExperienceData.length > 0 && data?.id) {
          const ExperiencePayload = allExperienceData.map((skill) => ({
            type: "skill",
            name: skill,
          }));

          dispatch(
            addUserExperience({
              sectionId: data.id,
              detail: ExperiencePayload,
            })
          );
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [allExperienceData, data?.id, dispatch]);

  const handleSaveEdit = () => {
    if (editingIndex !== null && editedSkill.trim() !== "") {
      const updated = [...allExperienceData];
      updated[editingIndex] = editedSkill.trim();
      setAllExperienceData(updated);
      setEditingIndex(null);
      setEditedSkill("");
    }
  };
  const handleShowEditBtn = () => {
    setShowBtns(true);
  };

  const [experiences, setExperiences] = useState<Experience[]>([]);

  const updateExperienceField = (
    index: number,
    field: keyof Experience,
    value: string
  ) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  const addNewExperience = () => {
    setExperiences([
      ...experiences,
      {
        title: "",
        companyName: "",
        startDate: "",
        endDate: "",
        location: "",
        description: "",
      },
    ]);
  };

  const handleDelete = (index: any) => {
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
  };

  const [range, setRange] = useState(() => {
    const initialStartDate = experiences[0]?.startDate
      ? new Date(experiences[0].startDate)
      : new Date();
    const initialEndDate = experiences[0]?.endDate
      ? new Date(experiences[0].endDate)
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
    updateExperienceField(index, "startDate", format(start, "yyyy-MM-dd"));
    updateExperienceField(index, "endDate", format(end, "yyyy-MM-dd"));
    setRange([ranges.selection]);
  };

  return (
    <div
      ref={containerRef}
      className={`border p-4 relative flex flex-col gap-4 ${showBtns && "bg-white"
        }`}
      onClick={handleShowEditBtn}
    >
      <h1>{data?.name}</h1>
      {/* Buttons */}
      {/* {showBtns && (
        <div className="flex gap-3 absolute top-2 right-2">
          {!showInput && (
            <button
              className="border px-3 py-1 rounded-md bg-gray-200 cursor-pointer"
              onClick={handleShowInput}
            >
              + Experience
            </button>
          )}
          <button
            onClick={handleRemoveSection}
            className="border px-3 py-1 rounded-md bg-gray-200 cursor-pointer"
          >
            Delete
          </button>
        </div>
      )} */}

      {/* Experience List */}
      <div className="mt-1 flex flex-wrap gap-2">
        {allExperienceData?.length
          ? allExperienceData.map((skill, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${showBtns && "bg-gray-100"
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
                // <>
                //   <ul className='list-disc ps-2'>
                //     <li>{skill}</li>
                //   </ul>
                //   {showBtns &&
                //     <>
                //       <button onClick={() => handleEditSkill(index)} className="text-blue-400 text-xs">
                //         <FaPen />
                //       </button>
                //       <button onClick={() => handleDeleteSkill(index)} className="text-red-400 text-xs">
                //         <FaTrash />
                //       </button>
                //     </>
                //   }
                // </>
                ""
              )}
            </div>
          ))
          : // <span onClick={handleShowInput} className="text-gray-300">
          //   Add Experience
          // </span>
          ""}
      </div>

      {/* Conditional Input Field */}
      {experiences.map((exp, index) => (
        <div key={index} className="pb-[5px] space-y-1">
          <input
            type="text"
            value={exp.title}
            placeholder="Title"
            onChange={(e) =>
              updateExperienceField(index, "title", e.target.value)
            }
            className="w-full text-2xl rounded placeholder:text-2xl focus:outline-none focus:ring-0 focus:border-transparent"
          />
          <input
            type="text"
            value={exp.companyName}
            placeholder="Company Name"
            onChange={(e) =>
              updateExperienceField(index, "companyName", e.target.value)
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
          <input
            type="text"
            value={exp.location}
            placeholder="Location"
            onChange={(e) =>
              updateExperienceField(index, "location", e.target.value)
            }
            className="w-full focus:outline-none focus:ring-0 focus:border-transparent"
          />
          <textarea
            value={exp.description}
            placeholder="Company Description"
            onChange={(e) =>
              updateExperienceField(index, "description", e.target.value)
            }
            rows={2}
            className="w-full focus:outline-none focus:ring-0 focus:border-transparent"
          ></textarea>
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
      <button
        onClick={addNewExperience}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Add New Experience
      </button>
    </div>
  );
};

export default AllExperiences;
