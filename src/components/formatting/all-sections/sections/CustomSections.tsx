'use client';
// ============
import React from 'react';
import { FaReact } from 'react-icons/fa6';
import { FaCalendar } from 'react-icons/fa';
import { CustomButton } from '@/components';
// ============
import usePopup from '@/app/configs/store/Popup';

const CustomSections = () => {
    const { togglePopup, popup } = usePopup();

    const popupHandle = () => {
        togglePopup(popup);
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
                <div className='flex flex-col'>
                    {CustomSecList.map((skill, index) => (
                        <div key={index} className='text-start mt-1 text-xs border-b group-hover:border-b-gray-500'>
                            <div className="text-[10px] flex justify-between items-center gap-1">
                                <div className='flex items-center gap-2'>
                                    <FaReact className='text-base text-indigo-700' />
                                    <h1 className="text-[12px] font-medium text-indigo-500">{skill.name}</h1>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <FaCalendar className='text-[10px]' />
                                    <span>{skill.date}</span>
                                </div>
                            </div>
                            <ul className="list-disc ms-6">
                                {skill.details.map((data, i) => (
                                    <li key={i} className='text-[10px]'>{data}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <CustomButton
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2  -translate-y-1/2 bg-primary3 w-48 px-3 py-2 rounded-[5px] opacity-0 group-hover:opacity-100 transition-all"
                title='+ Add to Resume'
                altColor='text-white'
                onClick={popupHandle}
            />
        </div>
    );
};

export default CustomSections;
