'use client';
// ==============
import React, { useEffect, useRef, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
// ==============
import CustomDatePicker from '../../custom/CustomDatePicker';
// ==============
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addUserEducation, removeSection, sectionEditMode } from '@/redux/slices/addSectionSlice';
import { RiAddCircleFill, RiDeleteBin6Line } from 'react-icons/ri';
import { TiDelete } from 'react-icons/ti';
import SectionToolbar from '../../section-toolbar/SectionToolbar';


type EducationType = {
  degree: string;
  schoolName: string;
  location?: string;
};

type AllEducationType = {
  data?: any;
  textColor?: string;
  textAltColor: string;
  templateColor: string;
};

const AllEducation = ({ data = {}, textColor = '#000', textAltColor, templateColor }: AllEducationType) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userEducation } = useSelector((state: RootState) => state.addSection);
  const [editable, setEditable] = useState<boolean>(false);
  const [educations, setEducations] = useState<EducationType[]>([]);

  const handleEditableSection = () => {
    setEditable(true);
    dispatch(sectionEditMode(true))
  }
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
        dispatch(sectionEditMode(false))
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

  const handleAddFirstSoftSkill = (value: string) => {
    const newSkill = { degree: value.trim(), location: '', schoolName: '' };
    if (newSkill.degree !== '') {
      setEducations([newSkill]);
    }
  };

  return (
    <div ref={containerRef} className={`flex flex-col gap-4 ${editable && 'bg-white'}`}
      onClick={handleEditableSection}>
      {/* ====== Add and Delete Section Buttons ====== */}
      {editable && (
        <SectionToolbar
          onCopy={handleAddEducation}
          onDelete={handleRemoveSection}
          // onMoveUp={handleAddAward}
          position="top-7 right-0"
          showDot={true}
        />
      )}
      {/* ===== Education Box ===== */}
      <div className="flex flex-col gap-3 divide-y-[1px] px-1 ">
        {educations.length > 0 ?
          educations.map((exp, index) => (
            <div key={index}>
              <div className="flex flex-col mt-2">
                {/* ====== Degree and Field of Study ====== */}
                <div className="flex items-center justify-between">
                  <div className='w-full'>
                    <input
                      value={exp.degree}
                      placeholder="Degree and Field of Study"
                      onChange={(e) => handleInputChange(index, 'degree', e.target.value)}
                      className="w-full text-[16px] bg-transparent rounded placeholder:text-[16px] focus:outline-none focus:ring-0 focus:border-0"
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
              </div>
              {/* ====== Delete Button ====== */}
              <div className="flex justify-end mt-2">
                <button onClick={() => handleDelete(index)}
                  className="bg-red-800/30 text-red-800 text-sm w-6 h-6 flex justify-center items-center rounded-l-sm"
                >
                  <RiDeleteBin6Line size={16} />
                </button>
              </div>
            </div>
          )) :
          <div>
            <div className="flex flex-col mt-2">
              {/* ====== Degree and Field of Study ====== */}
              <div className="flex items-center justify-between">
                <div className='w-full'>
                  <input
                    placeholder="Degree and Field of Study"
                    value={''}
                    onChange={(e) => handleAddFirstSoftSkill(e.target.value)}
                    className="w-full text-[16px] bg-transparent rounded placeholder:text-[16px] focus:outline-none focus:ring-0 focus:border-0"
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
                    placeholder="School or University"
                    value={''}
                    onChange={(e) => handleAddFirstSoftSkill(e.target.value)}
                    className="w-full text-[14px] bg-transparent rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0 "
                  />
                </div>
                {/* ====== Location ====== */}
                <div className='w-full'>
                  <input
                    type="text"
                    disabled={!editable}
                    value={''}
                    onChange={(e) => handleAddFirstSoftSkill(e.target.value)}
                    placeholder="Location"
                    className="w-full text-[14px] rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0 text-end bg-transparent"
                  />
                </div>
              </div>
            </div>
            {/* ====== Delete Button ====== */}
            <div className="flex justify-end mt-2">
              <button
                className="bg-red-800/30 text-red-800 text-sm w-6 h-6 flex justify-center items-center rounded-l-sm"
                onClick={handleRemoveSection}>
                <RiDeleteBin6Line size={16}
                />
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default AllEducation;
