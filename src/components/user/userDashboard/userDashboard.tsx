"use client"
import React from 'react'
import Documents from '../documents/documents'
import Dashboard from '../dashboard/dashboard'
import Services from '../services/services'
import Transactions from '../transactions/transactions'
import Profile from '../profile/profile'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdOutlineSpaceDashboard, MdOutlineSettingsSuggest, MdOutlinePersonOutline } from "react-icons/md";
import { IoDocumentsOutline } from "react-icons/io5";
import { BiTransferAlt } from "react-icons/bi";

const sidebarPages = [
    {
        id: 1,
        name: "Dashboard",
        path: <Dashboard />,
        icon: <MdOutlineSpaceDashboard />
    },
    {
        id: 2,
        name: "Documents",
        path: <Documents />,
        icon: <IoDocumentsOutline />
    },
    {
        id: 3,
        name: "Services",
        path: <Services />,
        icon: <MdOutlineSettingsSuggest />
    },
    {
        id: 4,
        name: "Transactions",
        path: <Transactions />,
        icon: <BiTransferAlt />
    },
    {
        id: 5,
        name: "Profile",
        path: <Profile />,
        icon: <MdOutlinePersonOutline />
    },
]

type ButtonProps = {
    name: string,
    path: any,
    icon: any
}

const SidebarLayout = ({ path, name, icon }: ButtonProps) => {
    const pathname = usePathname();
    const isActive = pathname.startsWith(path);

    return (
        <Link
            href={path}
            passHref
        >
            <div className={`flex items-center hover:bg-gray-100 rounded-md px-2 py-3 hover:duration-300 group relative hover:text-black font-primary ${isActive ? "text-hamzaPrimary" : "text-slate-600/80"
                }`}>
                <span
                    className={
                        isActive
                            ? "absolute bg-[#42A9D2] w-3 h-8 rounded-r-lg left-0 z-[1600]"
                            : ""
                    }
                ></span>
                <span className="lg:text-2xl text-sm mx-3">{icon}</span>
                <div className="text-md font-medium tracking-wide">{name}</div>
            </div>
        </Link>
    );
};
const Sidebar = () => {
    return (

        <div className='flex flex-col space-y-6 bg-white border-r border-gray-300 fixed top-0 left-0 lg:w-60 w-48 h-screen px-6 py-8 shadow-2xl'>
            <h2 className='text-2xl font-semibold font-primary'>User Dashboard</h2>
            {sidebarPages.map((page) => (
                <SidebarLayout key={page.id} name={page.name} path={page.path} icon={page.icon} />
            ))}
        </div>
    )
}

export default Sidebar