'use client';
// ==============
import React, { useEffect, useRef, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
// ==============
import CustomDatePicker from '../../custom/CustomDatePicker';
// ==============
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addUserEducation, removeSection } from '@/redux/slices/addSectionSlice';


type EducationType = {
  title: string;
  description: string;
  companyName: string;
  location?: string;
  startDate?: string;
  endDate?: string;
};

type AllSummaryType = {
  data?: any;
};

const AllEducation = ({ data = {} }: AllSummaryType) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userEducation } = useSelector((state: RootState) => state.addSection);
  const [editable, setEditable] = useState<boolean>(false);
  const [educations, setEducations] = useState<EducationType[]>([]);
  const handleEditableSection = () => setEditable(true);

  // Sync local state with the Redux store whenever userEducation updates
  useEffect(() => {
    if (Array.isArray(userEducation) && userEducation.length > 0) {
      setEducations(userEducation);
    }
  }, [userEducation]);

  // Handle input changes in the education fields
  const handleInputChange = (index: number, field: keyof EducationType, value: string) => {
    const updated = [...educations];
    updated[index] = { ...updated[index], [field]: value };
    setEducations(updated);
  };

  // Add a new blank education entry
  const handleAddEducation = () => {
    setEducations([...educations, { title: '', description: '', companyName: '' }]);
  };

  // Remove the entire education section and reset its Redux data
  const handleRemoveSection = () => {
    if (data) {
      dispatch(removeSection(data));
      dispatch(addUserEducation({
        sectionId: data.id,
        detail: []
      }));
    }
  };

  // Delete a single education entry by index
  const handleDelete = (index: number) => {
    const updated = educations.filter((_, i) => i !== index);
    setEducations(updated);
  };

  // Handle click outside the section to save changes and exit edit mode
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setEditable(false);
        dispatch(addUserEducation({
          sectionId: data.id,
          detail: educations
        }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [educations, dispatch, data?.id]);


  return (
    <div ref={containerRef} className={`border p-4 relative flex flex-col gap-4 ${editable && 'bg-white'}`}
      onClick={handleEditableSection}>
      <h1>{data?.name}</h1>
      {/* ====== Add and Delete Section Buttons ====== */}
      <div className="flex gap-3 absolute top-2 right-2">
        <button className="text-[14px] border px-2 rounded-md bg-gray-200 cursor-pointer"
          onClick={handleAddEducation}>
          + Add
        </button>
        <button className="text-[14px] border px-2 rounded-md bg-gray-200 cursor-pointer"
          onClick={handleRemoveSection}>
          Delete
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {educations.map((exp, index) => (
          <div key={index}>
            <div className="flex gap-1 flex-col">
              {/* ====== Degree and Field of Study ====== */}
              <div className="flex items-center justify-between">
                <div className='w-full'>
                  <input
                    value={exp.title}
                    placeholder="Degree and Field of Study"
                    onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                    className="w-full text-[18px] rounded placeholder:text-[18px] focus:outline-none focus:ring-0 focus:border-0"
                  />
                </div>
                {/* ====== Date Picker ====== */}
                <CustomDatePicker onChange={(dates) => console.log(dates)} />
              </div>
              {/* ====== School or University ====== */}
              <div className="flex items-center justify-between">
                <div className='w-full'>
                  <input
                    type="text"
                    value={exp.companyName}
                    placeholder="School or University"
                    onChange={(e) => handleInputChange(index, 'companyName', e.target.value)}
                    className="w-full text-[16px] rounded placeholder:text-[16px] focus:outline-none focus:ring-0 focus:border-0 placeholder:text-blue-400"
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

export default AllEducation;
