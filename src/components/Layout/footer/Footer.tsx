"use client"

import React, { useState } from 'react'
import Link from "next/link";
import Image from "next/image";
import Logo from "media/assets/logo_resume_white.webp";
import { sections, socialLinks } from './data';
import payment_logos from "media/assets/pay_logos.webp";

export default function Footer() {
    const [email, setEmail] = useState<any>("");
    const [isPending, setIsPending] = useState<any>(false);

    const handleChange = (e: any) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsPending(true);

        try {
            // Handle form submission logic here (e.g., API call)
            console.log("Email Submitted:", email);
        } catch (error) {
            console.error("Submission failed", error);
        } finally {
            setIsPending(false);
        }
    };

    const getCurrentYear = () => new Date().getFullYear();

    return (
        <footer className="bg-primaryBlue text-white ">
            <div className="p-6">
                <div className="grid md:grid-cols-[30%,70%] gap-6">
                    <div className="flex flex-col items-start justify-between border-gray-400 border-r-[0px] lg:border-r-[2px] pr-0 lg:pr-5">
                        <div>
                            <Link href="/" className="flex flex-wrap justify-center xl:justify-start">
                                <Image src={Logo} alt="My Image" width={200} height={50} className="logo" />
                            </Link>
                            <div className="mt-4">
                                <p className="text-white text-sm md:text-lg font-Lexend">
                                    {/* {UserSettings?.website_email} */}
                                    marketing.cognitiveit@gmail.com
                                </p>
                                <p className="text-white text-sm md:text-lg font-Lexend">
                                    {/* {UserSettings?.contact_number} */}
                                    +1 (438) 883-8289
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="w-full mt-5 md:mt-0">
                            <div className="flex items-center bg-primaryBlue border-2 border-white rounded-3xl text-white w-full max-w-full">
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    id="email_id"
                                    value={email}
                                    onChange={handleChange}
                                    className="flex-1 bg-transparent text-white outline-none text-xs lg:text-base px-1 xl:px-3 placeholder:text-white focus:text-white transition-all duration-300 ease-in"
                                />
                                <button
                                    type="submit"
                                    className={`bg-primaryCran opacity-100 text-white font-semibold min-w-[40px] text-[12px] lg:text-sm px-1 xl:px-5 py-2 rounded-r-3xl transition-all duration-300 ease-in hover:opacity-80 ${isPending ? "cursor-not-allowed opacity-50" : ""
                                        }`}
                                    disabled={isPending}
                                >
                                    {isPending ? "Loading..." : "Subscribe Now"}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 sm:gap-4">
                        {sections.map((section, index) => (
                            <div key={index} className="flex flex-col gap-2 sm:gap-6">
                                <h1 className="font_1 w-full">{section.title}</h1>
                                <ul className="text-white flex flex-col gap-4">
                                    {section.links.map((link, idx) => (
                                        <li key={idx}>
                                            <Link href={link.href} className="hover:text-primaryCran font-Lexend font-light text-base">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:hidden flex flex-wrap items-center gap-4 text-4xl my-2">
                    {socialLinks.map(({ href, icon: Icon }, index) => (
                        <a key={index} target="_blank" rel="noopener noreferrer" href={href} className="hover:text-primaryCran">
                            <Icon className="rounded-full border-2 border-white p-2 mr-1 hover:border-primaryCran" />
                        </a>
                    ))}
                </div>
                <Image src={payment_logos} alt="Payment Methods" width={300} height={40} className="lg:hidden mt-5" />
                <hr className="lg:hidden mb-2 mt-4 border-t-5 border-white" />
                <div className="w-full flex items-center justify-between my-5">
                    <div className="bg-gray-400 h-[2px] w-[35%] hidden lg:block"></div>
                    <div className="hidden lg:flex flex-col gap-4">
                        <div className="flex flex-wrap items-center justify-start gap-6 text-[40px] w-full">
                            {socialLinks.map(({ href, icon: Icon }, index) => (
                                <a key={index} target="_blank" rel="noopener noreferrer" href={href} className="hover:text-primaryCran w-[40px] h-[40px] rounded-full border-white border-2 flex justify-center items-center p-[4px]">
                                    <Icon className="hover:border-primaryCran" />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-400 h-[2px] w-[35%] hidden lg:block"></div>
                </div>
                <div className="flex items-center justify-start gap-[150px] my-2">
                    <Link href="https://www.softtechcube.com/" >
                        <span className="text-center text-md xl:text-center">© {getCurrentYear()}
                            {/* {our_settings.footer_text} */}
                            AI PRO RESUME All Rights Reserved Powered by Soft Tech Cube
                        </span>
                    </Link>
                    <Image src={payment_logos} alt="Payment Methods" width={300} height={40} className="hidden lg:block" />
                </div>
            </div>
        </footer>
    )
}
