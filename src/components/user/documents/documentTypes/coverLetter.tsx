// components/user/CoverLetter.tsx
'use client';

import CoverLetterTemplate from 'media/assets/cover_template_images/template_15.webp';
import SelectTemplates from '@/components/stepTabs/SelectTemplates';

const coverLetter = [
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
    id: 7,
    name: 'Academic Cover Letter',
    type: 'cover',
    date: 'April 2025',
    template: 'Classic',
    numberOfDoc: 303,
    image: CoverLetterTemplate,
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

const CoverLetter = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-black mt-12 mb-2">{`My Cover Letter (${coverLetter.length})`}</h2>
      <div className="bg-white/90 px-4 py-0 rounded-md shadow-lg border border-gray-200 ">
        <SelectTemplates templates={coverLetter} isContainer={false} />
      </div>
    </div>
  );
};

export default CoverLetter;
export { coverLetter };
