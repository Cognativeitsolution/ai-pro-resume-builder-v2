import { CustomButton } from '@/components';
import AddSectionClipPath from '@/components/common/clipPath/addSectionClipPath';

const Certificate = ({ sectionData, handleAddSec }: { sectionData: any, handleAddSec: any }) => {

  const handleAddSection = () => {
    handleAddSec({
      id: 2,
      name: "Certificate",
      description: "",
      height: "h-[80px]"
    })
  };

  return (
    <div className="group rounded-[10px] p-5 shadow-md border border-[#CECECE] bg-white relative h-56 hover:bg-primary2 overflow-hidden">

      <div className="text-start space-y-1">
        <h1 className="border-black border-b-2 mb-2 text-lg font-semibold">Certification</h1>
        <p className="text-xs text-gray-700">Lorem ipsum dolor, sit amet cons</p>
        <p className="text-xs text-gray-700">Consectetur</p>
        <hr className="border-gray-300" />
        <p className="text-xs mt-2 text-gray-700">Consectetur adipisicing</p>
        <p className="text-xs text-gray-700">Consectetur gone</p>
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

export default Certificate