import { CustomButton } from '@/components';
import AddSectionClipPath from '@/components/common/clipPath/addSectionClipPath';
import { FaCalendar } from 'react-icons/fa'
import { FaReact } from 'react-icons/fa6';

const CustomSections = ({ sectionData, handleAddSec }: { sectionData: any, handleAddSec: any }) => {

  const handleAddSection = () => {
    handleAddSec({
      id: 12,
      name: "Custom_Section",
      description: "",
    })
  };

  const CustomSecList = [
    {
      name: "Challegnes",
      details: ["But I must how all taken", "How all this mistaken", "There righteous."],
      date: "2019 - 2025"
    },
    {
      name: "Extra Section",
      details: ["But I must how all taken", "How all this mistaken", "There righteous."],
      date: "2020 - 2025"
    }
  ];

  return (
    <div className="group rounded-[10px] p-5 shadow-md border border-[#CECECE] bg-white relative h-56 hover:bg-primary2 overflow-hidden">
      <div className="text-start space-y-1">
        <h1 className="border-black border-b-2 mb-2 text-lg font-semibold">Custom Section</h1>
        <div className='flex flex-col '>
          {
            CustomSecList?.map((skill: any, index: any) => (
              <div key={index} className='text-start mt-1 text-xs border-b-[1px]'>
                <p className="text-[10px] flex justify-between items-center gap-1">
                  <div className='flex items-center gap-2'>
                    <FaReact className='text-base  text-indigo-700' />
                    <h1 className="text-[12px] font-medium text-indigo-500">{skill?.name}</h1>
                  </div>
                  <div className='flex items-center gap-1'>
                    <FaCalendar className='text-[10px]' />
                    <span>{skill?.date}</span>
                  </div>
                </p>
                <ul className="list-disc ms-6">
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

export default CustomSections;