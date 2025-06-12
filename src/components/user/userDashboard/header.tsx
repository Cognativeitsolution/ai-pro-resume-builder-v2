'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { IoNotificationsOutline, IoChevronDownOutline } from "react-icons/io5";
import { FiSearch } from 'react-icons/fi';
import user from 'media/builderIcons/user.svg';

// Sample search data 
const searchData = [
    { id: 1, name: 'Resume Builder' },
    { id: 2, name: 'Cover Letter Generator' },
    { id: 3, name: 'Job Tracker' },
    { id: 4, name: 'AI Review' },
    { id: 5, name: 'Templates' },
];

// Sample notifications
const notifications = [
    { id: 1, title: 'Profile updated', time: '2 hours ago' },
    { id: 2, title: 'New job match found', time: '4 hours ago' },
    { id: 3, title: 'Resume review ready Resume review ready Resume review ready Resume review ready Resume', time: '1 day ago' },
    { id: 4, title: 'Resume review ready', time: '1 day ago' },
    { id: 5, title: 'Resume review ready', time: '1 day ago' },
    { id: 6, title: 'Resume review ready', time: '1 day ago' },
    { id: 7, title: 'Resume review ready', time: '1 day ago' },
];

// Sample user details 
const userDetails = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    image: user,
};

// Header Component 
const UserHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState(searchData);
    const [showResults, setShowResults] = useState(false);

    const notifRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setShowResults(false); // Just hide dropdown
        }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim() === '') {
        setFilteredResults([]);
        setShowResults(false);
    } else {
        const results = searchData.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredResults(results);
        setShowResults(true);
    }
};

    return (
        <div className="flex items-center justify-between bg-white py-4 px-5 border-b border-gray-300 shadow-sm sticky top-0 z-40">
            {/* Left - Dashboard title */}
            <div className="text-2xl font-semibold">{`WELCOME! ${userDetails.name}`}</div>

            {/* Right - Search + Theme Toggle + Notifications + User */}
            <div className="flex items-center gap-4">

                {/* Search Bar */}
                <div className="relative w-64" ref={searchRef}>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-hamzaPrimary bg-gray-100"
                        />
                        <FiSearch className="absolute left-3 top-2.5 text-xl text-primarySlate/80" />
                    </div>

                    {searchQuery && showResults && (
                        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow z-50 max-h-60 overflow-y-auto">
                            {filteredResults.length > 0 ? (
                                filteredResults.map(result => (
                                    <li
                                        key={result.id}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {result.name}
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 py-2 text-gray-500">No results found</li>
                            )}
                        </ul>
                    )}
                </div>

                {/* Notification */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`cursor-pointer w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border ${isOpen ? 'border-hamzaPrimary ' : 'border-gray-200 '}`}
                    >
                        <IoNotificationsOutline className={`${isOpen ? 'text-hamzaPrimary' : 'text-primarySlate/80 hover:text-hamzaPrimary'} text-2xl`} />
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                            <div className="p-3 font-semibold border-b">Notifications</div>
                            <ul className="max-h-60 overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map((notification) => (
                                        <li
                                            key={notification.id}
                                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                                        >
                                            <div className="text-base text-primaryBlack line-clamp-1 font-medium">{notification.title}</div>
                                            <div className="text-sm text-primarySlate/80">{notification.time}</div>
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-4 py-2 text-sm text-gray-500">No notifications</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Profile */}
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
                            className={`text-gray-500 text-xl transform transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`}
                        />
                    </div>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                            <div className="p-4 border-b">
                                <div className="font-medium">{userDetails.name}</div>
                                <div className="text-gray-500">{userDetails.email}</div>
                            </div>
                            <ul className="text-sm">
                                <li>
                                    <button
                                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500"
                                        onClick={() => {
                                            console.log('Signed out');
                                        }}
                                    >
                                        Sign out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserHeader;
