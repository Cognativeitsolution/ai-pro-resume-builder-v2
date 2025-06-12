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
import { IoLocationSharp } from "react-icons/io5";

type ProjectType = {
  projectName: string;
  description: string;
  projectUrl: string;
  location?: string;
};

type AllProjectsType = {
  data: { id: number; name: string; detail: ProjectType[] };
    onRemove: () => void;
  onDelete: () => void;
  onAdd: () => void;
  onAddVar: () => void;
  textColor?: string;
  textAltColor?: string;
  templateColor?: string;
  term2?: any;
  term3?: any;
  dotPosition?: any;
  isVerticleHeader?: any;
  headerPosition?: any;
  textEditorPosition?: any;
  isDot?: any;
};

const AllProjects = ({
  data,
  onRemove,
  onAdd,
  onAddVar,
  onDelete,
  textColor = "#000",
  textAltColor = "",
  templateColor,
  term2,
  term3,
  dotPosition,
  isVerticleHeader,
  headerPosition,
  textEditorPosition,
  isDot
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

  useEffect(() => {
    if (Array.isArray(userProjects) && userProjects.length > 0) {
      setProjects(userProjects);
    }
  }, [userProjects]);

  const handleInputChange = (
    index: number,
    field: keyof ProjectType,
    value: string
  ) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const handleAddProject = () => {
    setProjects([
      ...projects,
      { projectName: "", description: "", projectUrl: "", location: "" },
    ]);
  };

  const handleRemoveSection = () => {
    if (data) {
      onDelete()
      dispatch(removeSection(data));
      dispatch(addUserProjects({ sectionId: data.id, detail: [] }));
    }
  };

  const handleDelete = (index: number) => {
    if (projects?.length <= 1 && index === 0) {
      handleRemoveSection();
      return
    }
    const updated = projects.filter((_, i) => i !== index);
    onRemove()
    setProjects(updated);
  };

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

    document.addEventListener("mousedown", handleClickOutside);

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
useEffect(() => {
  if (data.detail.length === 0) {
    onAdd();
  }
}, []);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col pt-2 ${editable ? 'bg-white rounded-sm' : ''}`}
      onClick={handleEditableSection}
    >
      {/* ====== Add and Delete Section Buttons ====== */}
      {editable && (
        <SectionToolbar
          isTextEditor={true}
          onCopy={()=>onAddVar()}
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

      {/* ===== Education Box ===== */}
      <div className="flex flex-col gap-3 divide-y-[1px] px-1 mb-2">
        {data.detail.map((project, index) => (
          <div key={index} className={`relative`}>
            <div className={`flex flex-col ${index === 0 ? 'mt-0' : 'mt-2'}`}>
              {/* ====== Degree and Field of Study ====== */}
              <div className={`flex ${term2 ? "flex-col items-start justify-start text-left" : "flex-row items-center justify-between"} `}>
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
                {term3 ? null :
                  <CustomDatePicker onChange={(dates) => console.log(dates)} dateAlign={term2 && "justify-start mb-1"} />
                }
              </div>
              <div>
                <div>
                  {/* ====== Location ====== */}
                  <div className="flex items-center justify-start gap-1 ">
                    {/* ====== Icon ====== */}
                    <IoLocationSharp className="mb-1 text-indigo-600" size={14} />
                    <EditableField
                      html={project.location || ""}
                      onChange={(val) =>
                        handleInputChange(index, "location", val)
                      }
                      placeholder="Location"
                      className={`text-[16px] bg-transparent`}
                      style={{
                        color: textColor
                      }}
                    />
                  </div>
                  {term3 ?
                    <div className={`flex flex-col items-start justify-start text-left  mb-1`}>
                      <CustomDatePicker onChange={(dates) => console.log(dates)} dateAlign={term3 && "justify-start"} />
                    </div> : null}
                </div>

                {/* ====== Project URL ====== */}
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
              <div className={`absolute bottom-0 -right-8 transition-all duration-300 ease-in-out
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
