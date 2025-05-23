'use client'
// ===========
import React, { useState } from 'react'
import Image from 'next/image'
import { FaLinkedinIn, FaLock } from 'react-icons/fa6'
// ===========
import UploadImg from 'media/images/upload-file.webp'

export default function UploadParser({ onComplete }: { onComplete: () => void }) {
    const [error, setError] = useState('');
    const [linkedinUrl, setLinkedinUrl] = useState('')
    const [loading, setLoading] = useState(false);
    const [fileData, setFileData] = useState<{ name: string; file: File | null }>({
        name: "",
        file: null,
    });

    // ===== Upload
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setFileData({
                name: file.name,
                file: file,
            });
            setLoading(true);
            try {
                await new Promise((resolve) => setTimeout(resolve, 2000));

                onComplete();
            } catch (err) {
                console.error('File upload failed:', err);
            } finally {
                setLoading(false);
            }
        } else {
            setFileData({
                name: "",
                file: null,
            });
            setLoading(false);
        }
    };

    // ===== Linkedin
    const checkLinkedInExists = async (url: string): Promise<boolean> => {
        try {
            const res = await fetch('/api/check-linkedin-url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            })
            const data = await res.json()
            return data.exists
        } catch {
            return false
        }
    }

    return (
        <section className="my-5 md:my-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/*====== Upload ======*/}
                <div className="ring-1 ring-white bg-indigo-200/30 backdrop-blur-sm rounded-3xl shadow-md p-0">
                    <div className='pb-5 pt-7 px-8'>
                        <label htmlFor="uploadFile1" className="border-[1.2px] border-dashed border-[#7d16c4] font-semibold text-base rounded-3xl w-full py-8 flex flex-col items-center justify-center cursor-pointer">
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
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="animate-spin rounded-full h-2 w-2 border-t-2 border-purple-500"></div>
                                    <p className="text-[15px] font-medium text-slate-400">Uploading Resume</p>
                                </div>
                            ) :
                                (
                                    <p className="text-[15px] font-medium text-slate-400">{fileData.name ? fileData.name : "PDF and docs only."}</p>
                                )
                            }
                        </label>
                        <div className="flex items-start md:items-center gap-1 pt-5">
                            <FaLock className='text-[12px] mt-1 md:mt-0' />
                            <span className='text-[12px] xl:text-[15px]'>We never share your data with 3rd parties or use it for AI model training.</span>
                        </div>
                    </div>
                </div>

                {/*====== LinkedIn ======*/}
                <div className="ring-1 ring-white bg-indigo-200/30 backdrop-blur-sm rounded-3xl shadow-md p-0">
                    <div className={`${error ? 'lg:pb-6' : 'pb-5 lg:pb-0'} pt-7 px-8`}>
                        <label htmlFor="linkedin" className="border-[1.2px] border-dashed border-[#7d16c4] font-semibold text-base rounded-3xl w-full py-8 flex flex-col items-center justify-center">
                            <div className='bg-white/85 backdrop-blur-sm p-3 rounded-full mb-3'>
                                <FaLinkedinIn className='text-[40px] text-blue-500' />
                            </div>
                            <h5 className='text-[14px] xl:text-[16px] font-medium text-zinc-950 text-center px-5 md:px-0'>
                                Would you like to save time by importing your LinkedIn?
                            </h5>

                            <div className="flex flex-col md:flex-row items-center gap-2 w-10/12 mt-4">
                                <input
                                    type="url"
                                    id="linkedin"
                                    value={linkedinUrl}
                                    placeholder='https://www.linkedin.com/in/...'
                                    onChange={(e) => {
                                        const value = e.target.value
                                        setLinkedinUrl(value)
                                        if (!/^https:\/\/.+/.test(value)) {
                                            setError('Enter a valid LinkedIn URL starting with https://')
                                        } else {
                                            setError('')
                                        }
                                    }}
                                    className={`w-full h-[40px] px-2 text-[15px] font-normal placeholder:text-[15px] bg-transparent border ${error ? 'border-red-500' : 'border-hamzaPrimary'} rounded-md focus:outline-none`}
                                />

                                {loading ? (
                                    <div className="flex items-center justify-center gap-2 h-[40px]">
                                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-purple-500" />
                                        <p className="text-[15px] font-medium text-slate-400">Importing...</p>
                                    </div>
                                ) :
                                    (
                                        <button
                                            type="button"
                                            disabled={!!error || loading || !linkedinUrl.trim()}
                                            className={`text-[18px] font-medium tracking-wide text-white px-4 h-[40px] rounded-md capitalize transition-all duration-300 ${linkedinUrl.trim() && !error ? 'bg-hamzaPrimary border-hamzaPrimary' : 'bg-gray-400 border-gray-400 cursor-no-drop'}`}
                                            onClick={async () => {
                                                const trimmedUrl = linkedinUrl.trim();

                                                if (!/^https:\/\/.+/.test(trimmedUrl)) {
                                                    setError('Enter a valid LinkedIn URL starting with https://');
                                                    return;
                                                }

                                                setLoading(true);
                                                setError('');

                                                const exists = await checkLinkedInExists(trimmedUrl);

                                                if (!exists) {
                                                    setError('This LinkedIn profile does not exist or is inaccessible.');
                                                    setLoading(false);
                                                    return;
                                                }
                                                setLoading(false);
                                                onComplete();
                                            }}
                                        >
                                            Import
                                        </button>
                                    )
                                }
                            </div>

                            {/*====== Error Message ======*/}
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        </label>
                    </div>
                </div>
            </div>
        </section>
    )
}
function setLoading(arg0: boolean) {
    throw new Error('Function not implemented.')
}

