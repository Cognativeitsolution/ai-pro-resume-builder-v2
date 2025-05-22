'use client'
// ==============
import React, { useState } from 'react'
import Image from 'next/image';
// ==============
import { FaLinkedinIn, FaLock } from 'react-icons/fa6';
import UploadImg from 'media/images/upload-file.webp'


export default function UploadParser() {
    const [fileData, setFileData] = useState<{ name: string; file: File | null }>({
        name: "",
        file: null,
    });

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setFileData({
                name: file.name,
                file: file,
            });
        } else {
            setFileData({
                name: "",
                file: null,
            });
        }
    };

    const [linkedinUrl, setLinkedinUrl] = useState('');

    return (
        <section className="my-5 md:my-10">
            <div className='container'>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/*===== Upload =====*/}
                    <div className="ring-1 ring-white bg-indigo-200/30 backdrop-blur-sm rounded-3xl shadow-md p-0">
                        <div className='pb-5 pt-7 px-8'>
                            <label htmlFor="uploadFile1" className=" border-[1.2px] border-dashed border-[#7d16c4] font-semibold text-base rounded-3xl w-full py-8 flex flex-col items-center justify-center cursor-pointer">
                                <div className='bg-white/85 backdrop-blur-sm p-3 rounded-full mb-3'>
                                    <Image src={UploadImg} alt="upload" width={40} height={40} />
                                </div>
                                <h5 className='text-[14px] xl:text-[16px] font-medium text-zinc-950 text-center px-5 md:px-0'>Drop your resume here or choose a file.</h5>
                                <input
                                    type="file"
                                    id="uploadFile1"
                                    accept=".doc,.docx,.pdf"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <p className="text-[15px] font-medium text-slate-400 ">{fileData.name ? `${fileData.name}` : "PDF and docs only."}</p>
                            </label>
                            <div className="flex items-start md:items-center gap-1 pt-5">
                                <FaLock className='text-[12px] mt-1 md:mt-0' />
                                <span className='text-[12px] xl:text-[15px]'>We never share your data with 3rd parties or use it for AI model training.</span>
                            </div>
                        </div>
                    </div>
                    {/*===== LinkedIn =====*/}
                    <div className="ring-1 ring-white bg-indigo-200/30 backdrop-blur-sm rounded-3xl shadow-md p-0">
                        <div className='pb-5 lg:pb-0 pt-7 px-8'>
                            {/*===== Upload =====*/}
                            <label htmlFor="linkedin" className="border-[1.2px] border-dashed border-[#7d16c4] font-semibold text-base rounded-3xl w-full py-8 flex flex-col items-center justify-centerr">
                                <div className='bg-white/85 backdrop-blur-sm p-3 rounded-full mb-3'>
                                    <FaLinkedinIn className='text-[40px] text-blue-500' />
                                </div>
                                <h5 className='text-[14px] xl:text-[16px] font-medium text-zinc-950 text-center px-5 md:px-0'>
                                    would you like to save time by importing your Linkedin?
                                </h5>
                                <div className="flex flex-col md:flex-row items-center gap-2 w-10/12 mt-4">
                                    <input
                                        type="text"
                                        id="linkedin"
                                        value={linkedinUrl}
                                        onChange={(e) => setLinkedinUrl(e.target.value)}
                                        className="w-full h-[40px] px-2 text-[15px] font-normal placeholder:text-[15px] bg-transparent border border-hamzaPrimary rounded-md focus:outline-none"
                                        placeholder='https://linkedin.com/...'
                                    />
                                    <button
                                        type="button"
                                        disabled={!linkedinUrl.trim()}
                                        className={`text-[18px] font-medium tracking-wide text-white px-4 h-[40px] rounded-md capitalize transition-all duration-300 cursor-pointer border ${linkedinUrl.trim() ? 'bg-hamzaPrimary border-hamzaPrimary' : 'bg-gray-400 border-gray-400 cursor-no-drop'}`}>
                                        Import
                                    </button>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
