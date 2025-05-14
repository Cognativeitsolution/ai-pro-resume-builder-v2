'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TiDelete } from 'react-icons/ti';
import { RiAddCircleFill, RiDeleteBin6Line } from 'react-icons/ri';
import { RootState } from '@/redux/store';
import { addUserAwards, removeSection } from '@/redux/slices/addSectionSlice';
import { FaDiamond } from 'react-icons/fa6';
import { FaAward } from 'react-icons/fa';

type AwardType = {
  title: string;
  // icon?: number;
};

type AllAwardsProps = {
  data?: { id: any };
  color?: string;
  templateColor: string;
};

const AllAwards = ({
  data = { id: '' },
  color = '#fff',
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
        const validAwards = awards.filter(award => award.title.trim() !== '');

        console.log(validAwards, "1111==validAwards");

        dispatch(addUserAwards({
          sectionId: data.id,
          detail: validAwards
        }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [awards, dispatch, data.id]);

  const handleEditableSection = () => setEditable(true);

  const handleAddAward = () => {
    setAwards([...awards, { title: '' }]);
  };

  const handleDeleteAward = (index: number) => {
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

  return (
    <div ref={containerRef} className={`py-4 flex bg-white flex-col gap-4 ${editable && templateColor && 'bg-slate-300/30'}`} onClick={handleEditableSection}>
      {editable && (
        <div className="flex gap-1 absolute top-5 right-0">
          <button className="cursor-pointer" style={{ color: templateColor }} onClick={handleAddAward}>
            <RiAddCircleFill size={24} />
          </button>
          <button className="cursor-pointer" style={{ color: templateColor }} onClick={handleRemoveSection}>
            <TiDelete size={30} />
          </button>
        </div>
      )}
      <div className="flex flex-wrap gap-2 mt-1 ">
        {awards.length > 0 ?
          awards.map((award, index) => (
            <div
              key={index}
              className={` flex items-center gap-2 rounded-lg opacity-75 backdrop-blur-[40px] 
                font-medium px-3 py-1 transition-all duration-500 ease-in-out ${hoveredIndex === index ? 'pr-5' : ''
                }`}
              style={{
                color,
                border: hoveredIndex === index ? `1px solid ${templateColor}` : 'none',
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
              <span> <FaAward /></span>
              <input
                value={award.title}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onBlur={() => handleBlur(index)}
                placeholder="Award Name"
                className="bg-transparent text-sm truncate placeholder:text-sm focus:outline-none transition-all duration-500 ease-in-out opacity-70 "
                style={{ color }}
                autoFocus
              />
              {hoveredIndex === index && (
                <button onClick={() => handleDeleteAward(index)} className="text-red-600 opacity-70 hover:opacity-100">
                  <RiDeleteBin6Line size={18} />
                </button>
              )}
            </div>
          ))
          : (
            <div
              className="flex items-center gap-2 rounded-lg opacity-75 backdrop-blur-[40px] font-medium  px-3 py-1"
              style={{
                color,
                border: `1px solid ${templateColor}`,
              }}
            >
              <span> <FaAward /></span>
              <input
                value={''}
                onChange={(e) => handleAddFirstAward(e.target.value)}
                placeholder="Award Name"
                className="bg-transparent text-sm placeholder:text-sm focus:outline-none "
                style={{ color }}
                autoFocus
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default AllAwards;
