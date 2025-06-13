// src/components/user/userdashboard.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import logo from "media/builderIcons/logo.svg";
import {
    MdOutlineSpaceDashboard,
    MdOutlineSettingsSuggest,
    MdOutlinePersonOutline
} from "react-icons/md";
import { IoDocumentsOutline } from "react-icons/io5";
import { BiTransferAlt } from "react-icons/bi";

const sidebarPages = [
    { id: 1, name: "Dashboard", icon: <MdOutlineSpaceDashboard /> },
    { id: 2, name: "Documents", icon: <IoDocumentsOutline /> },
    { id: 3, name: "Services", icon: <MdOutlineSettingsSuggest /> },
    { id: 4, name: "Transactions", icon: <BiTransferAlt /> },
    { id: 5, name: "Profile", icon: <MdOutlinePersonOutline /> },
];

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const UserDashboard = ({ activeTab, setActiveTab }: Props) => {
  return (
    <div className='flex flex-col space-y-4 bg-white border-r border-gray-300 fixed top-0 left-0 lg:w-72 w-48 h-screen px-6 py-8 shadow-lg z-50'>
      <Image src={logo} alt="Logo" width={200} height={200} className='w-[9rem] mb-4' />
      {sidebarPages.map((page) => (
        <div
          key={page.id}
          onClick={() => setActiveTab(page.name)}
          className={`flex items-center rounded-md px-2 py-3 cursor-pointer group font-primary duration-200 ${
            activeTab === page.name
              ? "text-hamzaPrimary bg-hamzaPrimary/10"
              : "text-primarySlate/80 hover:text-black hover:bg-gray-100"
          }`}
        >
          <span className="lg:text-2xl text-sm mx-3">{page.icon}</span>
          <div className="text-md font-medium tracking-wide">{page.name}</div>
        </div>
      ))}
    </div>
  );
};

export default UserDashboard;
