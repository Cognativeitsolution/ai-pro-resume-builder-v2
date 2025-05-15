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
import { RiAddCircleFill } from 'react-icons/ri';
import { TiDelete } from 'react-icons/ti';


type EducationType = {
  degree: string;
  schoolName: string;
  location?: string;
};

type AllEducationType = {
  data?: any;
  color?: string;
  templateColor: string;
};

const AllEducation = ({ data = {}, color = '#000', templateColor, }: AllEducationType) => {
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
    setEducations([...educations, { degree: '', location: '', schoolName: '' }]);
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
    <div ref={containerRef} className={`border p-4 flex flex-col gap-4 ${editable && templateColor}`}
      onClick={handleEditableSection}>
      {/* ====== Add and Delete Section Buttons ====== */}
      {editable && (
        <div className="flex gap-1 absolute top-5 right-0">
          <button className="cursor-pointer" style={{ color }} onClick={handleAddEducation}>
            <RiAddCircleFill size={24} />
          </button>
          <button className="cursor-pointer" style={{ color }} onClick={handleRemoveSection}>
            <TiDelete size={30} />
          </button>
        </div>
      )}
      {/* ===== Education Box ===== */}
      <div className="flex flex-col gap-3">
        {educations.map((exp, index) => (
          <div key={index}>
            <div className="flex flex-col">
              {/* ====== Degree and Field of Study ====== */}
              <div className="flex items-center justify-between">
                <div className='w-full'>
                  <input
                    value={exp.degree}
                    placeholder="Degree and Field of Study"
                    onChange={(e) => handleInputChange(index, 'degree', e.target.value)}
                    className="w-full text-[16px] rounded placeholder:text-[16px] focus:outline-none focus:ring-0 focus:border-0"
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
                    value={exp.schoolName}
                    placeholder="School or University"
                    onChange={(e) => handleInputChange(index, 'schoolName', e.target.value)}
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
