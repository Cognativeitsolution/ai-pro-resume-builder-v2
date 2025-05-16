'use client';
// ============
import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { FaCheck, FaPlus } from 'react-icons/fa6';
// ============
import { CustomButton } from '@/components';
import usePopup from '@/app/configs/store/Popup';
import AddSectionClipPath from '../common/clipPath/addSectionClipPath';

const Popup = ({ sectionData, handleAddSec }: { sectionData: any, handleAddSec: any }) => {
    const [selectedFields, setSelectedFields] = useState<string[]>(['Title']);
    const { popup, togglePopup } = usePopup();

    const popupHandle = () => {
        togglePopup(popup);
    };

    const handleAddSection = () => {
        handleAddSec({
            id: 12,
            name: "Custom Section",
            description: "",
        });
    };

    if (!popup) return null;

    return (
        <div className="popup fixed inset-0 z-50">
            <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-dvh bg-zinc-600/80">
                <div className="container">
                    <div className="w-2/4 mx-auto bg-white border border-indigo-200 rounded-md p-10 relative">
                        <FaPlus onClick={popupHandle} className='absolute right-2 top-2 rotate-45 hover:-rotate-45 transition-all duration-300 text-[24px] cursor-pointer text-primaryBlue' />
                        <h3 className='text-[30px] font-medium text-center mb-10'>Custom section</h3>

                        <div className="grid grid-cols-2 gap-10">
                            <div className="bg-white rounded-md shadow-lg p-5 w-3/4">
                                <h3 className='text-[20px] font-medium underline mb-1'>Section Title</h3>
                                <div className="flex gap-2">
                                    {selectedFields.length > 0 && (
                                        <>
                                            {selectedFields.includes('Icon') && <FaHome className='text-[14px] mt-[2px] text-primaryBlue' />}
                                            <div className="flex flex-col gap-1">
                                                {selectedFields.includes('Title') && <h4 className='text-[14px]'>Title</h4>}
                                                {selectedFields.includes('Date') && <p className='text-[14px]'>Date</p>}
                                                {selectedFields.includes('Description') && <p className='text-[14px]'>Description</p>}
                                                {selectedFields.includes('Location') && <p className='text-[14px]'>Location</p>}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h5 className='text-[18px]'>What should this section have?</h5>
                                <div className='flex flex-col gap-2'>
                                    {['Title', 'Icon', 'Date', 'Description', 'Location'].map((field) => (
                                        <label key={field} className="w-max inline-flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={selectedFields.includes(field)}
                                                onChange={() => setSelectedFields(prev =>
                                                    prev.includes(field)
                                                        ? prev.filter(f => f !== field)
                                                        : [...prev, field]
                                                )}
                                            />
                                            <div className="w-5 h-5 rounded border border-gray-400 peer-checked:border-primaryBlue peer-checked:bg-primaryBlue flex items-center justify-center transition-colors duration-150">
                                                {selectedFields.includes(field) && <FaCheck className='text-white' />}
                                            </div>
                                            <span className="ml-2 text-sm text-gray-700">{field}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {sectionData?.locked && <AddSectionClipPath />}

                        <div className="flex items-center justify-center mt-8">
                            <CustomButton
                                className="bg-primary3 w-max px-3 py-2 rounded-[4px]"
                                title='Add Section'
                                altColor='text-white'
                                onClick={handleAddSection}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
