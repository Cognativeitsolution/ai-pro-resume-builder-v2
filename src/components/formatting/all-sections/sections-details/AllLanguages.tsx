"use client";
import { addUserLanguages, removeSection } from '@/redux/slices/addSectionSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaPen, FaTrash } from 'react-icons/fa';

type AllLanguagesType = {
  textValue: string;
  data?: any;
};

const AllLanguages = ({ textValue = '', data = {} }: AllLanguagesType) => {
  const dispatch = useDispatch();

  const [inputLanguage, setInputLanguage] = useState<string>('');
  const [allLanguagesData, setAllLanguagesData] = useState<string[]>([]);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedLanguage, setEditedLanguage] = useState<string>('');
  const [showBtns, setShowBtns] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowBtns(false);

        // Dispatch to Redux when clicking outside
        if (allLanguagesData.length > 0 && data?.id) {
          const LanguagesPayload = allLanguagesData.map(Language => ({
            type: "Language",
            name: Language
          }));

          dispatch(addUserLanguages({
            sectionId: data.id,
            detail: LanguagesPayload
          }));
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [allLanguagesData, data?.id, dispatch]);

  const handleAddLanguage = () => {
    if (inputLanguage.trim() !== '') {
      setAllLanguagesData([...allLanguagesData, inputLanguage.trim()]);
      setInputLanguage('');
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

  const handleDeleteLanguage = (index: number) => {
    const updated = allLanguagesData.filter((_, i) => i !== index);
    setAllLanguagesData(updated);
  };

  const handleEditLanguage = (index: number) => {
    setEditingIndex(index);
    setEditedLanguage(allLanguagesData[index]);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editedLanguage.trim() !== '') {
      const updated = [...allLanguagesData];
      updated[editingIndex] = editedLanguage.trim();
      setAllLanguagesData(updated);
      setEditingIndex(null);
      setEditedLanguage('');
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
            + Language
          </button>
        )}
        <button
          onClick={handleRemoveSection}
          className="border px-3 py-1 rounded-md bg-gray-200 cursor-pointer"
        >
          Delete
        </button>
      </div>}

      {/* Languages List */}
      <div className="mt-1 flex flex-wrap gap-2">
        {allLanguagesData?.length ? allLanguagesData.map((Language, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${showBtns && 'bg-gray-100'}`}
          >
            {editingIndex === index ? (
              <>
                <input
                  className="px-2 py-1 text-sm border rounded"
                  value={editedLanguage}
                  onChange={(e) => setEditedLanguage(e.target.value)}
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
                  <li>{Language}</li>
                </ul>
                {showBtns &&
                  <>
                    <button onClick={() => handleEditLanguage(index)} className="text-blue-400 text-xs">
                      <FaPen />
                    </button>
                    <button onClick={() => handleDeleteLanguage(index)} className="text-red-400 text-xs">
                      <FaTrash />
                    </button>
                  </>
                }
              </>
            )}
          </div>
        )) :
          <span onClick={handleShowInput} className='text-gray-300'>Add Language</span>
        }
      </div>

      {/* Conditional Input Field */}
      {showBtns && showInput && (
        <div className="flex gap-2">
          <input
            type="text"
            value={inputLanguage}
            onChange={(e) => setInputLanguage(e.target.value)}
            placeholder="Enter a Language"
            className="border px-3 py-1 rounded-md w-full"
            onKeyDown={(e) => e.key === 'Enter' && handleAddLanguage()}
            autoFocus
          />
          <button
            onClick={handleAddLanguage}
            className="border px-4 py-1 rounded-md bg-green-200"
          >
            Add
          </button>
        </div>
      )}

    </div>
  );
};

export default AllLanguages;
