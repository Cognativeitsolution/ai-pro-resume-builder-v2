import { RootState } from '@/redux/store';
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import placeHolderImg from "media/assets/reusme_placeholder_image.webp";
import { setProfileImage } from "@/redux/slices/profileImageSlice";
import { AiOutlineClose } from 'react-icons/ai';
import { IoResizeOutline } from 'react-icons/io5';
import { FiMinus, FiPlus } from 'react-icons/fi';

const TemplateProfileImg = () => {
    const dispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageSrc = useSelector((state: RootState) => state.profileImage.image);
    const [showProfileIcn, setShowProfileIcn] = useState(true);
    const [isResizing, setIsResizing] = useState(false);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [showResizeControls, setShowResizeControls] = useState(false);

    const handleImageClick = () => {
        if (!isResizing) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    dispatch(setProfileImage(reader.result));
                    setScale(1);
                    setPosition({ x: 0, y: 0 });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveProfileImg = () => {
        dispatch(setProfileImage(''));
        setShowProfileIcn(false);
    }

    const handleResizeProfileImg = () => {
        setIsResizing(!isResizing);
        setShowResizeControls(!showResizeControls);
    }

    const handleZoomIn = () => {
        setScale(prev => Math.min(3, prev + 0.1));
    }

    const handleZoomOut = () => {
        setScale(prev => Math.max(0.5, prev - 0.1));
    }

    const handleResetSize = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!isResizing) return;

        const startPos = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };

        const handleMouseMove = (moveEvent: MouseEvent) => {
            setPosition({
                x: moveEvent.clientX - startPos.x,
                y: moveEvent.clientY - startPos.y
            });
        };

        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    if (!showProfileIcn) return null;

    return (
        <div className="flex flex-col items-center mb-6">
            <div
                className="relative mx-auto  min-w-[140px] min-h-[140px] h-[160px] w-[160px] max-w-[200px] max-h-[200px] rounded-full overflow-hidden cursor-pointer"
                onWheel={(e) => {
                    if (isResizing) {
                        e.preventDefault();
                        setScale(prev => e.deltaY > 0 ?
                            Math.max(0.5, prev - 0.1) :
                            Math.min(3, prev + 0.1));
                    }
                }}
            >
                <div
                    className="relative w-full h-full"
                    style={{
                        transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                        cursor: isResizing ? 'move' : 'pointer'
                    }}
                    onMouseDown={handleMouseDown}
                >
                    <Image
                        src={imageSrc || placeHolderImg}
                        alt="Profile"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover rounded-full"
                        onClick={handleImageClick}
                    />
                </div>

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />

                <div className="absolute top-2 right-8 z-50 bg-gray-200 border rounded-full p-1" onClick={handleRemoveProfileImg}>
                    <AiOutlineClose className='z-[99999]' />
                </div>
                <div
                    className="absolute top-10 right-8 z-50 bg-gray-200 border rounded-full p-1"
                    onClick={handleResizeProfileImg}
                    style={{ backgroundColor: isResizing ? '#4CAF50' : '#E5E7EB' }}
                >
                    <IoResizeOutline className='z-[99999]' />
                </div>
            </div>

            {showResizeControls && (
                <div className="flex items-center gap-3 mt-3 p-2 bg-gray-100 rounded-lg">
                    <button
                        onClick={handleZoomOut}
                        className="p-2 rounded-full hover:bg-gray-200"
                        title="Zoom Out"
                    >
                        <FiMinus />
                    </button>
                    <span className="text-sm w-16 text-center">
                        {Math.round(scale * 100)}%
                    </span>
                    <button
                        onClick={handleZoomIn}
                        className="p-2 rounded-full hover:bg-gray-200"
                        title="Zoom In"
                    >
                        <FiPlus />
                    </button>
                    <button
                        onClick={handleResetSize}
                        className="text-xs px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                        title="Reset Size"
                    >
                        Reset
                    </button>
                </div>
            )}

            {isResizing && (
                <div className="text-xs text-gray-200 mt-1">\ Drag image to reposition | Scroll to zoom </div>
            )}
        </div>
    )
}

export default TemplateProfileImg;