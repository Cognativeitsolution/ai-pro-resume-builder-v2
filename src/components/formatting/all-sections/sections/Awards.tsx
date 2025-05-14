import { CustomButton } from '@/components';
import AddSectionClipPath from '@/components/common/clipPath/addSectionClipPath';
import React from 'react'
import { FaCalendar, FaConnectdevelop, FaEdit, FaGift } from 'react-icons/fa'
import { FaGlobe } from 'react-icons/fa6';

const Awards = ({ sectionData, handleAddSec }: { sectionData: any, handleAddSec: any }) => {

  const handleAddSection = () => {
    handleAddSec({
      id: 9,
      name: "Awards",
      description: ""
    })
  };

  const AwardsList = [
    {
      name: "Developer",
      details: "Certified developer",
      date: "2019",
      icon: <FaConnectdevelop />
    },
    {
      name: "Writer",
      details: "Certified writer",
      date: "2020",
      icon: <FaEdit />
    }
  ];

  return (
    <div className="group rounded-[10px] p-5 shadow-md border border-[#CECECE] bg-white relative h-56 hover:bg-primary2 overflow-hidden">
      <div className="text-start space-y-1">
        <h1 className="border-black border-b-2 mb-2 text-lg font-semibold">Awards</h1>
        <div className='flex items-start gap-10'>
          {
            AwardsList?.map((skill: any, index: any) => (
              <div key={index} className='flex justify-between'>
                <div className="mt-[1px] text-sm  text-indigo-700">
                  {skill?.icon}
                </div>
                <div className="ms-1">
                  <h1 className="text-xs font-medium  text-indigo-700">{skill?.name}</h1>
                  <p className="text-[10px] flex items-center gap-1 mt-1">
                    <FaCalendar className='text-[10px]' />
                    <span>{skill?.date}</span>
                  </p>
                  <p className='text-[10px]' key={index}>{skill?.details}</p>
                </div>
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

export default Awards;