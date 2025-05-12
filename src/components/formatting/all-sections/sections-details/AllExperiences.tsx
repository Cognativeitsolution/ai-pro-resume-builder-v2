'use client';
import { addUserExperience, removeSection } from '@/redux/slices/addSectionSlice';
import { RootState } from '@/redux/store';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


type ExperienceType = {
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

const AllExperiences = ({ data = {} }: AllSummaryType) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userExperiences } = useSelector((state: RootState) => state.addSection);

  const [editable, setEditable] = useState<boolean>(false);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [showCalendars, setShowCalendars] = useState<boolean[]>([]);

  const handleEditableSection = () => setEditable(true);

  useEffect(() => {
    // Initialize from Redux state
    if (Array.isArray(userExperiences) && userExperiences.length > 0) {
      setExperiences(userExperiences);
    }
  }, [userExperiences]);

  const handleInputChange = (index: number, field: keyof ExperienceType, value: string) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiences(updated);
  };

  const handleSelect = (index: number, ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    const updated = [...experiences];
    updated[index] = {
      ...updated[index],
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
    setExperiences(updated);
  };
  const handleAddExperience = () => {
    setExperiences([...experiences, { title: '', description: '', companyName: '' }]);
  };
  const handleRemoveSection = () => {
    if (data) {
      dispatch(removeSection(data));
      dispatch(addUserExperience({
        sectionId: data.id,
        detail: []
      }));
    }
  };
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

  const handleDelete = (index: any) => {
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
  };
  useEffect(() => {
    setShowCalendars(Array(experiences.length).fill(false));
  }, [experiences.length]);



  console.log(userExperiences, "userExperiencesuserExperiences");

  return (
    <div ref={containerRef} className={`border p-4 relative flex flex-col gap-4 ${editable && 'bg-white'}`}
      onClick={handleEditableSection}>
      <h1>{data?.name}</h1>

      <div className="flex gap-3 absolute top-2 right-2">
        <button
          className="border px-3 py-1 rounded-md bg-gray-200 cursor-pointer"
          onClick={handleAddExperience}
        >
          + Project
        </button>
        <button
          onClick={handleRemoveSection}
          className="border px-3 py-1 rounded-md bg-gray-200 cursor-pointer"
        >
          Delete
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {experiences.map((exp, index) => (
          <div key={index}>
            <div className="flex gap-2 flex-col ">
              <input
                value={exp.title}
                onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                placeholder="Title"
                className="w-full text-2xl rounded placeholder:text-2xl focus:outline-none focus:ring-0 focus:border-transparent"
              />
              <input
                type="text"
                value={exp.companyName}
                placeholder="Company Name"
                onChange={(e) => handleInputChange(index, 'companyName', e.target.value)}
                className="w-full focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-blue-400"
              />

              <input
                value={exp.description}
                onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                placeholder="Description"
                className="w-full focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-blue-400"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={
                  exp.startDate && exp.endDate
                    ? `${format(new Date(exp.startDate), 'yyyy-MM-dd')} to ${format(new Date(exp.endDate), 'yyyy-MM-dd')}`
                    : ''
                }
                onClick={() => {
                  const updated = [...showCalendars];
                  updated[index] = !updated[index];
                  setShowCalendars(updated);
                }}
                placeholder="Date Range"
                className="w-full cursor-pointer"
              />
              {showCalendars[index] && (
                <div className="absolute z-50 mt-2 shadow-lg">
                  <DateRange
                    editableDateInputs={true}
                    onChange={(ranges: any) => handleSelect(index, ranges)}
                    moveRangeOnFirstSelection={false}
                    ranges={[
                      {
                        startDate: exp.startDate ? new Date(exp.startDate) : new Date(),
                        endDate: exp.endDate ? new Date(exp.endDate) : new Date(),
                        key: 'selection'
                      }
                    ]}
                  />
                </div>
              )}
            </div>
            <input
              type="text"
              value={exp.location || ''}
              disabled={!editable}
              onChange={(e) => handleInputChange(index, 'location', e.target.value)}
              placeholder="Location"
              className="w-full"
            />
            <textarea
              value={exp.description}
              disabled={!editable}
              onChange={(e) => handleInputChange(index, 'description', e.target.value)}
              placeholder="Description"
              rows={2}
              className="w-full"
            ></textarea>
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

export default AllExperiences;
