'use client';
// ==============
import React, { useEffect, useRef, useState } from 'react';
// ==============
import { RootState } from '@/redux/store';
import { DateRange } from 'react-date-range';
import { useDispatch, useSelector } from 'react-redux';
import { addUserEducation, removeSection } from '@/redux/slices/addSectionSlice';
// ==============
import CustomDatePicker from '../../custom/CustomDatePicker';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


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
  const [showCalendars, setShowCalendars] = useState<boolean[]>([]);

  const handleEditableSection = () => setEditable(true);

  useEffect(() => {
    // Initialize from Redux state
    if (Array.isArray(userEducation) && userEducation.length > 0) {
      setEducations(userEducation);
    }
  }, [userEducation]);

  const handleInputChange = (index: number, field: keyof EducationType, value: string) => {
    const updated = [...educations];
    updated[index] = { ...updated[index], [field]: value };
    setEducations(updated);
  };

  const handleSelect = (index: number, ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    const updated = [...educations];
    updated[index] = {
      ...updated[index],
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
    setEducations(updated);
  };
  const handleAddEducation = () => {
    setEducations([...educations, { title: '', description: '', companyName: '' }]);
  };
  const handleRemoveSection = () => {
    if (data) {
      dispatch(removeSection(data));
      dispatch(addUserEducation({
        sectionId: data.id,
        detail: []
      }));
    }
  };
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

  const handleDelete = (index: any) => {
    const updated = educations.filter((_, i) => i !== index);
    setEducations(updated);
  };
  useEffect(() => {
    setShowCalendars(Array(educations.length).fill(false));
  }, [educations.length]);


  return (
    <div ref={containerRef} className={`border p-4 relative flex flex-col gap-4 ${editable && 'bg-white'}`}
      onClick={handleEditableSection}>
      <h1>{data?.name}</h1>
      {/* ====== Add and Delete Section Buttons ====== */}
      <div className="flex gap-3 absolute top-2 right-2">
        <button
          className="text-[14px] border px-2 rounded-md bg-gray-200 cursor-pointer"
          onClick={handleAddEducation}
        >
          + Add
        </button>
        <button
          onClick={handleRemoveSection}
          className="text-[14px] border px-2 rounded-md bg-gray-200 cursor-pointer"
        >
          Delete
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {educations.map((exp, index) => (
          <div key={index}>
            <div className="flex gap-2 flex-col">
              {/* ====== Job Title ====== */}
              <div>
                <input
                  value={exp.title}
                  onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                  placeholder="Title"
                  className="w-full text-2xl rounded placeholder:text-2xl focus:outline-none focus:ring-0 focus:border-transparent"
                />
              </div>
              {/* ====== Company Name ====== */}
              <div className="flex justify-between items-center">
                <div className='w-full'>
                  <input
                    type="text"
                    value={exp.companyName}
                    placeholder="Company Name"
                    onChange={(e) => handleInputChange(index, 'companyName', e.target.value)}
                    className="w-full focus:outline-none focus:ring-0 focus:border-0 placeholder:text-blue-400"
                  />
                </div>
                {/* ====== Date Picker ====== */}
                <div>
                  <CustomDatePicker onChange={(dates) => console.log(dates)} />
                </div>
              </div>
              {/* ====== Location ====== */}
              <div>
                <input
                  type="text"
                  value={exp.location || ''}
                  disabled={!editable}
                  onChange={(e) => handleInputChange(index, 'location', e.target.value)}
                  placeholder="Location"
                  className="w-full focus:outline-none focus:ring-0 focus:border-0"
                />
              </div>
              {/* ====== Description ====== */}
              <div>
                <textarea
                  value={exp.description}
                  disabled={!editable}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                  placeholder="Description"
                  rows={2}
                  className="w-full focus:outline-none focus:ring-0 focus:border-0"
                ></textarea>
              </div>
            </div>
            {/* ====== Delete Button ====== */}
            <div className="text-right">
              <button
                onClick={() => handleDelete(index)}
                className="text-red-600 text-sm"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default AllEducation;
