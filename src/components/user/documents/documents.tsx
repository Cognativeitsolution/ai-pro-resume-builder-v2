'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ResumeTemplate from 'media/assets/resume_template_images/template_1.webp';
import CoverLetterTemplate from 'media/assets/cover_template_images/template_1.webp';
import { BiDuplicate } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { FaRegFileAlt } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import SelectTemplates from '@/components/stepTabs/SelectTemplates';

// Sample document data
const documents = [
  {
    id: 1,
    name: 'Executive Resume',
    type: 'resume',
    date: 'June 2025',
    template: 'Classic',
    numberOfDoc: 201,
    image: ResumeTemplate,
  },
  {
    id: 6,
    name: 'Startup Cover Letter',
    type: 'cover',
    date: 'May 2025',
    template: 'Modern',
    numberOfDoc: 302,
    image: CoverLetterTemplate,
  },
  {
    id: 2,
    name: 'Modern Resume',
    type: 'resume',
    date: 'May 2025',
    template: 'Modern',
    numberOfDoc: 202,
    image: ResumeTemplate,
  },
  {
    id: 7,
    name: 'Academic Cover Letter',
    type: 'cover',
    date: 'April 2025',
    template: 'Classic',
    numberOfDoc: 303,
    image: CoverLetterTemplate,
  },
  {
    id: 3,
    name: 'Tech Resume',
    type: 'resume',
    date: 'April 2025',
    template: 'Bold',
    numberOfDoc: 203,
    image: ResumeTemplate,
  },
  {
    id: 4,
    name: 'Creative Resume',
    type: 'resume',
    date: 'March 2025',
    template: 'Elegant',
    numberOfDoc: 204,
    image: ResumeTemplate,
  },
  {
    id: 5,
    name: 'Formal Cover Letter',
    type: 'cover',
    date: 'June 2025',
    template: 'Minimalist',
    numberOfDoc: 301,
    image: CoverLetterTemplate,
  },
];

const tabs = ['All Documents', 'My Resume', 'My Cover Letter'];

const Documents = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(prev => !prev);
  };

  const [activeTab, setActiveTab] = useState('All Documents');

  const totalDocs = documents.length;
  const totalResumes = documents.filter(doc => doc.type === 'resume').length;
  const totalCovers = documents.filter(doc => doc.type === 'cover').length;

  const tabs = [
    { label: `All Documents (${totalDocs})`, key: 'All Documents' },
    { label: `My Resume (${totalResumes})`, key: 'My Resume' },
    { label: `My Cover Letter (${totalCovers})`, key: 'My Cover Letter' },
  ];
  const filteredDocs = documents.filter((doc) => {
    if (activeTab === 'All Documents') return true;
    if (activeTab === 'My Resume') return doc.type === 'resume';
    if (activeTab === 'My Cover Letter') return doc.type === 'cover';
  });

  return (
    <div>
      {/* Tabs */}
      <div className='items-center justify-between flex flex-wrap border-b border-gray-200'>
        <ul className="flex flex-wrap text-base font-medium text-center">
          {tabs.map(({ label, key }) => (
            <li key={key} className="me-4">
              <button
                onClick={() => setActiveTab(key)}
                className={`inline-block py-2 px-3 rounded-t-md ${activeTab === key
                  ? 'text-hamzaPrimary bg-hamzaPrimary/10'
                  : 'text-primarySlate/80 hover:bg-gray-50'
                  }`}
              >
                {label}
              </button>
            </li>
          ))}

        </ul>
        <div className="relative inline-block">
          {/* Main Button */}
          <button
            onClick={toggleOptions}
            className="flex items-center gap-2 px-3 py-2 bg-hamzaPrimary text-white rounded-t-md shadow hover:shadow-md transition duration-300 font-medium"
          >
            <IoIosAdd className={`text-2xl transition-transform duration-300 ${showOptions ? 'rotate-45' : ''}`} />
            Create New
          </button>

          {/* Dropdown Options */}
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

      {/* Document Cards */}
      {/* <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6"> */}
      <SelectTemplates templates={filteredDocs} isContainer={false} />
      {/* {filteredDocs.map((doc) => (
          <div key={doc.id} className="bg-white border rounded-md shadow-sm p-4 flex flex-col items-center">
            <div className="text-sm font-medium mb-1">{doc.name}</div>
            <div className="text-xs text-gray-400 mb-2">{doc.date}</div>
            <div className="w-[14rem] h-[19rem] mb-3 border border-gray-200 rounded overflow-hidden">
              <Image
                src={doc.image}
                alt={doc.name}
                className="object-cover w-full h-full"
                width={500}
                height={500}
              />
            </div>
            <div className="flex gap-3">
              <button className="text-sm text-primarySlate/80 hover:text-black flex items-center duration-200">
                Duplicate <BiDuplicate className='text-lg ml-1' />
              </button>
              <div className='h-6 w-[1.1px] bg-primaryGray/50'>
              </div>
              <button className="text-sm text-primarySlate/80 flex items-center hover:text-red-500 duration-200">
                Delete <AiOutlineDelete className='text-lg ml-1' />
              </button>
            </div>
          </div>
        ))} */}
      {/* </div> */}
    </div>
  );
};

export default Documents;
