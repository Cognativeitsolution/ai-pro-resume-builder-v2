import { CustomButton } from '@/components';
import AddSectionClipPath from '@/components/common/clipPath/addSectionClipPath';
import React from 'react'
import { FaCalendar, FaEdit, FaLock } from 'react-icons/fa'
import { FaConnectdevelop } from 'react-icons/fa6';

const References = ({ sectionData, handleAddSec }: { sectionData: any, handleAddSec: any }) => {

  const handleAddSection = () => {
    handleAddSec({
      id: 11,
      name: "References",
      description: "",
      icon: "FaReferences"
    })
  };

  const ReferencesList = [
    {
      name: "Rimsha Naeem",
      referContact: "Developer at Cognitive It Solution",
    },
    {
      name: "Rabia Shahwaiz",
      referContact: "Mern Developer at Cognitive It Solution",
    }
  ];

  return (
    <div className="group rounded-[10px] p-5 shadow-md border border-[#CECECE] bg-white relative h-56 hover:bg-primary2 overflow-hidden">
      <div className="text-start space-y-1">
        <h1 className="border-black border-b-2 mb-2 text-lg font-semibold">References</h1>
        <div className='flex justify-between'>
          {
            ReferencesList?.map((skill: any, index: any) => (
              <div key={index} className='flex flex-col'>
                <h2 className="text-xs font-medium text-indigo-700">{skill?.name}</h2>
                <p className='text-[10px]' key={index}>{skill?.referContact}</p>
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

export default References;