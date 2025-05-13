'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TiDelete } from 'react-icons/ti';
import { RiAddCircleFill, RiDeleteBin6Line } from 'react-icons/ri';
import { RootState } from '@/redux/store';
import { AddUserReferences, removeSection } from '@/redux/slices/addSectionSlice';
import { FaAward, FaDiamond } from 'react-icons/fa6';

type ReferenceType = {
  title: string;
  // icon?: number;
};

type AllReferencesProps = {
  data?: { id: any };
  color?: string;
  templateColor: string;
};

const AllReferences = ({
  data = { id: '' },
  color = '#fff',
  templateColor,
}: any) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userReferences } = useSelector((state: RootState) => state.addSection);
  const [editable, setEditable] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [references, setReferences] = useState<ReferenceType[]>([]);

  useEffect(() => {
    if (Array.isArray(userReferences) && userReferences.length > 0) {
      const normalizedReferences = userReferences.map(award => ({
        title: award.title ?? '',
        // level: award.level ?? 0,
      }));
      setReferences(normalizedReferences);
    }
  }, [userReferences]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setEditable(false);
        const validReferences = references.filter(award => award.title.trim() !== '');

        console.log(validReferences, "1111==validReferences");

        dispatch(AddUserReferences({
          sectionId: data.id,
          detail: validReferences
        }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [references, dispatch, data.id]);

  const handleEditableSection = () => setEditable(true);

  const handleAddReference = () => {
    setReferences([...references, { title: '' }]);
  };

  const handleDeleteReference = (index: number) => {
    const updated = references.filter((_, i) => i !== index);
    setReferences(updated);
  };

  const handleInputChange = (index: number, value: string) => {
    const updated = [...references];
    updated[index].title = value;
    setReferences(updated);
  };

  const handleRemoveSection = () => {
    dispatch(removeSection(data));
    dispatch(AddUserReferences({ sectionId: data.id, detail: [] }));
  };

  const handleAddFirstReference = (value: string) => {
    const newSkill = { title: value.trim() };
    if (newSkill.title !== '') {
      setReferences([newSkill]);
    }
  };

  const handleBlur = (index: number) => {
    if (references[index]?.title.trim() === '') {
      const updated = references.filter((_, i) => i !== index);
      setReferences(updated);
    }
  };

  return (
    <div ref={containerRef} onClick={handleEditableSection} >
      {editable && (
        <div className="flex gap-1 absolute top-5 right-0">
          <button className="cursor-pointer" style={{ color: templateColor }} onClick={handleAddReference}>
            <RiAddCircleFill size={24} />
          </button>
          <button className="cursor-pointer" style={{ color: templateColor }} onClick={handleRemoveSection}>
            <TiDelete size={30} />
          </button>
        </div>
      )}
      <div className="flex flex-wrap gap-2 mt-1 ">
        {references.length > 0 ?
          references.map((award, index) => (
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
              {/* <span> <FaAward /></span> */}
              <input
                value={award.title}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onBlur={() => handleBlur(index)}
                placeholder="Reference Name"
                className="bg-transparent text-sm truncate placeholder:text-sm focus:outline-none transition-all duration-500 ease-in-out opacity-70 "
                style={{ color }}
                autoFocus
              />
              {hoveredIndex === index && (
                <button onClick={() => handleDeleteReference(index)} className="text-red-600 opacity-70 hover:opacity-100">
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
              {/* <span> <FaReference /></span> */}
              <input
                value={''}
                onChange={(e) => handleAddFirstReference(e.target.value)}
                placeholder="Reference Name"
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

export default AllReferences;
