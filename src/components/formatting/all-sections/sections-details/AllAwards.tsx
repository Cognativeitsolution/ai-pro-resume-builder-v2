'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RootState } from '@/redux/store';
import { addUserAwards, removeSection, sectionEditMode } from '@/redux/slices/addSectionSlice';
import { FaAward } from 'react-icons/fa';
import SectionToolbar from '../../section-toolbar/SectionToolbar';


type AwardType = {
  title: string;
  // icon?: number;
};

type AllAwardsProps = {
  data?: { id: any };
  textColor?: string;
  textAltColor: string;
  templateColor: string;
};

const AllAwards = ({
  data = { id: '' },
  textColor = '#fff',
  textAltColor,
  templateColor,
}: any) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userAwards } = useSelector((state: RootState) => state.addSection);
  const [editable, setEditable] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [awards, setAwards] = useState<AwardType[]>([]);

  useEffect(() => {
    if (Array.isArray(userAwards) && userAwards.length > 0) {
      const normalizedAwards = userAwards.map(award => ({
        title: award.title ?? '',
        // level: award.level ?? 0,
      }));
      setAwards(normalizedAwards);
    }
  }, [userAwards]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setEditable(false);
        dispatch(sectionEditMode(false))
        const validAwards = awards.filter(award => award.title.trim() !== '');
        dispatch(addUserAwards({
          sectionId: data.id,
          detail: validAwards
        }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [awards, dispatch, data.id]);

  const handleEditableSection = () => {
    setEditable(true);
    dispatch(sectionEditMode(true))
  }

  const handleAddAward = () => {
    setAwards([...awards, { title: '' }]);
  };

  const handleDeleteAward = (index: number) => {
    if (awards?.length <= 1 && index === 0) {
      handleRemoveSection();
    }
    const updated = awards.filter((_, i) => i !== index);
    setAwards(updated);
  };

  const handleInputChange = (index: number, value: string) => {
    const updated = [...awards];
    updated[index].title = value;
    setAwards(updated);
  };

  const handleRemoveSection = () => {
    dispatch(removeSection(data));
    dispatch(addUserAwards({ sectionId: data.id, detail: [] }));
  };

  const handleAddFirstAward = (value: string) => {
    const newSkill = { title: value.trim() };
    if (newSkill.title !== '') {
      setAwards([newSkill]);
    }
  };

  const handleBlur = (index: number) => {
    if (awards[index]?.title.trim() === '') {
      const updated = awards.filter((_, i) => i !== index);
      setAwards(updated);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setEditable(false);
        dispatch(sectionEditMode(false))
        const validAwards = awards.filter(award => award.title.trim() !== '');

        dispatch(addUserAwards({
          sectionId: data.id,
          detail: validAwards
        }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [awards, dispatch, data.id]);
  return (
    <div ref={containerRef}
      className={`flex flex-col py-5 ${editable ? 'bg-white' : ''}`}
      onClick={handleEditableSection}>
      {editable && (
        <SectionToolbar
          isTextEditor={true}
          onCopy={handleAddAward}
          onDelete={handleRemoveSection}
          position={`top-1 right-0 `}
          mainClass={`transition-all duration-500 ease-in-out ${editable ? "block " : "hidden"}`}
          showDot={true}
        />
      )}
      <div className="grid grid-cols-2 gap-2 px-1 mb-2 ">
        {awards.length > 0 ?
          awards.map((award, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 rounded-lg backdrop-blur-[40px] font-medium px-1 py-1 transition-all duration-500 ease-in-out relative`}
              style={{
                color: textColor,
                border: hoveredIndex === index ? `1px solid #000` : '1px solid transparent',
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
              <span style={{
                color: textAltColor
              }}> <FaAward /></span>
              <input
                value={award.title}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onBlur={() => handleBlur(index)}
                placeholder="Award Name"
                className="bg-transparent text-sm truncate placeholder:text-sm focus:outline-none transition-all duration-500 ease-in-out opacity-70 "
                style={{ color: textColor }}
                autoFocus
              />
              <div className={`transition-all duration-300 ease-in-out transform right-2 top-1 absolute  ${hoveredIndex === index ? 'translate-x-0 opacity-100' : 'translate-x-3 opacity-0'}`} >
                <button onClick={() => handleDeleteAward(index)} className="text-red-600">
                  <RiDeleteBin6Line size={18} />
                </button>
              </div>
            </div>
          ))
          : (
            <div
              className="flex items-center gap-2 rounded-lg backdrop-blur-[40px] font-medium  px-3 py-1"
              style={{
                // color: textColor,
                border: `1px solid #000`,
              }}
            >
              <span> <FaAward style={{
                color: textAltColor
              }} /></span>
              <input
                value={''}
                onChange={(e) => handleAddFirstAward(e.target.value)}
                placeholder="Award Name"
                className="bg-transparent text-sm placeholder:text-sm focus:outline-none "
                style={{ color: textColor }}
                autoFocus
              />
              <div className={`transition-all duration-300 ease-in-out transform right-2 top-1 absolute  `} >
                <button onClick={handleRemoveSection} className="text-red-800">
                  <RiDeleteBin6Line size={18} />
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default AllAwards;
