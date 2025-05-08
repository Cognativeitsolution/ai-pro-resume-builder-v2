"use client";
import { addUserProjects, removeSection } from '@/redux/slices/addSectionSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaPen, FaTrash } from 'react-icons/fa';

type AllProjectsType = {
  data?: any;
};

const AllProjects = ({ data = {} }: AllProjectsType) => {
  const dispatch = useDispatch();

  const [inputProject, setInputProject] = useState<string>('');
  const [allProjectsData, setAllProjectsData] = useState<string[]>([]);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedProject, setEditedProject] = useState<string>('');
  const [showBtns, setShowBtns] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowBtns(false);

        // Dispatch to Redux when clicking outside
        if (allProjectsData.length > 0 && data?.id) {
          const projectsPayload = allProjectsData.map(project => ({
            type: "project",
            name: project
          }));

          dispatch(addUserProjects({
            sectionId: data.id,
            detail: projectsPayload
          }));
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [allProjectsData, data?.id, dispatch]);

  const handleAddProject = () => {
    if (inputProject.trim() !== '') {
      setAllProjectsData([...allProjectsData, inputProject.trim()]);
      setInputProject('');
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

  const handleDeleteProject = (index: number) => {
    const updated = allProjectsData.filter((_, i) => i !== index);
    setAllProjectsData(updated);
  };

  const handleEditProject = (index: number) => {
    setEditingIndex(index);
    setEditedProject(allProjectsData[index]);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editedProject.trim() !== '') {
      const updated = [...allProjectsData];
      updated[editingIndex] = editedProject.trim();
      setAllProjectsData(updated);
      setEditingIndex(null);
      setEditedProject('');
    }
  };
  const handleShowEditBtn = () => {
    setShowBtns(true);
  }
  return (

    <div ref={containerRef}
      className={`border p-4 relative flex flex-col gap-4 ${showBtns && 'bg-white'}`} onClick={handleShowEditBtn}>

      <h1>{data?.name}</h1>
      {/* Buttons */}
      {showBtns && <div className="flex gap-3 absolute top-2 right-2">
        {!showInput && (
          <button
            className="border px-3 py-1 rounded-md bg-gray-200 cursor-pointer"
            onClick={handleShowInput}
          >
            + Project
          </button>
        )}
        <button
          onClick={handleRemoveSection}
          className="border px-3 py-1 rounded-md bg-gray-200 cursor-pointer"
        >
          Delete
        </button>
      </div>}

      {/* Projects List */}
      <div className="mt-1 flex flex-wrap gap-2">
        {allProjectsData?.length ? allProjectsData.map((project, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${showBtns && 'bg-gray-100'}`}
          >
            {editingIndex === index ? (
              <>
                <input
                  className="px-2 py-1 text-sm border rounded"
                  value={editedProject}
                  onChange={(e) => setEditedProject(e.target.value)}
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
                  <li>{project}</li>
                </ul>
                {showBtns &&
                  <>
                    <button onClick={() => handleEditProject(index)} className="text-blue-400 text-xs">
                      <FaPen />
                    </button>
                    <button onClick={() => handleDeleteProject(index)} className="text-red-400 text-xs">
                      <FaTrash />
                    </button>
                  </>
                }
              </>
            )}
          </div>
        )) :
          <span onClick={handleShowInput} className='text-gray-300'>Add Project</span>
        }
      </div>

      {/* Conditional Input Field */}
      {showBtns && showInput && (
        <div className="flex gap-2">
          <input
            type="text"
            value={inputProject}
            onChange={(e) => setInputProject(e.target.value)}
            placeholder="Enter a Project"
            className="border px-3 py-1 rounded-md w-full"
            onKeyDown={(e) => e.key === 'Enter' && handleAddProject()}
            autoFocus
          />
          <button
            onClick={handleAddProject}
            className="border px-4 py-1 rounded-md bg-green-200"
          >
            Add
          </button>
        </div>
      )}

    </div>
  );
};

export default AllProjects;
