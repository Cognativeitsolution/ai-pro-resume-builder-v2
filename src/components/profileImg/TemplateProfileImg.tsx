import React, { useState } from 'react'
import Image from 'next/image'
// ============
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileImage } from '@/constant/ProfileImage';
// ============
import { IoEyeOffSharp } from 'react-icons/io5';
import { FaCloudUploadAlt } from 'react-icons/fa';
// ============
import usePopup from '@/app/configs/store/Popup';
import { removeProfileImage } from "@/redux/slices/profileImageSlice";
import { sectionShowProfile } from '@/redux/slices/addSectionSlice';

const TemplateProfileImg = () => {
    const dispatch = useDispatch();
    const [editable, setEditable] = useState(true);
    const { imagePopup, toggleImagePopup } = usePopup();
    const imageData = useSelector((state: RootState) => state.profileImage);
    const { showProfile } = useSelector((state: RootState) => state.addSection);

    const popupHandle = () => {
        toggleImagePopup(!imagePopup);
    };

    const handleRemoveProfileImg = () => {
        dispatch(removeProfileImage());
        dispatch(sectionShowProfile(false))
        setEditable(false);
    };

    if (!editable) return null;
    if (!showProfile) return null;
    return (
        <div className="flex flex-col items-center mb-6 relative">
            {/*====== Container that shows avatar and clips overflow ======*/}
            <div className="relative mx-auto min-w-[140px] min-h-[140px] h-[160px] w-[160px] max-w-[200px] max-h-[200px] rounded-full overflow-hidden group">
                <div className="w-full h-full">
                    <Image
                        src={imageData.image || ProfileImage}
                        alt="Profile"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                        style={{ transform: `scale(${imageData.scale}) translate(${imageData.position.x}px, ${imageData.position.y}px) rotate(${imageData.rotation}deg)` }}
                    />

                    <div className="w-full h-full flex items-center justify-center gap-2 bg-zinc-600/80 rounded-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="bg-indigo-400 border rounded-full p-2 cursor-pointer translate-y-40 group-hover:translate-y-0 transition-all duration-500">
                            <FaCloudUploadAlt className="text-[20px] text-white" onClick={popupHandle} />
                        </div>

                        <div className="bg-indigo-400 border rounded-full p-2 cursor-pointer translate-y-40 group-hover:translate-y-0 transition-all duration-500">
                            <IoEyeOffSharp className="text-[20px] text-white" onClick={handleRemoveProfileImg} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateProfileImg;
