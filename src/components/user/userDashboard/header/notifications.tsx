'use client';
import React, { useState, useEffect, useRef } from 'react';
import { IoNotificationsOutline } from "react-icons/io5";


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

const Notifications = () => {
        const [isOpen, setIsOpen] = useState(false);
    
        const notifRef = useRef<HTMLDivElement>(null);

        // Close dropdowns when clicked outside
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                    setIsOpen(false)
                };
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, []);

    return (
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
    )
}

export default Notifications