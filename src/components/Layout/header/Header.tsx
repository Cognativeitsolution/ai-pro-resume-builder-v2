"use client"

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from "media/assets/logo_resume.webp";
import styles from "./header.module.css"
import { menuItems, menuIconItems } from './data';
import { BiCaretDown, BiMenu } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { logoutUser } from '@/redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { FaShoppingCart } from 'react-icons/fa';
import coin from "media/assets/dollar.webp";

export default function Header() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { token } = useSelector((state: RootState) => state.auth);
    const [menuOpen, setMenuOpen] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [submenuOpen2, setSubmenuOpen2] = useState(false);
    const [submenu, setSubmenu] = useState<{ [key: number]: boolean }>({});
    const [submenu2, setSubmenu2] = useState<{ [key: number]: boolean }>({});
    const [isMobile, setIsMobile] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const filteredMenuItems = menuIconItems.filter((item) => {
        if (token) {
            return !item.LoginPath;
        } else {
            return !item.RegPath;
        }
    });

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const toggleSubmenu = (index: number) => {
        setSubmenuOpen(!submenuOpen)
        setSubmenu((prev) => {
            const newState: { [key: number]: boolean } = {};
            Object.keys(prev).forEach((key) => {
                newState[Number(key)] = false;
            });
            return { ...newState, [index]: !prev[index] };
        });
    };
    const toggleSubmenu2 = (index: number) => {
        setSubmenuOpen2(!submenuOpen2)
        setSubmenu2((prev) => {
            const newState: { [key: number]: boolean } = {};
            Object.keys(prev).forEach((key) => {
                newState[Number(key)] = false;
            });
            return { ...newState, [index]: !prev[index] };
        });
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setSubmenu({});
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    //logout user:
    const handleLogout = () => {
        dispatch(logoutUser());
        router.push("/login")
    }

    return (
        <nav className={`bg-white py-2 lg:py-4 shadow-md z-10 relative`}>
            <div className="container lg:px-4 mx-auto flex items-center justify-between ">

                {/* Logo */}
                <Link href="/" className="flex ">
                    <Image src={Logo} alt="Logo" width={150} height={40} className="logo py-2" />
                </Link>

                <div className='lg:hidden flex items-center '>
                    {menuIconItems.map((item, index) => (
                        <div key={index} className="relative group ">
                            {/* Regular Menu Item */}
                            {!item.submenu ? (
                                <Link href={item.path} className={`flex items-center py-2  
                                        text-gray-600 rounded hover:bg-primaryBlue hover:text-primaryBlue
                                         transition-colors duration-300  ${item.className || ""}`}>
                                    {item.leftIcon}  <span className={styles.navFont}>{item.name}</span>
                                </Link>
                            ) : (
                                /* Dropdown Menu */
                                <div ref={modalRef} className=''>
                                    <button
                                        onClick={() => toggleSubmenu(index)}
                                        className={`py-2 text-gray-600 rounded  hover:text-primaryBlue transition-colors duration-300 flex items-center gap-2`}
                                    >
                                        {item.leftIcon}  <span className={styles.navFont}>{item.name} </span>
                                    </button>

                                    <div className={`absolute left-0 mt-1 w-48 bg-white border transition-all duration-300 overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl 
                                        ${submenu[index] ? "block" : "hidden"} lg:group-hover:block`}>
                                        {submenuOpen && item.submenu.map((sub, subIndex) => (
                                            <Link key={subIndex} href={sub.path} className="block px-4 py-4 hover:border-l-4 transition border-primaryGreen text-gray-700 hover:bg-primaryBlue hover:text-white">
                                                <span className={styles.navFontSubmenu}>{sub.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <Link href="/cart" className={`flex lg:hidden items-center py-2  
                                text-gray-600 rounded hover:bg-primaryBlue hover:text-primaryBlue
                                 transition-colors duration-300 border border-transparent hover:bg-transparent px-0`}>
                        <div className={`relative cursor-pointer`}>
                            <div
                                style={{ minHeight: "20px", minWidth: "20px" }}
                                className="select-none absolute max-h-8 max-w-8 text-primaryBlue font-bold flex justify-center items-center text-sm -right-2 -top-2 bg-white rounded-full shadow-lg border"
                            >
                                2
                            </div>

                            <FaShoppingCart className="text-[#0072b1] text-md ml-4" size={25} />
                        </div>
                    </Link>
                    <Link href="/register" className={`flex lg:hidden items-center py-2  
                                text-gray-600 rounded hover:bg-primaryBlue hover:text-primaryBlue
                                 transition-colors duration-300 border border-transparent hover:bg-transparent`}>
                        <div className="relative cursor-pointer">
                            <div
                                style={{ minHeight: "20px", minWidth: "20px" }}
                                className="select-none absolute max-h-8 max-w-8 text-primaryBlue font-bold   flex justify-center items-center text-sm -right-1 -top-1 bg-white rounded-full shadow-lg border"
                            >
                                0
                            </div>

                            {/* <Link to={"/packages#coins_purchase"}> */}
                            <Image
                                src={coin}
                                className="text-md ml-4 coin-icon"
                                width="30"
                                height="30"
                                id="coinIcon"
                                alt="coin"
                            />
                            {/* </Link> */}
                        </div>
                    </Link>
                    {/* Mobile Menu Toggle */}
                    <button onClick={toggleMenu} className="lg:hidden p-2 text-gray-700">
                        {menuOpen ? (
                            <AiOutlineClose size={40} className="text-red-600" />
                        ) : (
                            <BiMenu size={40} className="text-gray-700" />
                        )}
                    </button>
                </div>

                <div className={`absolute lg:static  top-16 left-0 w-full lg:w-auto bg-white lg:bg-transparent
                 shadow-md lg:shadow-none p-5 lg:p-0 transition-all duration-300 
                 ${menuOpen || !isMobile ? "block " : "hidden"} lg:flex lg:items-center lg:space-x-4 scrollHeader `}>
                    <div className={`flex lg:items-center  flex-col lg:flex-row divide-y-2 lg:divide-y-0 ${isMobile && "max-h-[600px] overflow-y-auto overflow-x-hidden"} px-5 `}>
                        {menuItems.map((item, index) => (
                            <div key={index} className={`relative group `}>

                                {/* Regular Menu Item */}
                                {!item.submenu ? (
                                    <Link href={item.path} className={`flex items-center  gap-2 px-4 py-4 xl:px-4 lg:mx-2  text-gray-600 rounded lg:hover:bg-primaryBlue lg:hover:text-white transition-colors duration-300 ${item.className || ""}`}>
                                        <span className={styles.navFont}>{item.name}</span>
                                    </Link>
                                ) : (
                                    /* Dropdown Menu */

                                    <div ref={modalRef} className={item.className || ""}>
                                        <button
                                            onClick={() => toggleSubmenu(index)}
                                            className={`px-3 py-4 xl:px-4 lg:mx-2 w-full text-gray-600 rounded lg:hover:bg-primaryBlue  lg:hover:text-white transition-colors duration-300 flex items-center justify-between lg:justify-evenly `}
                                        >
                                            <span className={styles.navFont}>{item.name} </span>
                                            <BiCaretDown
                                                className={` ${submenuOpen && submenu[index] ? "transform rotate-180" : ""
                                                    }`}
                                                size={20}
                                            />
                                        </button>

                                        <div className={`lg:absolute divide-y-2 lg:divide-y-0 lg:left-0 lg:mt-1 text-center lg:text-start min-w-[250px] mx-auto lg:w-48  lg:bg-white lg:border transition-all duration-300 overflow-hidden lg:shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl 
                                        ${submenuOpen === true && submenu[index] ? "block" : "hidden"} lg:group-hover:block `}
                                            onClick={() => setSubmenuOpen(true)}
                                            // onMouseEnter={() => toggleSubmenu(index)}
                                            onMouseLeave={() => setSubmenuOpen(false)}
                                        >
                                            {item.submenu.map((sub, subIndex) => (
                                                <Link key={subIndex} href={sub.path} className="block px-4 py-4 lg:hover:border-l-4 transition lg:border-primaryGreen text-gray-700 lg:hover:bg-primaryBlue lg:hover:text-white">
                                                    <span className={styles.navFontSubmenu}>{sub.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {filteredMenuItems.map((item, index) => (
                            <div key={index} className="relative group hidden lg:block">
                                {/* Regular Menu Item */}
                                {!item.submenu ? (
                                    <Link href={item.path} className={` flex items-center py-2  
                                text-gray-600 rounded hover:bg-primaryBlue hover:text-primaryBlue
                                 transition-colors duration-300 ${item.className || ""}`}>
                                        {item.leftIcon}  <span className={styles.navFont}>{item.name}</span>
                                    </Link>
                                ) : (
                                    /* Dropdown Menu */
                                    <div ref={modalRef} className='' onClick={() => toggleSubmenu2(index)}>
                                        <button

                                            className={`py-2 text-gray-600 rounded hover:text-primaryBlue transition-colors duration-300 flex items-center gap-2`}
                                        >
                                            {item.leftIcon}  <span className={styles.navFont}>{item.name} </span>
                                            <BiCaretDown
                                                className={`mt-1 ${submenuOpen2 && submenu2[index] ? "transform rotate-180" : ""
                                                    }`}
                                                size={24}
                                            />
                                        </button>

                                        <div className={`absolute left-0 mt-1 w-48 bg-white border transition-all duration-300 overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl 
                                        ${submenuOpen2 === true && submenu2[index] ? "block" : "hidden"} lg:group-hover:block divide-y-2 `}
                                            onMouseEnter={() => setSubmenuOpen2(true)}
                                            onMouseLeave={() => setSubmenuOpen2(false)}>
                                            {item.submenu.map((sub, subIndex) => (
                                                <Link key={subIndex} href={sub.path} className="flex flex-col px-1 py-2 transition  text-gray-700 ">
                                                    <span className={`${styles.navFontSubmenu} hover:bg-primaryBlue hover:text-white rounded-lg p-2`}>{sub.name}</span>
                                                </Link>
                                            ))}
                                            <button onClick={handleLogout} className="flex text-start flex-col px-1 py-2 w-full transition  text-gray-700 ">
                                                <span className={`${styles.navFontSubmenu} hover:bg-primaryBlue hover:text-white rounded-lg p-2`}>Sign Out</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <Link href="/cart" className={`hidden lg:flex items-center py-2
                                text-gray-600 rounded hover:bg-primaryBlue hover:text-primaryBlue
                                 transition-colors duration-300 border border-transparent hover:bg-transparent px-0`}>
                            <div className={`relative cursor-pointer`}>
                                <div
                                    style={{ minHeight: "20px", minWidth: "20px" }}
                                    className="select-none absolute max-h-8 max-w-8 text-primaryBlue font-bold flex justify-center items-center text-sm -right-2 -top-2 bg-white rounded-full shadow-lg border"
                                >
                                    2
                                </div>

                                <FaShoppingCart className="text-[#0072b1] text-md ml-4" size={25} />
                            </div>
                        </Link>
                        <Link href="/register" className={`hidden lg:flex items-center py-2  
                                text-gray-600 rounded hover:bg-primaryBlue hover:text-primaryBlue
                                 transition-colors duration-300 border border-transparent hover:bg-transparent`}>
                            <div className="relative cursor-pointer">
                                <div
                                    style={{ minHeight: "20px", minWidth: "20px" }}
                                    className="select-none absolute max-h-8 max-w-8 text-primaryBlue font-bold   flex justify-center items-center text-sm -right-1 -top-1 bg-white rounded-full shadow-lg border"
                                >
                                    0
                                </div>

                                {/* <Link to={"/packages#coins_purchase"}> */}
                                <Image
                                    src={coin}
                                    className="text-md ml-4 coin-icon"
                                    width="30"
                                    height="30"
                                    id="coinIcon"
                                    alt="coin"
                                />
                                {/* </Link> */}
                            </div>
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    );
}
