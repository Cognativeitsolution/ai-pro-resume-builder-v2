'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { AddUserReferences, removeSection } from '@/redux/slices/addSectionSlice';
import { RiAddCircleFill, RiDeleteBin6Line } from 'react-icons/ri';
import { TiDelete } from 'react-icons/ti';

type ReferenceType = {
  name: string;
  contact: string;
};

type AllSummaryType = {
  data?: any;
  color?: string;
  templateColor: string;
};

const AllReferences = ({
  data = {},
  color = '#fff',
  templateColor
}: AllSummaryType) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userReferences } = useSelector((state: RootState) => state.addSection);
  const [editable, setEditable] = useState(false);
  const [references, setReferences] = useState<ReferenceType[]>([]);

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
    <div ref={containerRef} className={`flex flex-col gap-4 bg-white `} onClick={handleEditableSection}>
      {editable && (
        <div className="flex gap-1 absolute top-5 right-0">
          <button style={{ color }} onClick={handleAddReference}>
            <RiAddCircleFill size={24} />
          </button>
          <button style={{ color }} onClick={handleRemoveSection}>
            <TiDelete size={30} />
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3 ">
        {references.length > 0 ? (
          references.map((cert, index) => (
            <div key={index} className='relative py-4'>
              {/* ====== Job Name ====== */}
              <div className="flex items-center gap-4 border border-indigo-300 rounded-sm px-2">
                <div className='relative mr-5'>
                  <input
                    value={cert.name}
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    onBlur={() => handleBlur(index)}
                    placeholder="Reference Name"
                    className="w-full text-[14px] rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0"
                  />
                  <div className="after:content-[''] after:absolute after:top-[11px] after:-right-7 after:bg-indigo-300 after:h-[2px] after:w-5  "></div>
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
              <div className="absolute top-4 right-2">
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
          <div className='relative py-4'>
            {/* ====== Job Name ====== */}
            <div className="flex items-center gap-4 border border-indigo-300 rounded-sm px-2">
              <div className='relative mr-5'>
                <input
                  value=""
                  onChange={(e) => handleAddFirstReference(e.target.value)}
                  placeholder="Reference Name"
                  className="w-full text-[14px] rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0"
                />
                <div className="after:content-[''] after:absolute after:top-[11px] after:-right-7 after:bg-indigo-300 after:h-[2px] after:w-5  "></div>
              </div>
              <input
                type="text"
                placeholder="Reference Contact"
                value=""
                onChange={(e) => handleAddFirstReference(e.target.value)}
                className="w-full text-[14px] rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0 placeholder:text-gray-600"
              />
            </div>
            <div className="absolute top-4 right-2">
              <button
                className=" text-red-800/90 text-sm w-6 h-6 flex justify-center items-center rounded-l-sm"
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

