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
  addUserProjects,
  removeSection,
  sectionEditMode,
} from "@/redux/slices/addSectionSlice";
import { RiAddCircleFill, RiDeleteBin6Line } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import SectionToolbar from "../../section-toolbar/SectionToolbar";
import EditableField from "@/components/editor/editable-field";

type ProjectType = {
  projectName: string;
  description: string;
  projectUrl: string;
  location?: string;
};

type AllProjectsType = {
  data?: any;
  textColor?: string;
  textAltColor?: string;
  templateColor?: string;
};

const AllProjects = ({
  data = {},
  textColor = "#000",
  textAltColor = "",
  templateColor,
}: AllProjectsType) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userProjects } = useSelector((state: RootState) => state.addSection);
  const [editable, setEditable] = useState<boolean>(false);
  const [projects, setProjects] = useState<ProjectType[]>([
    {
      description: "",
      projectName: "",
      projectUrl: "",
      location: "",
    },
  ]);

  const handleEditableSection = () => {
    setEditable(true);
    dispatch(sectionEditMode(true));
  };
  // Sync local state with Redux store when userProjects changes
  useEffect(() => {
    if (Array.isArray(userProjects) && userProjects.length > 0) {
      setProjects(userProjects);
    }
  }, [userProjects]);

  // Handle changes in the project fields (e.g., name, description)
  const handleInputChange = (
    index: number,
    field: keyof ProjectType,
    value: string
  ) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  // Add a new, empty project entry to the list
  const handleAddProject = () => {
    setProjects([
      ...projects,
      { projectName: "", description: "", projectUrl: "", location: "" },
    ]);
  };

  // Remove the entire section from Redux and clear its data
  const handleRemoveSection = () => {
    if (data) {
      dispatch(removeSection(data));
      dispatch(addUserProjects({ sectionId: data.id, detail: [] }));
    }
  };

  // Delete a specific project from the list based on index
  const handleDelete = (index: number) => {
    if (projects?.length <= 1 && index === 0) {
      handleRemoveSection();
    }
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  // Handle clicks outside the component to exit edit mode and save data to Redux
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        dispatch(sectionEditMode(false));

        setEditable(false);
        dispatch(addUserProjects({ sectionId: data.id, detail: projects }));
      }
    };

    // Attach listener on mount
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [projects, dispatch, data?.id]);

  const handleAddFirstSoftSkill = (value: string) => {
    const newSkill = {
      projectName: value.trim(),
      description: "",
      projectUrl: "",
      location: "",
    };
    if (newSkill.projectName !== "") {
      setProjects([newSkill]);
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
          onCopy={handleAddProject}
          onDelete={handleRemoveSection}
          position={`top-1 right-0 `}
          mainClass={`transition-all duration-500 ease-in-out ${editable ? "block " : "hidden"}`}
          showDot={true}
        />
      )}

      {/* ===== Education Box ===== */}
      <div className="flex flex-col gap-3 divide-y-[1px] px-1 mb-2">
        {projects.map((project, index) => (
          <div key={index} className={`relative pb-6`}>
            <div className="flex flex-col mt-2">
              {/* ====== Degree and Field of Study ====== */}
              <div className="flex items-center justify-between">
                <div className="w-full">
                  <EditableField
                    html={project.projectName || ""}
                    onChange={(val) =>
                      handleInputChange(index, "projectName", val)
                    }
                    placeholder="Project Name"
                    className="text-[16px] bg-transparent"
                    style={{
                      color: textAltColor ? textAltColor : textColor
                    }}
                  />
                </div>
                {/* ====== Date Picker ====== */}
                <CustomDatePicker onChange={(dates) => console.log(dates)} />
              </div>
              {/* ====== Project URL ====== */}
              <div className="flex items-center justify-between">
                <div className="w-full">

                  <EditableField
                    html={project.projectUrl || ""}
                    onChange={(val) =>
                      handleInputChange(index, "projectUrl", val)
                    }
                    placeholder="Project Url"
                    className="text-[16px] bg-transparent"
                    style={{
                      color: textColor
                    }}
                  />
                </div>
                {/* ====== Location ====== */}
                <div className="w-full">
                  <EditableField
                    html={project.location || ""}
                    onChange={(val) =>
                      handleInputChange(index, "location", val)
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
              {/* ====== Description ====== */}
              <div>
                <EditableField
                  html={project.description || ""}
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
            {/* ====== Delete Button ====== */}
            {editable && (
              <div className={`absolute bottom-0 right-0 transition-all duration-300 ease-in-out
                ${editable ? 'opacity-100 ' : 'opacity-0 '}
              `}>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-800/20 shadow-md  text-red-800 text-sm w-6 h-6 flex justify-center items-center rounded-full"
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

export default AllProjects;
