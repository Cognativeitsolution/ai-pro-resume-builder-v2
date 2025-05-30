'use client';
// ============
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
// ============
import { FaPlus } from 'react-icons/fa6';
import { FiMinus, FiPlus, } from 'react-icons/fi';
import { MdRotateLeft, MdRotateRight } from 'react-icons/md';
// ============
import { useDispatch } from 'react-redux';
import usePopup from '@/app/configs/store/Popup';
import { setProfileImage } from '@/redux/slices/profileImageSlice';
import { ProfileImage } from '@/constant/ProfileImage';
// ============
import { CustomButton } from '@/components';

const ImagePopup = () => {
    const dispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { imagePopup, toggleImagePopup } = usePopup();
    const [tempImage, setTempImage] = useState<string>('');
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isResizing, setIsResizing] = useState(true);
    const [rotation, setRotation] = useState(0);

    // ============
    const popupHandle = () => {
        toggleImagePopup(false);
        setTempImage('');
    };
    // ============
    const handleImageClick = () => {
        fileInputRef.current?.click();
    };
    // ============
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setTempImage(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    // ============
    const handleSave = () => {
        if (tempImage) {
            dispatch(setProfileImage({
                image: tempImage,
                scale,
                position,
                rotation,
            }));
            toggleImagePopup(false);
            setTempImage('');
        }
    };
    // ============
    const handleZoomIn = () => setScale(prev => Math.min(3, prev + 0.1));
    const handleZoomOut = () => setScale(prev => Math.max(0.5, prev - 0.1));
    const handleResetSize = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };
    // ============
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!isResizing) return;
        e.preventDefault();

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

    if (!imagePopup) return null;

    useEffect(() => {
        return () => {
            window.removeEventListener('mousemove', () => { });
            window.removeEventListener('mouseup', () => { });
        };
    }, []);

    return (
        <div className="popup fixed inset-0 z-50">
            <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-dvh bg-zinc-600/80">
                <div className="container">
                    <div className="w-1/4 mx-auto bg-white border border-indigo-200 rounded-md p-10 relative">
                        <FaPlus
                            onClick={popupHandle}
                            className="absolute right-2 top-2 rotate-45 hover:-rotate-45 transition-all duration-300 text-[24px] cursor-pointer text-primaryBlue"
                        />
                        <h3 className="text-[30px] font-medium text-center mb-5">Upload photo:</h3>
                        <div className="relative mx-auto min-w-[140px] min-h-[140px] h-[140px] w-[140px] max-w-[200px] max-h-[200px] rounded-full overflow-hidden"
                            onWheel={(e) => {
                                if (isResizing) {
                                    e.preventDefault();
                                    setScale((prev) =>
                                        e.deltaY > 0 ? Math.max(0.5, prev - 0.1) : Math.min(3, prev + 0.1)
                                    );
                                }
                            }}
                        >
                            <div
                                className="w-full h-full cursor-pointer"
                                style={{ transform: `scale(${scale}) translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`, cursor: isResizing ? 'move' : 'pointer' }}
                                onMouseDown={handleMouseDown}
                            >
                                <Image
                                    src={tempImage || ProfileImage}
                                    alt="Profile Preview"
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                        {/* ============== */}
                        <div className="flex items-center gap-3 mt-3 p-2 bg-gray-100 rounded-lg relative">
                            <button onClick={handleZoomOut} className="p-2 rounded-full hover:bg-gray-200" title="Zoom Out">
                                <FiMinus />
                            </button>
                            <span className="text-sm w-16 text-center">{Math.round(scale * 100)}%</span>
                            <button onClick={handleZoomIn} className="p-2 rounded-full hover:bg-gray-200" title="Zoom In">
                                <FiPlus />
                            </button>
                            <button onClick={handleResetSize} className="text-xs px-3 py-1 bg-gray-300 rounded hover:bg-gray-400" title="Reset Size">
                                Reset
                            </button>
                        </div>
                        <div className="text-xs text-center text-gray-300 mt-1">Drag image to reposition | Scroll to zoom</div>
                        {/* ============== */}
                        <div className="flex items-center justify-center gap-3 mt-3">
                            <MdRotateLeft className="text-[35px] p-1 bg-gray-300 rounded hover:bg-gray-400" onClick={() => setRotation(prev => prev - 90)} />
                            <MdRotateRight className="text-[35px] p-1 bg-gray-300 rounded hover:bg-gray-400" onClick={() => setRotation(prev => prev + 90)} />
                        </div>
                        {/* ============== */}
                        <div className="grid grid-cols-2 items-center gap-5 mt-8">
                            <CustomButton
                                className="bg-primary3 py-2 rounded-[4px]"
                                title="Upload"
                                altColor="text-white"
                                onClick={handleImageClick}
                            />
                            <CustomButton
                                className="bg-primary3 py-2 rounded-[4px]"
                                title="Save"
                                altColor="text-white"
                                onClick={handleSave}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImagePopup;
