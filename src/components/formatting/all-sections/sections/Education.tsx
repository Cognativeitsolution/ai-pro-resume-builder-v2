import { CustomButton } from '@/components';
import AddSectionClipPath from '@/components/common/clipPath/addSectionClipPath';
import React from 'react'
import { FaCalendar, FaLock } from 'react-icons/fa'

const Education = ({ sectionData, handleAddSec }: { sectionData: any, handleAddSec: any }) => {

  const handleAddSection = () => {
    handleAddSec({
      id: 4,
      name: "Education",
      description: ""
    })
  };

  const educationList = [
    {
      institute: "Software Engineering",
      location: "Karachi, Pakistan",
      date: "2019"
    },
    {
      institute: "Master of Business Administration",
      location: "Karachi, Pakistan",
      date: "2017"
    }
  ];

  return (
    <div className="group rounded-[10px] p-5 shadow-md border border-[#CECECE] bg-white relative h-56 hover:bg-primary2 overflow-hidden">
      <div className="text-start space-y-1">
        <h1 className="border-black border-b-2 mb-2 text-lg font-semibold">Education</h1>
        <div className='flex flex-col items-start'>
          {
            educationList?.map((skill: any, index: any) => (
              <div key={index} className='text-start mt-2 text-xs items-start'>
                <h1 className="text-xs font-medium">{skill?.institute}</h1>
                <p className="text-[10px]">{skill.location}</p>
                <p className="text-[10px] flex items-center gap-1">
                  <span><FaCalendar className='text-[10px]' /></span>
                  <span>{skill?.date}</span>
                </p>
              </div>
            ))
          }
        </div>
      </div>

      {sectionData?.locked && <AddSectionClipPath />}

      <CustomButton className="absolute bottom-4 left-1/2 transform -translate-x-1/2  -translate-y-1/2 bg-primary3 w-48 px-3 py-2 rounded-[5px] opacity-0 group-hover:opacity-100 transition-all"
        title='+ Add to Resume'
        altColor='text-white'
        onClick={handleAddSection}
      />
    </div>
  )
}

export default Education