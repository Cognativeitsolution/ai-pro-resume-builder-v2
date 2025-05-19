'use client';
// ==============
import React, { useEffect, useRef, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
// ==============
import CustomInput from '../../custom/CustomInput';
import CustomTextArea from '../../custom/CustomTextArea';
import CustomDatePicker from '../../custom/CustomDatePicker';
import SectionToolbar from '../../section-toolbar/SectionToolbar';
// ==============
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { removeSection, addUserCustomSection } from '@/redux/slices/addSectionSlice';


type CustomSectionType = {
  title: string;
  description: string;
  companyName: string;
  location?: string;
};

type AllCustomSectionType = {
  data?: any;
  textColor?: string;
  textAltColor?: string;
  templateColor?: string;
  secNewNames?: any;
};

const AllCustomSection = ({ secNewNames, data = {}, textColor = '#000', textAltColor, templateColor, }: AllCustomSectionType) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userCustomSections } = useSelector((state: RootState) => state.addSection);
  const [editable, setEditable] = useState<boolean>(false);
  const [customSections, setCustomSection] = useState<CustomSectionType[]>([]);
  const handleEditableSection = () => setEditable(true);

  // Sync local state with Redux store whenever userCustomSections changes
  useEffect(() => {
    if (Array.isArray(userCustomSections) && userCustomSections.length > 0) {
      setCustomSection(userCustomSections);
    }
  }, [userCustomSections]);

  // Handle input changes for each field in an customSections entry
  const handleInputChange = (index: number, field: keyof CustomSectionType, value: string) => {
    const updated = [...customSections];
    updated[index] = { ...updated[index], [field]: value };
    setCustomSection(updated);
  };

  // Add a new blank customSections entry
  const handleAddCustomSection = () => {
    setCustomSection([...customSections, { title: '', description: '', companyName: '', location: '' }]);
  };

  // Remove the entire section and reset associated customSections in the Redux store
  const handleRemoveSection = () => {
    if (data) {
      dispatch(removeSection(data));
      dispatch(addUserCustomSection({
        sectionId: data.id,
        detail: [],
        newSecName: secNewNames
      }));
    }
  };

  // Delete a specific customSections entry by index
  const handleDelete = (index: number) => {
    const updated = customSections.filter((_, i) => i !== index);
    setCustomSection(updated);
  };

  // Detect click outside the component to disable editing and save data to Redux
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setEditable(false);
        dispatch(addUserCustomSection({
          sectionId: data.id,
          detail: customSections,
          newSecName: secNewNames
        }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [customSections, dispatch, data?.id, secNewNames]);

  const handleAddFirstCustomSection = (value: string) => {
    const newSkill = { title: value.trim(), description: '', companyName: '', location: '' };
    if (newSkill.title !== '') {
      setCustomSection([newSkill]);
    }
  };

  return (
    <div ref={containerRef} className={`flex flex-col gap-4 ${editable ? templateColor : ''}`} onClick={handleEditableSection}>
      {/* ====== Add and Delete Section Buttons ====== */}
      {editable && (
        <SectionToolbar
          onCopy={handleAddCustomSection}
          onDelete={handleRemoveSection}
          // onMoveUp={handleAddAward}
          position="top-7 right-0"
          showDot={true}
        />
      )}
      {/* ===== Section Box ===== */}
      <div className="flex flex-col gap-3 divide-y-[1px] px-1 ">
        {customSections.length > 0 ? customSections.map((exp, index) => (
          <div key={index}>
            <div className="flex flex-col mt-2">
              {/* ====== Job Title ====== */}
              <div className="flex items-center justify-between">
                <CustomInput
                  type="text"
                  value={exp.title}
                  disabled={!editable}
                  onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                  placeholder="Title"
                  baseClass="text-[16px] placeholder:text-[16px]"
                />
                {/* ====== Date Picker ====== */}
                <CustomDatePicker onChange={(dates) => console.log(dates)} />
              </div>
              {/* ====== Location ====== */}
              <CustomInput
                type="text"
                value={exp.location || ''}
                disabled={!editable}
                onChange={(e) => handleInputChange(index, 'location', e.target.value)}
                placeholder="Location"
                baseClass="text-[14px] placeholder:text-[14px]"
              />
              {/* ====== Description ====== */}
              <CustomTextArea
                value={exp.description}
                disabled={!editable}
                onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                placeholder="Description"
                rows={2}
                baseClass="text-[14px] placeholder:text-[14px]"
              />
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
                <CustomInput
                  type="text"
                  disabled={false}
                  value={''}
                  onChange={(e) => handleAddFirstCustomSection(e.target.value)}
                  placeholder="Title"
                  baseClass="text-[16px] placeholder:text-[16px]"
                />
                {/* ====== Date Picker ====== */}
                <CustomDatePicker onChange={(dates) => console.log(dates)} />
              </div>
              {/* ====== Location ====== */}
              <CustomInput
                type="text"
                disabled={false}
                value={''}
                onChange={(e) => handleAddFirstCustomSection(e.target.value)}
                placeholder="Location"
                baseClass="text-[14px] placeholder:text-[14px]"
              />
              {/* ====== Description ====== */}
              <CustomTextArea
                disabled={false}
                value={''}
                onChange={(e) => handleAddFirstCustomSection(e.target.value)}
                placeholder="Description"
                rows={2}
                baseClass="text-[14px] placeholder:text-[14px]"
              />
            </div>
            {/* ====== Delete Button ====== */}
            <div className="flex justify-end mt-2">
              <button
                className="bg-red-800/30 text-red-800 text-sm w-6 h-6 flex justify-center items-center rounded-l-sm"
                onClick={handleRemoveSection}>
                <RiDeleteBin6Line size={16} />
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default AllCustomSection;
