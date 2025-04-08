"use client";
import React, { useEffect, useState } from 'react';
import { IoIosArrowDown, IoMdMove } from 'react-icons/io';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { FaPencil } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type propsType = {
    sectionName?: any,
    sectionType?: any,
}

export default function ProfileSection(props: propsType) {
    const { sectionName, sectionType } = props
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDetailsExpanded, setIsDetailsExpanded] = useState<any>();
    const { token } = useSelector((state: RootState) => state.auth);
    const [profileSection, setProfileSection] = useState<any[]>([])

    useEffect(() => {
        if (token && sectionType && sectionType.length > 0) {
            setProfileSection(sectionType)
        }
    }, [token, sectionType])

    const getSectionMenu = (section: any) => {
        switch (sectionName) {
            case 'experiences':
                return [
                    { key: 'job_position', label: 'Job Position' },
                    { key: 'company_name', label: 'Company Name' },
                    { key: 'job_description', label: 'Job Description' },
                    { key: 'country_id', label: 'Country' },
                    { key: 'state', label: 'State' },
                    { key: 'city', label: 'City' },
                    { key: 'start_date', label: 'Start Date' },
                    { key: 'end_date', label: 'End Date' },
                ];

            case 'awards':
                return [
                    { key: 'name', label: 'Award Title' },
                    { key: 'body', label: 'Authorization Body' },
                    { key: 'description', label: 'Award Details' },
                    { key: 'date', label: 'Issue Date' }
                ];

            case 'education':
                return [
                    { key: 'institution', label: 'Institution' },
                    { key: 'degree', label: 'Degree' },
                    { key: 'field', label: 'Field of Study' },
                    { key: 'grade_type', label: 'Grade, CGPA or Percentage' },
                    { key: 'grade', label: 'Grade Type' },
                    { key: 'start_date', label: 'Start Date' },
                    { key: 'end_date', label: 'End Date' },
                ];

            case 'certificates':
                return [
                    { key: 'title', label: 'Certificate Title' },
                    { key: 'institute', label: 'Authorization Body' },
                    { key: 'description', label: 'Certificate Details' },
                    { key: 'date', label: 'Issue Date' }
                ];

            case 'languages':
                return [
                    { key: 'name', label: 'Language' },
                    { key: 'level', label: 'Level' }
                ];

            case 'references':
                return [
                    { key: 'name', label: 'Title' },
                    { key: 'email', label: 'Email Address' },
                    { key: 'company', label: 'Company Description' },
                    { key: 'designation', label: 'Designation' }
                ];

            default:
                return [];
        }
    };

    const handleDetailIsExpanded = (id: any) => {
        console.log(id, "handleDetailIsExpanded");
        setIsDetailsExpanded((prevIndex: any) => (prevIndex === id ? null : id));
    }
    return (
        <div className="py-4 font-Lexend">
            <div
                className="flex justify-between items-center text-primarySlate font-bold cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex gap-2 items-center">
                    <span className="min-w-[90px] capitalize">{sectionName}</span>
                    <span className="bg-primaryBlue/25 w-8 h-8 flex justify-center items-center rounded-full text-sm">
                        {profileSection.length}
                    </span>

                </div>
                <IoIosArrowDown className={isExpanded ? "rotate-180" : ""} />
            </div>

            {isExpanded && (
                profileSection?.map((section: any, index: any) =>
                    <div className="w-full divide-y-[0.5px]" key={index}>
                        <div className="w-full hover:bg-[#e9f5ff]  py-3">

                            <div className=' grid grid-cols-2 gap-4'>
                                <div className="flex items-center justify-start gap-2 font-bold text-[#343434]">
                                    <p className="flex items-center justify-center w-10 h-10 rounded-full border border-[#343434] text-md">
                                        {index + 1}
                                    </p>
                                    <div className="flex flex-col">
                                        <p className="text-primary-blue text-sm">{section?.job_position || section?.title || section?.institution || section?.name}</p>
                                        <p className="text-[#A7A7A7] text-sm">{section?.company_name || section?.institute || section?.degree || section?.creator_name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-4" onClick={() => handleDetailIsExpanded(index)}>
                                    <FaPencil size={15} className="text-[#343434] hover:text-[#1877f2] cursor-pointer" />
                                    <FaRegTrashAlt size={17} className="text-[#343434] hover:text-red-600 cursor-pointer" />
                                    <IoMdMove size={19} className="text-[#343434] hover:text-[#1877f2]" />
                                    <MdOutlineKeyboardArrowUp
                                        size={22}
                                        className={`text-[#343434] hover:text-[#1877f2] cursor-pointer ${isDetailsExpanded ? "rotate-180" : ""}`}
                                    />
                                </div>
                            </div>

                            {isDetailsExpanded === index && (
                                <div className=" border grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-4">
                                    {getSectionMenu(section)?.map((item, i) => (
                                        <div key={i} className="flex flex-col gap-2 pb-2">
                                            <p className="text-sm text-[#777]">
                                                {item.label}
                                            </p>
                                            <p className="text-xs text-[#A7A7A7]">
                                                {section[item.key] || ''}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
