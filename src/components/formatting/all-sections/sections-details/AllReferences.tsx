'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { AddUserReferences, removeSection, sectionEditMode } from '@/redux/slices/addSectionSlice';
import { RiAddCircleFill, RiDeleteBin6Line } from 'react-icons/ri';
import { TiDelete } from 'react-icons/ti';
import SectionToolbar from '../../section-toolbar/SectionToolbar';

type ReferenceType = {
  name: string;
  contact: string;
};

type AllSummaryType = {
  data?: any;
  textColor?: string;
  textAltColor: string;
  templateColor: string;
};

const AllReferences = ({
  data = {},
  textColor = '#fff',
  textAltColor,
  templateColor
}: AllSummaryType) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userReferences } = useSelector((state: RootState) => state.addSection);
  const [editable, setEditable] = useState(false);
  const [references, setReferences] = useState<ReferenceType[]>([{
    name:"",
    contact:"",
  }]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (Array.isArray(userReferences) && userReferences.length > 0) {
      const normalizedReferences = userReferences.map(Reference => ({
        name: Reference.name ?? '',
        description: Reference.description ?? '',
        contact: Reference.contact ?? '',
      }));
      setReferences(normalizedReferences);
    }
  }, [userReferences]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setEditable(false);
        dispatch(sectionEditMode(false))
        dispatch(AddUserReferences({
          sectionId: data.id,
          detail: references
        }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [references, dispatch, data.id]);

  const handleEditableSection = () => {
    setEditable(true);
    dispatch(sectionEditMode(true))
  }
  const handleAddReference = () => {
    setReferences([...references, { name: '', contact: '' }]);
  };

  const handleRemoveSection = () => {
    if (data) {
      dispatch(removeSection(data));
      dispatch(AddUserReferences({ sectionId: data.id, detail: [] }));
    }
  };

  const handleInputChange = (index: number, field: keyof ReferenceType, value: string) => {
    const updated = [...references];
    updated[index] = { ...updated[index], [field]: value };
    setReferences(updated);
  };

  const handleDelete = (index: number) => {
    const updated = references.filter((_, i) => i !== index);
    setReferences(updated);
  };

  // const handleBlur = (index: number) => {
  //   if (references[index]?.name.trim() === '') {
  //     const updated = references.filter((_, i) => i !== index);
  //     setReferences(updated);
  //   }
  // };

  const handleAddFirstReference = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue !== '') {
      setReferences([{ name: trimmedValue, contact: '' }]);
    }
  };

  return (
    <div ref={containerRef} className={`flex flex-col py-5  ${editable && 'bg-white'}`} onClick={handleEditableSection}>
      {editable && (
        <SectionToolbar
          isTextEditor={true}
          onCopy={handleAddReference}
          onDelete={handleRemoveSection}
          position={`top-7 right-0 `}
          mainClass={`transition-all duration-500 ease-in-out ${editable ? "block " : "hidden"}`}
          showDot={true}
        />
      )}
      <div className="flex flex-col gap-1 px-1 ">
        {references.length > 0 && (
          references.map((cert, index) => (
            <div key={index} className='flex justify-between gap-2  rounded-sm px-2 transition-all duration-500 ease-in-out relative' style={{
              color: textColor,
              border: hoveredIndex === index ? `1px solid ${textColor}` : '1px solid transparent',
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
              }}>
              {/* ====== Job Name ====== */}
              <div className="flex items-center gap-4  " >
            
                  <input
                    value={cert.name}
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    // onBlur={() => handleBlur(index)}
                    placeholder="Reference Name"
                    type='text'
                    className="w-[50%] bg-transparent leading-8 text-sm  rounded  placeholder:text-gray-600 focus:outline-none focus:ring-0 focus:border-0"
                  />
                  <div className="h-[2px] w-5" style={{
                    background: textAltColor
                  }}></div>
              
                <input
                  type="text"
                  value={cert.contact}
                  placeholder="Reference Contact"
                  // onBlur={() => handleBlur(index)}
                  onChange={(e) => handleInputChange(index, 'contact', e.target.value)}
                  className="w-full bg-transparent text-sm leading-8 rounded  focus:outline-none focus:ring-0 focus:border-0 placeholder:text-gray-600"
                />
              </div>
              {editable && (
                <div className={`absolute bottom-0 right-0 transition-all duration-300 ease-in-out
                ${editable ? 'opacity-100 ' : 'opacity-0 '}
              `}>
                  <button
                    onClick={() =>{
                      if(references.length >1) return handleDelete(index)
                        return handleRemoveSection()
                      }}
                    className=" text-red-800/90 text-sm w-6 h-[2rem] flex justify-center items-center rounded-l-sm"
                  >
                    <RiDeleteBin6Line size={16} />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div >
  );
};

export default AllReferences;

