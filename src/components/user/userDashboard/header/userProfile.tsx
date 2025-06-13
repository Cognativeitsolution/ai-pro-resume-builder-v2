'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { IoChevronDownOutline } from "react-icons/io5";

const UserProfile = ({userDetails} : { userDetails: { name: string; email: string; image: any; }}) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const profileRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div className="relative" ref={profileRef}>
            <div
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 cursor-pointer"
            >
                <Image
                    src={userDetails.image}
                    alt="User"
                    width={50}
                    height={50}
                    className="rounded-full w-10 h-10"
                />
                <div>{userDetails.name.split(' ')[0]}</div>
                <IoChevronDownOutline
                    className={`text-primarySlate/80 text-xl transform transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`}
                />
            </div>

            {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <div className="p-4 border-b">
                        <div className="font-medium">{userDetails.name}</div>
                        <div className="text-primarySlate/80">{userDetails.email}</div>
                    </div>
                    <ul>
                        <li>
                            <button
                                className="w-full text-left px-4 py-3 hover:bg-gray-100 text-base text-primarySlate/80 hover:text-black duration-200 transition-all"
                            >
                                Log out
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default UserProfile