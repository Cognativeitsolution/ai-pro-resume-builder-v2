import React, { forwardRef } from 'react';
import { CgClose } from 'react-icons/cg';

type propType = {
    setAddSectionModal: React.Dispatch<React.SetStateAction<boolean>>;
    addSectionModal: boolean;
};

const CustomModal = forwardRef<HTMLDivElement, propType>(({ setAddSectionModal }, ref) => {
    return (
        <div className="bg-[rgba(0,0,0,0.5)] flex justify-center items-center fixed top-0 left-0 w-full h-full z-[9999]">
            <div className="bg-white w-[95%] lg:w-[50%] 2xl:w-[60%] font-Lexend flex flex-col rounded-lg border-[0.9px] shadow-lg border-primaryBlue/60" ref={ref} >
                <div className="flex w-full px-8 py-5 justify-between border-b border-primaryBlue/60">
                    <CgClose
                        onClick={() => setAddSectionModal(false)}
                        className="cursor-pointer right-0 items-end float-end"
                        size={24}
                    />
                </div>
                <div className="p-4">
                    {/* Your modal content goes here */}
                    <h2>Modal Content</h2>
                </div>
            </div>
        </div>
    );
});

CustomModal.displayName = 'CustomModal';
export default CustomModal;
