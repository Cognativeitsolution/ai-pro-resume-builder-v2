'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RootState } from '@/redux/store';
import { addUserTechnical_Skills, removeSection, sectionEditMode } from '@/redux/slices/addSectionSlice';
import SectionToolbar from '../../section-toolbar/SectionToolbar';
import EditableField from '@/components/editor/editable-field';

type TechnicalSkillType = {
  title: string;
  level?: number;
};

type AllTechnicalSkillsProps = {
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

const AllTechnicalSkills = ({
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
}: AllTechnicalSkillsProps) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userTechnical_Skills } = useSelector((state: RootState) => state.addSection);
  const [editable, setEditable] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [technicalskills, setTechnicalSkills] = useState<TechnicalSkillType[]>([]);

  const handleEditableSection = () => {
    setEditable(true);
    dispatch(sectionEditMode(true))
  }

  const handleAddTechnicalSkill = () => {
    setTechnicalSkills([...technicalskills, { title: '', level: 0 }]);
  };

  const handleDeleteTechnicalSkill = (index: number) => {
    if (technicalskills?.length <= 1 && index === 0) {
      handleRemoveSection();
    }
    const updated = technicalskills.filter((_, i) => i !== index);
    setTechnicalSkills(updated);
  };

  const handleInputChange = (
    index: number,
    field: keyof any,
    value: string
  ) => {
    const updated = [...technicalskills];
    updated[index] = { ...updated[index], [field]: value };
    setTechnicalSkills(updated);
  };

  const handleRemoveSection = () => {
    dispatch(removeSection(data));
    dispatch(addUserTechnical_Skills({ sectionId: data.id, detail: [] }));
  };

  useEffect(() => {
    if (Array.isArray(userTechnical_Skills) && userTechnical_Skills.length > 0) {
      const normalizedTechnicalSkills = userTechnical_Skills.map(skill => ({
        title: skill.title ?? '',
        level: skill.level ?? 0,
      }));
      setTechnicalSkills(normalizedTechnicalSkills);
    } else {
      // Show one default input field if no skills
      setTechnicalSkills([{ title: '', level: 0 }]);
    }
  }, [userTechnical_Skills]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setEditable(false);
        dispatch(sectionEditMode(false))
        const validTechnicalSkills = technicalskills.filter(skill => skill.title.trim() !== '');
        dispatch(addUserTechnical_Skills({
          sectionId: data.id,
          detail: validTechnicalSkills
        }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [technicalskills, dispatch, data.id]);



  return (
    <div ref={containerRef} className={`px-1 py-5 relative ${editable === true ? editableAltBG ? editableAltBG : 'bg-white' : 'bg-transparent'}`} onClick={handleEditableSection}>
      {editable && (
        <SectionToolbar
          isTextEditor={false}
          onCopy={handleAddTechnicalSkill}
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
        {technicalskills.map((skill, index) => (
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
              placeholder="Tech Skill"
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
              <button onClick={() => handleDeleteTechnicalSkill(index)} className="opacity-70 hover:opacity-100">
                <RiDeleteBin6Line size={18} style={{ color: textAltColor, }} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTechnicalSkills;
