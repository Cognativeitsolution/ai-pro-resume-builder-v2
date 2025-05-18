'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { AddUserReferences, removeSection } from '@/redux/slices/addSectionSlice';
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
  const [references, setReferences] = useState<ReferenceType[]>([]);
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


  const handleEditableSection = () => setEditable(true);

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

  const handleBlur = (index: number) => {
    if (references[index]?.name.trim() === '') {
      const updated = references.filter((_, i) => i !== index);
      setReferences(updated);
    }
  };

  const handleAddFirstReference = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue !== '') {
      setReferences([{ name: trimmedValue, contact: '' }]);
    }
  };



  return (
    <div ref={containerRef} className={`mt-3 flex flex-col bg-white `} onClick={handleEditableSection}>
      {/* {editable && (
        <div className="flex gap-1 absolute top-5 right-0">
          <button style={{ color }} onClick={handleAddReference}>
            <RiAddCircleFill size={24} />
          </button>
          <button style={{ color }} onClick={handleRemoveSection}>
            <TiDelete size={30} />
          </button>
        </div>
      )} */}
      {editable && (
        <SectionToolbar
          onCopy={handleAddReference}
          onDelete={handleRemoveSection}
          // onMoveUp={handleAddAward}
          position="top-7 right-2"
          showDot={true}
        />
      )}

      <div className="flex flex-col gap-3 ">
        {references.length > 0 ? (
          references.map((cert, index) => (
            <div key={index} className='relative pb-2 pt-[6px]'>
              {/* ====== Job Name ====== */}
              <div className="flex items-center gap-4  rounded-sm px-2 transition-all duration-500 ease-in-out"
                style={{
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
                }}
              >
                <div className='relative mr-10'>
                  <input
                    value={cert.name}
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    onBlur={() => handleBlur(index)}
                    placeholder="Reference Name"
                    type='text'
                    className="w-full text-[14px] rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0"
                  />
                  <div className=" absolute top-[11px] -right-7 h-[2px] w-5  " style={{
                    background: textAltColor
                  }}></div>
                </div>
                <input
                  type="text"
                  value={cert.contact}
                  placeholder="Reference Contact"
                  onBlur={() => handleBlur(index)}
                  onChange={(e) => handleInputChange(index, 'contact', e.target.value)}
                  className="w-full text-[14px] rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0 placeholder:text-gray-600"
                />
              </div>
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => handleDelete(index)}
                  className=" text-red-800/90 text-sm w-6 h-6 flex justify-center items-center rounded-l-sm"
                >
                  <RiDeleteBin6Line size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className='relative pb-2 pt-[6px]'>
            {/* ====== Job Name ====== */}
            <div className="flex items-center gap-4 rounded-sm px-2 transition-all duration-500 ease-in-out"
              style={{
                color: textColor,
                border: `1px solid ${textColor}`,
              }}>
              <div className='relative mr-5'>
                <input
                  value=""
                  onChange={(e) => handleAddFirstReference(e.target.value)}
                  placeholder="Reference Name"
                  className="w-full text-[14px] rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0"
                />
                <div className=" absolute top-[11px] -right-7 h-[2px] w-5  " style={{
                  background: textAltColor
                }}></div>
              </div>
              <input
                type="text"
                placeholder="Reference Contact"
                value=""
                onChange={(e) => handleAddFirstReference(e.target.value)}
                className="w-full text-[14px] rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0 placeholder:text-gray-600"
              />
            </div>
            <div className="absolute top-2 right-2">
              <button
                className=" text-red-800/90 text-sm w-6 h-6 flex justify-center items-center rounded-l-sm"
                onClick={handleAddReference}
              >
                <RiDeleteBin6Line size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div >
  );
};

export default AllReferences;

