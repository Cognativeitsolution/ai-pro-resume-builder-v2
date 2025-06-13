'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TiDelete } from 'react-icons/ti';
import { RiAddCircleFill, RiDeleteBin6Line } from 'react-icons/ri';
import { RootState } from '@/redux/store';
import { addUserTechnical_Skills, removeSection, sectionEditMode } from '@/redux/slices/addSectionSlice';
import SectionToolbar from '../../section-toolbar/SectionToolbar';

type TechnicalSkillType = {
  title: string;
  level?: number;
};

type AllTechnicalSkillsProps = {
  data: { id: number; name:string; detail:TechnicalSkillType[] };
  onRemove:()=>void
  onAddVar:()=>void
  onDelete:()=>void
  onAdd:()=>void
  textColor?: string; 
  textAltColor?: string;
  templateColor?: string;
  editableAltBG?: string;
  isPillStyle?: any;
  pillBg?: any;
  pillRounded?: any;
  dotPosition?: any;
  isVerticleHeader?: any;
  headerPosition?: any;
  isDot?: any;
};

const AllTechnicalSkills = ({
  data,
  onRemove,
  onAddVar,
  onDelete,
  onAdd,
  textColor = '#fff',
  textAltColor,
  templateColor,
  editableAltBG,
  isPillStyle,
  pillBg,
  pillRounded,
  dotPosition,
  isVerticleHeader,
  headerPosition,
  isDot
}: AllTechnicalSkillsProps) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userTechnical_Skills } = useSelector((state: RootState) => state.addSection);
  const [editable, setEditable] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [technicalskills, setTechnicalSkills] = useState<TechnicalSkillType[]>([]);

  useEffect(() => {
    if (Array.isArray(userTechnical_Skills) && userTechnical_Skills.length > 0) {
      const normalizedTechnicalSkills = userTechnical_Skills.map(skill => ({
        title: skill.title ?? '',
        level: skill.level ?? 0,
      }));
      setTechnicalSkills(normalizedTechnicalSkills);
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

  const handleEditableSection = () => {
    setEditable(true);
    dispatch(sectionEditMode(true))
  }

  const handleAddTechnicalSkill = () => {
    setTechnicalSkills([...technicalskills, { title: '', level: 0 }]);
  };

  const handleDeleteTechnicalSkill = (index: number) => {
    if (technicalskills?.length == 1 ) {
      handleRemoveSection();
    }
    onRemove()
    const updated = technicalskills.filter((_, i) => i !== index);
    setTechnicalSkills(updated);
  };

  const handleInputChange = (index: number, value: string) => {
    const updated = [...technicalskills];
    updated[index].title = value;
    setTechnicalSkills(updated);
  };

  const handleRemoveSection = () => {
    onDelete()
    dispatch(removeSection(data));
    dispatch(addUserTechnical_Skills({ sectionId: data.id, detail: [] }));
  };

  const handleAddFirstTechnicalSkill = (value: string) => {
    const newSkill = { title: value.trim(), level: 0 };
    if (newSkill.title !== '') {
      setTechnicalSkills([newSkill]);
    }
  };

  const handleBlur = (index: number) => {
    if (technicalskills[index]?.title.trim() === '') {
      const updated = technicalskills.filter((_, i) => i !== index);
      setTechnicalSkills(updated);
    }
  };



  useEffect(() => {
  if (data.detail.length === 0) {
    onAdd();
  }
}, []);


  return (
    <div ref={containerRef} className={`px-1 py-5 relative ${editable === true ? editableAltBG ? editableAltBG : 'bg-white' : 'bg-transparent'}`} onClick={handleEditableSection}>
      {editable && (
        <SectionToolbar
          isTextEditor={false}
          onCopy={()=>onAddVar()}
          onDelete={handleRemoveSection}
          isVerticleHeader={isVerticleHeader}
          headerPosition={headerPosition}
          mainClass={`transition-all duration-500 ease-in-out ${editable ? "block " : "hidden"}`}
          showDot={true}
          dotPosition={dotPosition}
          isDot={isDot}
        />
      )}
      <div className="flex flex-wrap gap-2 ">
        {data.detail.length > 0 ? data.detail.map((skill, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 
              ${isPillStyle && !pillRounded && "rounded-full"} opacity-75 backdrop-blur-[40px] 
              font-medium px-3  transition-all duration-500 ease-in-out 
              ${hoveredIndex === index ? 'pr-5' : ''}`}
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
              placeholder="Technical Skill"
              className="bg-transparent  text-sm truncate leading-8  focus:outline-none transition-all duration-500 ease-in-out w-[115px] opacity-70"
              style={{ color: textAltColor, }}
              autoFocus
            />
            {hoveredIndex === index && (
              <button onClick={() => handleDeleteTechnicalSkill(index)} className="opacity-70 hover:opacity-100">
                <RiDeleteBin6Line size={18} style={{ color: textAltColor, }} />
              </button>
            )}
          </div>
        )) : (
          <div
            className={`flex items-center gap-2 
            ${isPillStyle && !pillRounded && "rounded-full"} opacity-75 backdrop-blur-[40px] 
            font-medium px-3 py-1 transition-all duration-500 ease-in-out `}
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
              onChange={(e) => handleAddFirstTechnicalSkill(e.target.value)}
              placeholder="Technical Skill"
              className="bg-transparent text-sm placeholder:text-sm focus:outline-none "
              style={{ color: textAltColor, }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTechnicalSkills;
