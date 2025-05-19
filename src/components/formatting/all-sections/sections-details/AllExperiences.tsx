'use client';
// ==============
import React, { useEffect, useRef, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
// ==============
import CustomDatePicker from '../../custom/CustomDatePicker';
// ==============
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addUserExperience, removeSection, sectionEditMode } from '@/redux/slices/addSectionSlice';
import { RiAddCircleFill, RiDeleteBin6Line } from 'react-icons/ri';
import { TiDelete } from 'react-icons/ti';
import SectionToolbar from '../../section-toolbar/SectionToolbar';


type ExperienceType = {
  title: string;
  description: string;
  companyName: string;
  location?: string;
};

type AllExperienceType = {
  data?: any;
  textColor?: string;
  textAltColor?: string;
  templateColor: string;
};

const AllExperiences = ({ data = {}, textColor = '#000', textAltColor = '#000', templateColor, }: AllExperienceType) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userExperiences } = useSelector((state: RootState) => state.addSection);
  const [editable, setEditable] = useState<boolean>(false);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);

  const handleEditableSection = () => {
    setEditable(true);
    dispatch(sectionEditMode(true))
  }

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
        dispatch(sectionEditMode(false))
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

  const handleAddFirstExperience = (value: string) => {
    const newSkill = { title: value.trim(), description: '', companyName: '', location: '' };
    if (newSkill.title !== '') {
      setExperiences([newSkill]);
    }
  };

  return (
    <div ref={containerRef} className={`flex flex-col gap-4 ${editable && 'bg-white'}`} onClick={handleEditableSection}>
      {/* ====== Add and Delete Section Buttons ====== */}
      {editable && (
        <SectionToolbar
          onCopy={handleAddExperience}
          onDelete={handleRemoveSection}
          // onMoveUp={handleAddAward}
          position="top-7 right-0"
          showDot={true}
        />
      )}
      {/* ===== Education Box ===== */}
      <div className="flex flex-col gap-3 divide-y-[1px] px-1">
        {experiences.length > 0 ?
          experiences.map((exp, index) => (
            <div key={index}>
              <div className="flex flex-col mt-2">
                {/* ====== Job Title ====== */}
                <div className="flex items-center justify-between">
                  <div className='w-full'>
                    <input
                      value={exp.title}
                      placeholder="Title"
                      onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                      className="w-full text-[16px] bg-transparent rounded placeholder:text-[16px] focus:outline-none focus:ring-0 focus:border-0"
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
                      placeholder="Company Nassme"
                      onChange={(e) => handleInputChange(index, 'companyName', e.target.value)}
                      className="w-full text-[14px] bg-transparent rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0 "
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
                      className="w-full text-[14px] rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0 text-end bg-transparent"
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
                    className="w-full text-[14px] bg-transparent rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0"
                  ></textarea>
                </div>
              </div>
              {/* ====== Delete Button ====== */}
              <div className="flex justify-end mt-2">
                <button
                  className="bg-red-800/30 text-red-800 text-sm w-6 h-6 flex justify-center items-center rounded-l-sm"
                  onClick={() => handleDelete(index)}>
                  <RiDeleteBin6Line size={16} />
                </button>
              </div>
            </div>
          )) :
          <div>
            <div className="flex flex-col mt-2">
              {/* ====== Job Title ====== */}
              <div className="flex items-center justify-between">
                <div className='w-full'>
                  <input
                    placeholder="Title"
                    value={''}
                    onChange={(e) => handleAddFirstExperience(e.target.value)}
                    className="w-full text-[16px] bg-transparent rounded placeholder:text-[16px] focus:outline-none focus:ring-0 focus:border-0"
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
                    placeholder="Company Name"
                    value={''}
                    onChange={(e) => handleAddFirstExperience(e.target.value)}
                    className="w-full text-[14px] bg-transparent rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0 "
                  />
                </div>
                {/* ====== Location ====== */}
                <div className='w-full'>
                  <input
                    type="text"
                    disabled={!editable}
                    value={''}
                    onChange={(e) => handleAddFirstExperience(e.target.value)}
                    placeholder="Location"
                    className="w-full text-[14px] bg-transparent rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0 text-end"
                  />
                </div>
              </div>
              {/* ====== Description ====== */}
              <div>
                <textarea
                  disabled={!editable}
                  value={''}
                  onChange={(e) => handleAddFirstExperience(e.target.value)}
                  placeholder="Description"
                  rows={2}
                  className="w-full bg-transparent text-[14px] rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0"
                ></textarea>
              </div>
            </div>
            {/* ====== Delete Button ====== */}
            <div className="flex justify-end mt-2">
              <button
                className="bg-red-800/30 text-red-800 text-sm w-6 h-6 flex justify-center items-center rounded-l-sm"
                onClick={handleRemoveSection}
              >
                <RiDeleteBin6Line size={16} />
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default AllExperiences;
