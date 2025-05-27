"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TiDelete } from "react-icons/ti";
import { RiAddCircleFill, RiDeleteBin6Line } from "react-icons/ri";
import { RootState } from "@/redux/store";
import {
  addUserSoft_Skills,
  removeSection,
  sectionEditMode,
} from "@/redux/slices/addSectionSlice";
import SectionToolbar from "../../section-toolbar/SectionToolbar";

type SoftSkillType = {
  title: string;
  level?: number;
};

type AllSoftSkillsProps = {
  data?: { id: any };
  textColor?: string;
  textAltColor?: string;
  templateColor?: string;
  editableAltBG?: string;
  isPillStyle?: any;
  pillBg?: any;
  pillRounded?: any;
};

const AllSoftSkills = ({
  data = { id: "" },
  textColor = "#fff",
  textAltColor,
  templateColor,
  editableAltBG,
  isPillStyle,
  pillBg,
  pillRounded,
}: AllSoftSkillsProps) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userSoft_Skills } = useSelector(
    (state: RootState) => state.addSection
  );
  const [editable, setEditable] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [softskills, setSoftSkills] = useState<SoftSkillType[]>([
    {
      title: "",
      level: 0,
    },
  ]);

  useEffect(() => {
    if (Array.isArray(userSoft_Skills) && userSoft_Skills.length > 0) {
      const normalizedSoftSkills = userSoft_Skills.map((skill) => ({
        title: skill.title ?? "",
        level: skill.level ?? 0,
      }));
      setSoftSkills(normalizedSoftSkills);
    }
  }, [userSoft_Skills]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setEditable(false);
        dispatch(sectionEditMode(false));
        const validSoftSkills = softskills.filter(
          (skill) => skill.title.trim() !== ""
        );
        dispatch(
          addUserSoft_Skills({
            sectionId: data.id,
            detail: validSoftSkills,
          })
        );
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [softskills, dispatch, data.id]);

  const handleEditableSection = () => {
    setEditable(true);
    dispatch(sectionEditMode(true));
  };
  const handleAddSoftSkill = () => {
    setSoftSkills([...softskills, { title: "", level: 0 }]);
  };

  const handleRemoveSection = () => {
    dispatch(removeSection(data));
    dispatch(addUserSoft_Skills({ sectionId: data.id, detail: [] }));
  };

  const handleInputChange = (index: number, value: string) => {
    const updated = [...softskills];
    updated[index].title = value;
    setSoftSkills(updated);
  };

  const handleDeleteSoftSkill = (index: number) => {
    if (softskills?.length <= 1 && index === 0) {
      handleRemoveSection();
    }
    const updated = softskills.filter((_, i) => i !== index);
    setSoftSkills(updated);
  };

  const handleBlur = (index: number) => {
    if (softskills[index]?.title.trim() === "") {
      const updated = softskills.filter((_, i) => i !== index);
      setSoftSkills(updated);
    }
  };

  const handleAddFirstSoftSkill = (value: string) => {
    const newSkill = { title: value.trim(), level: 0 };
    if (newSkill.title !== "") {
      setSoftSkills([newSkill]);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`px-1 py-5 ${editable === true
        ? editableAltBG
          ? editableAltBG
          : "bg-white"
        : "bg-transparent"
        }`}
      onClick={handleEditableSection}
    >
      {/* ====== Add and Delete Section Buttons ====== */}
      {editable && (
        <SectionToolbar
          isTextEditor={false}
          onCopy={handleAddSoftSkill}
          onDelete={handleRemoveSection}
          position={`-top-[154px] right-[72px] `}
          mainClass={`transition-all rotate-90 duration-500 ease-in-out ${editable ? "block " : "hidden"}`}
          showDot={true}
          dotClass={`top-[30px] left-[48px]`}
        />
      )}
      <div className="flex flex-wrap gap-2 ">
        {softskills.length > 0 ?
          softskills.map((skill, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 
              ${isPillStyle && !pillRounded && "rounded-full"} opacity-75  backdrop-blur-[40px] 
              font-medium px-3  transition-all duration-500 ease-in-out 
              ${hoveredIndex === index ? "pr-5" : ""}`}
              style={{
                color: textColor,
                background: isPillStyle && pillBg ? pillBg : textColor,
                border: isPillStyle && `1px solid ${textColor}`,
                borderBottom: `2px solid ${textColor}`,
                borderRadius: pillRounded
              }}
              onMouseOver={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setHoveredIndex(index);
                }
              }}
              onMouseOut={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setHoveredIndex(null);
                }
              }}
            >
              <input
                value={skill.title}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onBlur={() => handleBlur(index)}
                placeholder="Soft Skill"
                className="bg-transparent  text-sm truncate leading-8  focus:outline-none transition-all duration-500 ease-in-out w-[115px] opacity-70 "
                style={{ color: textAltColor }}
                autoFocus
              />

              <div className="w-6 relative">
                <div className={`transition-all duration-300 ease-in-out transform absolute right-0 -top-2  ${hoveredIndex === index ? 'translate-x-0 opacity-100' : 'translate-x-3 opacity-0'}`} >
                  <button
                    onClick={() => {
                      if (index > 0) return handleDeleteSoftSkill(index);
                      return handleRemoveSection();
                    }}
                    className="text-red-600"
                  >
                    <RiDeleteBin6Line size={18} style={{ color: textAltColor }} />
                  </button>
                </div>
              </div>
            </div>
          ))
          : (
            <div
              className={`flex items-center gap-2 ${isPillStyle && !pillRounded && "rounded-full"} opacity-75 backdrop-blur-[40px]  font-medium px-3 py-1 transition-all duration-500 ease-in-out `}
              style={{
                color: textColor,
                background: isPillStyle && pillBg ? pillBg : textColor,
                border: isPillStyle && `1px solid ${textColor}`,
                borderBottom: `2px solid ${textColor}`,
                borderRadius: isPillStyle
              }}
            >
              <input
                value={''}
                onChange={(e) => handleAddFirstSoftSkill(e.target.value)}
                placeholder="Soft Skill"
                className="bg-transparent text-sm placeholder:text-sm focus:outline-none "
                style={{ color: textAltColor, }}
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default AllSoftSkills;
