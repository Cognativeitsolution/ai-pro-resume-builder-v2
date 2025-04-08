import { CustomButton } from '@/components';
import AddSectionClipPath from '@/components/common/clipPath/addSectionClipPath';
import React from 'react'
import { FaCalendar, FaLock } from 'react-icons/fa'

const Projects = ({ sectionData, handleAddSec }: { sectionData: any, handleAddSec: any }) => {

  const handleAddSection = () => {
    handleAddSec({
      id: 5,
      name: "Projects",
      description: ""
    })
  };

  const ProjectsList = [
    {
      name: "Software Engineering",
      details: ["But I must explain to you how all this mistahow all this mistaken", "How all this mistahow all this mistaken", "There are many reg rtg de reg rtg de reg rtg denounce with righteous."],
      date: "2019"
    }
  ];

  return (
    <div className="group rounded-[10px] p-5 shadow-md border border-[#CECECE] bg-white relative h-56 hover:bg-primary2 overflow-hidden">
      <div className="text-start space-y-1">
        <h1 className="border-black border-b-2 mb-2 text-lg font-semibold">Projects</h1>
        <div className='flex flex-col items-start'>
          {
            ProjectsList?.map((skill: any, index: any) => (
              <div key={index} className='text-start mt-2 text-xs items-start'>
                <h1 className="text-xs font-medium">{skill?.name}</h1>
                <p className="text-[10px] flex items-center gap-1">
                  <span><FaCalendar className='text-[10px]' /></span>
                  <span>{skill?.date}</span>
                </p>
                <ul className="list-disc ms-4">
                  {skill?.details?.map((data: any, index: number) => (
                    <li className='text-[10px]' key={index}>{data}</li>
                  ))}
                </ul>
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

export default Projects;