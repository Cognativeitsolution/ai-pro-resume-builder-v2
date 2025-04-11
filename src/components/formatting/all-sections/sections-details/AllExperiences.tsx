"use client";
import { addUserExperience, removeSection } from '@/redux/slices/addSectionSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaPen, FaTrash } from 'react-icons/fa';

type AllExperienceType = {
  textValue: string;
  data?: any;
};

const AllExperiences = ({ textValue = '', data = {} }: AllExperienceType) => {
  const dispatch = useDispatch();

  const [inputSkill, setInputSkill] = useState<string>('');
  const [allExperienceData, setAllExperienceData] = useState<string[]>([]);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedSkill, setEditedSkill] = useState<string>('');
  const [showBtns, setShowBtns] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowBtns(false);

        // Dispatch to Redux when clicking outside
        if (allExperienceData.length > 0 && data?.id) {
          const ExperiencePayload = allExperienceData.map(skill => ({
            type: "skill",
            name: skill
          }));

          dispatch(addUserExperience({
            sectionId: data.id,
            detail: ExperiencePayload
          }));
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [allExperienceData, data?.id, dispatch]);

  const handleAddSkill = () => {
    if (inputSkill.trim() !== '') {
      setAllExperienceData([...allExperienceData, inputSkill.trim()]);
      setInputSkill('');
      setShowInput(false);
    }
  };

  const handleShowInput = () => {
    setShowInput(true);
  };

  const handleRemoveSection = () => {
    if (data) {
      dispatch(removeSection(data));
    }
  };

  const handleDeleteSkill = (index: number) => {
    const updated = allExperienceData.filter((_, i) => i !== index);
    setAllExperienceData(updated);
  };

  const handleEditSkill = (index: number) => {
    setEditingIndex(index);
    setEditedSkill(allExperienceData[index]);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editedSkill.trim() !== '') {
      const updated = [...allExperienceData];
      updated[editingIndex] = editedSkill.trim();
      setAllExperienceData(updated);
      setEditingIndex(null);
      setEditedSkill('');
    }
  };
  const handleShowEditBtn = () => {
    setShowBtns(true);
  }
  return (

    <div ref={containerRef}
      className={`border p-4 relative flex flex-col gap-4 ${showBtns && 'bg-white'}`} onClick={handleShowEditBtn}>

      <h1>{textValue}</h1>
      {/* Buttons */}
      {showBtns && <div className="flex gap-3 absolute top-2 right-2">
        {!showInput && (
          <button
            className="border px-3 py-1 rounded-md bg-gray-200 cursor-pointer"
            onClick={handleShowInput}
          >
            + Experience
          </button>
        )}
        <button
          onClick={handleRemoveSection}
          className="border px-3 py-1 rounded-md bg-gray-200 cursor-pointer"
        >
          Delete
        </button>
      </div>}

      {/* Experience List */}
      <div className="mt-1 flex flex-wrap gap-2">
        {allExperienceData?.length ? allExperienceData.map((skill, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${showBtns && 'bg-gray-100'}`}
          >
            {editingIndex === index ? (
              <>
                <input
                  className="px-2 py-1 text-sm border rounded"
                  value={editedSkill}
                  onChange={(e) => setEditedSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                  autoFocus
                />
                <button onClick={handleSaveEdit} className="text-green-600 text-xs">
                  Save
                </button>
              </>
            ) : (
              <>
                <ul className='list-disc ps-2'>
                  <li>{skill}</li>
                </ul>
                {showBtns &&
                  <>
                    <button onClick={() => handleEditSkill(index)} className="text-blue-400 text-xs">
                      <FaPen />
                    </button>
                    <button onClick={() => handleDeleteSkill(index)} className="text-red-400 text-xs">
                      <FaTrash />
                    </button>
                  </>
                }
              </>
            )}
          </div>
        )) :
          <span onClick={handleShowInput} className='text-gray-300'>Add Experience</span>
        }
      </div>

      {/* Conditional Input Field */}
      {showBtns && showInput && (
        <div className="flex gap-2">
          <input
            type="text"
            value={inputSkill}
            onChange={(e) => setInputSkill(e.target.value)}
            placeholder="Enter a skill"
            className="border px-3 py-1 rounded-md w-full"
            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
            autoFocus
          />
          <button
            onClick={handleAddSkill}
            className="border px-4 py-1 rounded-md bg-green-200"
          >
            Add
          </button>
        </div>
      )}

    </div>
  );
};

export default AllExperiences;
