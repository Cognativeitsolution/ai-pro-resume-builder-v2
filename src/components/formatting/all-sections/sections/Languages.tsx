import { CustomButton } from '@/components';
import AddSectionClipPath from '@/components/common/clipPath/addSectionClipPath';
import React from 'react'
import { FaCalendar, FaLock } from 'react-icons/fa'

const Languages = ({ sectionData, handleAddSec }: { sectionData: any, handleAddSec: any }) => {

  const handleAddSection = () => {
    handleAddSec({
      id: 10,
      name: "Languages",
      description: "",
      icon: "FaLanguages",
    })
  };

  const LanguagesList = [
    {
      name: "English",
      level: "Advance",
      filledDots: 4,
    },
    {
      name: "Urdu",
      level: "Basic",
      filledDots: 3,
    }
  ];

  return (
    <div className="group rounded-[10px] p-5 shadow-md border border-[#CECECE] bg-white relative h-56 hover:bg-primary2 overflow-hidden">
      <div className="text-start space-y-1">
        <h1 className="border-black border-b-2 mb-2 text-lg font-semibold">Languages</h1>
        <div className='flex  justify-between'>
          {
            LanguagesList?.map((skill: any, index: any) => (
              <div key={index} className='flex gap-3 items-center justify-between mt-2 text-xs'>

                <div className="flex flex-col">
                  <p className='font-semibold mb-1'>{skill?.name}</p>
                  <p className='text-gray-500'>{skill?.level}</p>
                </div>

                <div className="flex gap-[2px]">
                  {
                    Array.from({ length: 5 }).map((_, index: any) => (
                      <div key={index} className={`p-[5px] rounded-full  bg-gray-300 ${index < skill?.filledDots && 'bg-indigo-600'}`}></div>
                    ))
                  }
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

export default Languages;