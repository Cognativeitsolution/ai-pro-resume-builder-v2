import { CustomButton } from '@/components';
import AddSectionClipPath from '@/components/common/clipPath/addSectionClipPath';

const Skills = ({ sectionData, handleAddSec }: { sectionData: any, handleAddSec: any }) => {

  const skillsList = ["ReactJS", "MongoDB", "Angular", "NextJS", "Typescript", "NodeJs", "ExpressJs"];

  const handleAddSection = () => {
    handleAddSec({
      id: 1,
      name: "Skills",
      description: "",
      locked: false
    })
  };

  return (
    <div className="group p-5 shadow-md bg-white relative cursor-pointer border border-[#CECECE] overflow-hidden h-56 hover:bg-primary2 rounded-[10px] transition-all">
      <div className="text-start space-y-1">
        <h1 className="border-black border-b-2 mb-2 text-lg font-semibold">Skills</h1>
        <p className="text-xs text-gray-500">Frontend Developer</p>
        <div className='grid grid-cols-4 gap-x-2'>
          {
            skillsList?.map((skill: any, index: any) => (
              <p key={index} className="text-[10px] text-center border-gray-500 border-b-[1.5px] mt-2">{skill}</p>
            ))
          }
        </div>
        <hr className="border-gray-300" />
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

export default Skills