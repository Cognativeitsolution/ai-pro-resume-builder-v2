// components/user/Resume.tsx
'use client';

import ResumeTemplate from 'media/assets/resume_template_images/template_1.webp';
import SelectTemplates from '@/components/stepTabs/SelectTemplates';

const resume = [
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
    id: 2,
    name: 'Modern Resume',
    type: 'resume',
    date: 'May 2025',
    template: 'Modern',
    numberOfDoc: 202,
    image: ResumeTemplate,
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
];

const Resume = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-black mt-12 mb-2">{`My Resume (${resume.length})`}</h2>
      <div className="bg-white/90 px-4 py-0 p-4 rounded-md shadow-lg border border-gray-200 ">
        <SelectTemplates templates={resume} isContainer={false} />
      </div>
    </div>
  );
};

export default Resume;
export { resume };
