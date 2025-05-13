'use client';
// ==============
import React, { useEffect, useRef, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
// ==============
import CustomDatePicker from '../../custom/CustomDatePicker';
// ==============
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addUserExperience, removeSection } from '@/redux/slices/addSectionSlice';
import { RiAddCircleFill } from 'react-icons/ri';
import { TiDelete } from 'react-icons/ti';


type ExperienceType = {
  title: string;
  description: string;
  companyName: string;
  location?: string;
};

type AllExperienceType = {
  data?: any;
  color?: string;
  templateColor: string;
};

const AllExperiences = ({ data = {}, color = '#000', templateColor, }: AllExperienceType) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userExperiences } = useSelector((state: RootState) => state.addSection);
  const [editable, setEditable] = useState<boolean>(false);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const handleEditableSection = () => setEditable(true);

  // Sync local state with Redux store whenever userExperiences changes
  useEffect(() => {
    if (Array.isArray(userExperiences) && userExperiences.length > 0) {
      setExperiences(userExperiences);
    }
  }, [userExperiences]);

  // Handle input changes for each field in an experience entry
  const handleInputChange = (index: number, field: keyof ExperienceType, value: string) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiences(updated);
  };

  // Add a new blank experience entry
  const handleAddExperience = () => {
    setExperiences([...experiences, { title: '', description: '', companyName: '', location: '' }]);
  };

  // Remove the entire section and reset associated experiences in the Redux store
  const handleRemoveSection = () => {
    if (data) {
      dispatch(removeSection(data));
      dispatch(addUserExperience({
        sectionId: data.id,
        detail: []
      }));
    }
  };

  // Delete a specific experience entry by index
  const handleDelete = (index: number) => {
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
  };

  // Detect click outside the component to disable editing and save data to Redux
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setEditable(false);
        dispatch(addUserExperience({
          sectionId: data.id,
          detail: experiences
        }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [experiences, dispatch, data?.id]);


  return (
    <div ref={containerRef} className={`border p-4 flex flex-col gap-4 ${editable && templateColor}}`}
      onClick={handleEditableSection}>
      {/* ====== Add and Delete Section Buttons ====== */}
      {editable && (
        <div className="flex gap-1 absolute top-5 right-0">
          <button className="cursor-pointer" style={{ color }} onClick={handleAddExperience}>
            <RiAddCircleFill size={24} />
          </button>
          <button className="cursor-pointer" style={{ color }} onClick={handleRemoveSection}>
            <TiDelete size={30} />
          </button>
        </div>
      )}
      {/* ===== Education Box ===== */}
      <div className="flex flex-col gap-3">
        {experiences.map((exp, index) => (
          <div key={index}>
            <div className="flex gap-1 flex-col">
              {/* ====== Job Title ====== */}
              <div className="flex items-center justify-between">
                <div className='w-full'>
                  <input
                    value={exp.title}
                    placeholder="Title"
                    onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                    className="w-full text-[16px] rounded placeholder:text-[16px] focus:outline-none focus:ring-0 focus:border-0"
                  />
                </div>
                {/* ====== Date Picker ====== */}
                <CustomDatePicker onChange={(dates) => console.log(dates)} />
              </div>
              {/* ====== Company Name ====== */}
              <div className="flex items-center justify-between">
                <div className='w-full'>
                  <input
                    type="text"
                    value={exp.companyName}
                    placeholder="Company Name"
                    onChange={(e) => handleInputChange(index, 'companyName', e.target.value)}
                    className="w-full text-[14px] rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0 placeholder:text-blue-400"
                  />
                </div>
                {/* ====== Location ====== */}
                <div className='w-full'>
                  <input
                    type="text"
                    value={exp.location || ''}
                    disabled={!editable}
                    onChange={(e) => handleInputChange(index, 'location', e.target.value)}
                    placeholder="Location"
                    className="w-full text-[14px] rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0 text-end"
                  />
                </div>
              </div>
              {/* ====== Description ====== */}
              <div>
                <textarea
                  value={exp.description}
                  disabled={!editable}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                  placeholder="Description"
                  rows={2}
                  className="w-full text-[14px] rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0"
                ></textarea>
              </div>
            </div>
            {/* ====== Delete Button ====== */}
            <div className="flex justify-end mt-5">
              <button className="text-red-600 text-sm flex items-center gap-1" onClick={() => handleDelete(index)}>
                <FaTrashAlt />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default AllExperiences;
