'use client';
// ==============
import React, { useEffect, useRef, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
// ==============
import CustomDatePicker from '../../custom/CustomDatePicker';
// ==============
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addUserProjects, removeSection, sectionEditMode } from '@/redux/slices/addSectionSlice';
import { RiAddCircleFill, RiDeleteBin6Line } from 'react-icons/ri';
import { TiDelete } from 'react-icons/ti';
import SectionToolbar from '../../section-toolbar/SectionToolbar';


type ProjectType = {
  projectName: string;
  description: string;
  projectUrl: string;
  location?: string;
};

type AllProjectsType = {
  data?: any;
  textColor?: string;
  textAltColor?: string;
  templateColor: string;
};

const AllProjects = ({ data = {}, textColor = '#000', textAltColor = '', templateColor, }: AllProjectsType) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userProjects } = useSelector((state: RootState) => state.addSection);
  const [editable, setEditable] = useState<boolean>(false);
  const [projects, setProjects] = useState<ProjectType[]>([]);

  const handleEditableSection = () => {
    setEditable(true);
    dispatch(sectionEditMode(true))
  }
  // Sync local state with Redux store when userProjects changes
  useEffect(() => {
    if (Array.isArray(userProjects) && userProjects.length > 0) {
      setProjects(userProjects);
    }
  }, [userProjects]);

  // Handle changes in the project fields (e.g., name, description)
  const handleInputChange = (index: number, field: keyof ProjectType, value: string) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  // Add a new, empty project entry to the list
  const handleAddProject = () => {
    setProjects([...projects, { projectName: '', description: '', projectUrl: '', location: '' }]);
  };

  // Remove the entire section from Redux and clear its data
  const handleRemoveSection = () => {
    if (data) {
      dispatch(removeSection(data));
      dispatch(addUserProjects({ sectionId: data.id, detail: [] }));
    }
  };

  // Delete a specific project from the list based on index
  const handleDelete = (index: number) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  // Handle clicks outside the component to exit edit mode and save data to Redux
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        dispatch(sectionEditMode(false))

        setEditable(false);
        dispatch(addUserProjects({ sectionId: data.id, detail: projects }));
      }
    };

    // Attach listener on mount
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [projects, dispatch, data?.id]);

  const handleAddFirstSoftSkill = (value: string) => {
    const newSkill = { projectName: value.trim(), description: '', projectUrl: '', location: '' };
    if (newSkill.projectName !== '') {
      setProjects([newSkill]);
    }
  };


  return (
    <div ref={containerRef} className={`flex flex-col gap-4 ${editable && 'bg-white'}`} onClick={handleEditableSection}>
      {/* ====== Add and Delete Section Buttons ====== */}
      {editable && (
        <SectionToolbar
          onCopy={handleAddProject}
          onDelete={handleRemoveSection}
          // onMoveUp={handleAddAward}
          position="top-7 right-0"
          showDot={true}
        />
      )}

      {/* ===== Education Box ===== */}
      <div className="flex flex-col gap-3 divide-y-[1px] px-1">
        {projects.length > 0 ? projects.map((project, index) => (
          <div key={index} className=''>
            <div className="flex flex-col mt-2">
              {/* ====== Degree and Field of Study ====== */}
              <div className="flex items-center justify-between">
                <div className='w-full'>
                  <input
                    value={project.projectName}
                    placeholder="Project Name"
                    onChange={(e) => handleInputChange(index, 'projectName', e.target.value)}
                    className="w-full bg-transparent text-[16px] rounded placeholder:text-[16px] focus:outline-none focus:ring-0 focus:border-0"
                  />
                </div>
                {/* ====== Date Picker ====== */}
                <CustomDatePicker onChange={(dates) => console.log(dates)} />
              </div>
              {/* ====== Project URL ====== */}
              <div className="flex items-center justify-between">
                <div className='w-full'>
                  <input
                    type="text"
                    value={project.projectUrl}
                    placeholder="Project URL"
                    onChange={(e) => handleInputChange(index, 'projectUrl', e.target.value)}
                    className="w-full bg-transparent text-[14px] rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0 "
                  />
                </div>
                {/* ====== Location ====== */}
                <div className='w-full'>
                  <input
                    type="text"
                    value={project.location || ''}
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
                  value={project.description}
                  disabled={!editable}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                  placeholder="Short summary of your work"
                  rows={2}
                  className="w-full bg-transparent text-[14px] rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0"
                ></textarea>
              </div>
            </div>
            {/* ====== Delete Button ====== */}
            <div className="flex justify-end">
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-800/30 text-red-800 text-sm w-6 h-6 flex justify-center items-center rounded-l-sm"
              >
                <RiDeleteBin6Line size={16} />
              </button>
            </div>
          </div>
        )) :
          <div className=''>
            <div className="flex flex-col mt-2">
              {/* ====== Degree and Field of Study ====== */}
              <div className="flex items-center justify-between">
                <div className='w-full'>
                  <input
                    placeholder="Project Name"
                    value={''}
                    onChange={(e) => handleAddFirstSoftSkill(e.target.value)}
                    className="w-full bg-transparent text-[16px] rounded placeholder:text-[16px] focus:outline-none focus:ring-0 focus:border-0"
                  />
                </div>
                {/* ====== Date Picker ====== */}
                <CustomDatePicker onChange={(dates) => console.log(dates)} />
              </div>
              {/* ====== Project URL ====== */}
              <div className="flex items-center justify-between">
                <div className='w-full'>
                  <input
                    type="text"
                    placeholder="Project URL"
                    value={''}
                    onChange={(e) => handleAddFirstSoftSkill(e.target.value)}
                    className="w-full bg-transparent text-[14px] rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0 "
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
                    className="w-full bg-transparent text-[14px] rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0 text-end"
                  />
                </div>
              </div>
              {/* ====== Description ====== */}
              <div>
                <textarea
                  disabled={!editable}
                  value={''}
                  onChange={(e) => handleAddFirstSoftSkill(e.target.value)}
                  placeholder="Short summary of your work"
                  rows={2}
                  className="w-full bg-transparent text-[14px] rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0"
                ></textarea>
              </div>
            </div>
            {/* ====== Delete Button ====== */}
            <div className="flex justify-end">
              <button
                onClick={handleRemoveSection}
                className="bg-red-800/30 text-red-800 text-sm w-6 h-6 flex justify-center items-center rounded-l-sm"
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

export default AllProjects;
