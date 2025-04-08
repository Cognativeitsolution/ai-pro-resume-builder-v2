import { FaStar } from 'react-icons/fa'

const AddSectionClipPath = () => {
    return (
        <div
            className="absolute -right-[60px] top-[-3px] z-50 w-[150px] h-9 bg-[#9885FF] rotate-45 flex items-center justify-center transition-all duration-700"
            style={{
                clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
            }}
        >
            <span className="text-white text-sm flex items-center justify-center">
                <FaStar />
            </span>
        </div>
    )
}

export default AddSectionClipPath