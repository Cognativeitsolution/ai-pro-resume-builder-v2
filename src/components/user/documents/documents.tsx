// components/user/Documents.tsx
'use client';

import React, { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { FaRegFileAlt } from 'react-icons/fa';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import SelectTemplates from '@/components/stepTabs/SelectTemplates';
import Resume, { resume } from './documentTypes/resume';
import CoverLetter, { coverLetter } from './documentTypes/coverLetter';

const Documents = () => {
  const [activeTab, setActiveTab] = useState('All Documents');
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => setShowOptions(prev => !prev);

  const totalResumes = resume.length;
  const totalCoverLetters = coverLetter.length;
  const totalDocs = totalResumes + totalCoverLetters;

  const tabs = [
    { label: 'All Documents', value: `All Documents (${totalDocs})` },
    { label: 'My Resume', value: `My Resume (${totalResumes})` },
    { label: 'My Cover Letter', value: `My Cover Letter (${totalCoverLetters})` }
  ];

  const getDocuments = () => {
    switch (activeTab) {
      case 'My Resume':
        return resume;
      case 'My Cover Letter':
        return coverLetter;
      case 'All Documents':
      default:
        return [...resume, ...coverLetter];
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div className="items-center justify-between flex flex-wrap border-b border-gray-200">
        <ul className="flex flex-wrap text-base font-medium text-center">
          {tabs.map(tab => (
            <li key={tab.label} className="me-4">
              <button
                onClick={() => setActiveTab(tab.label)}
                className={`inline-block py-2 px-3 rounded-t-md ${activeTab === tab.label
                  ? 'text-hamzaPrimary bg-hamzaPrimary/10'
                  : 'text-primarySlate/80 hover:bg-gray-50'
                  }`}
              >
                {tab.value}
              </button>
            </li>
          ))}
        </ul>

        <div className="relative inline-block">
          <button
            onClick={toggleOptions}
            className="flex items-center gap-2 px-3 py-2 bg-hamzaPrimary text-white rounded-t-md shadow hover:shadow-md transition duration-300 font-medium"
          >
            <IoIosAdd className={`text-2xl transition-transform duration-300 ${showOptions ? 'rotate-45' : ''}`} />
            Create New
          </button>

          {showOptions && (
            <div className="absolute top-full -left-5 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
              <button
                onClick={() => alert('New Resume')}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm text-primarySlate"
              >
                <FaRegFileAlt className="text-hamzaPrimary" />
                New Resume
              </button>
              <button
                onClick={() => alert('New Cover Letter')}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm text-primarySlate"
              >
                <MdOutlineMarkEmailRead className="text-hamzaPrimary" />
                New Cover Letter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === 'All Documents' ? (
          <>
            <Resume />
            <CoverLetter />
          </>
        ) : (
          <SelectTemplates templates={getDocuments()} isContainer={false} />
        )}
      </div>
    </div>
  );
};

export default Documents;
