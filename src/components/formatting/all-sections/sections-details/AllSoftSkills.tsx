'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RootState } from '@/redux/store';
import { addUserSoft_Skills, removeSection, sectionEditMode } from '@/redux/slices/addSectionSlice';
import SectionToolbar from '../../section-toolbar/SectionToolbar';
import EditableField from '@/components/editor/editable-field';

type SoftSkillType = {
  title: string;
  level?: number;
};

type AllSoftSkillsProps = {
  data?: { id: any };
  textColor?: string;
  textAltColor?: string;
  templateColor?: string;
  fontSize?: any;
  fontFamily?: any;
  editableAltBG?: string;
  isPillStyle?: any;
  pillBg?: any;
  pillRounded?: any;
  dotPosition?: any;
  isVerticleHeader?: any;
  headerPosition?: any;
  isDot?: any;
  highlightText?: (text: string) => string;
};

const AllSoftSkills = ({
  data = { id: '' },
  textColor = '#fff',
  textAltColor,
  templateColor,
  fontSize,
  fontFamily,
  editableAltBG,
  isPillStyle,
  pillBg,
  pillRounded,
  dotPosition,
  isVerticleHeader,
  headerPosition,
  isDot,
  highlightText
}: AllSoftSkillsProps) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userSoft_Skills } = useSelector((state: RootState) => state.addSection);
  const [editable, setEditable] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [softskills, setSoftSkills] = useState<SoftSkillType[]>([]);

  const handleEditableSection = () => {
    setEditable(true);
    dispatch(sectionEditMode(true))
  }

  const handleAddSoftSkill = () => {
    setSoftSkills([...softskills, { title: '', level: 0 }]);
  };

  const handleDeleteSoftSkill = (index: number) => {
    if (softskills?.length <= 1 && index === 0) {
      handleRemoveSection();
    }
    const updated = softskills.filter((_, i) => i !== index);
    setSoftSkills(updated);
  };

  const handleInputChange = (
    index: number,
    field: keyof any,
    value: string
  ) => {
    const updated = [...softskills];
    updated[index] = { ...updated[index], [field]: value };
    setSoftSkills(updated);
  };

  const handleRemoveSection = () => {
    dispatch(removeSection(data));
    dispatch(addUserSoft_Skills({ sectionId: data.id, detail: [] }));
  };

  useEffect(() => {
    if (Array.isArray(userSoft_Skills) && userSoft_Skills.length > 0) {
      const normalizedSoftSkills = userSoft_Skills.map(skill => ({
        title: skill.title ?? '',
        level: skill.level ?? 0,
      }));
      setSoftSkills(normalizedSoftSkills);
    } else {
      // Show one default input field if no skills
      setSoftSkills([{ title: '', level: 0 }]);
    }
  }, [userSoft_Skills]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setEditable(false);
        dispatch(sectionEditMode(false))
        const validSoftSkills = softskills.filter(skill => skill.title.trim() !== '');
        dispatch(addUserSoft_Skills({
          sectionId: data.id,
          detail: validSoftSkills
        }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [softskills, dispatch, data.id]);



  return (
    <div ref={containerRef} className={`px-1 py-5 relative ${editable === true ? editableAltBG ? editableAltBG : 'bg-white' : 'bg-transparent'}`} onClick={handleEditableSection}>
      {editable && (
        <SectionToolbar
          isTextEditor={false}
          onCopy={handleAddSoftSkill}
          onDelete={handleRemoveSection}
          isVerticleHeader={isVerticleHeader}
          headerPosition={headerPosition}
          mainClass={`transition-all duration-500 ease-in-out ${editable ? "block " : "hidden"}`}
          showDot={true}
          dotPosition={dotPosition}
          isDot={isDot}
        />
      )}
      <div className="w-full flex flex-wrap gap-2 ">
        {softskills.map((skill, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 !h-[30px] 
              ${isPillStyle && !pillRounded && "rounded-full"} opacity-75 backdrop-blur-[40px] 
              font-medium px-3  transition-all duration-500 ease-in-out 
              ${hoveredIndex === index ? 'max-w-[55%]' : 'max-w-[40%]'}`}
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
            <EditableField
              html={skill.title || ""}
              onChange={(val) => handleInputChange(index, "title", val)}
              // onBlur={() => handleBlur(index)}
              placeholder="Soft Skill"
              placeholderClassName="text-sm mt-[6px]"
              className="bg-transparent text-sm truncate leading-8 focus:outline-none transition-all duration-500 ease-in-out w-[75px] max-w-[85px] opacity-70"
              style={{
                color: textAltColor,
                fontSize: fontSize,
                fontFamily: fontFamily,
              }}
              highlightText={highlightText}
            />
            {hoveredIndex === index && (
              <button onClick={() => handleDeleteSoftSkill(index)} className="opacity-70 hover:opacity-100">
                <RiDeleteBin6Line size={18} style={{ color: textAltColor, }} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSoftSkills;
