import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaAngleDown } from 'react-icons/fa6';
// ===============
import logo from 'media/builderIcons/logo.svg';
import crown from 'media/builderIcons/crown.svg';
import user from 'media/builderIcons/user.svg';

const NewHeader = () => {

    return (
        <div className="flex items-center justify-between bg-[#ffffff] py-4 px-5 border-b border-[#CECECE]">
            <div className="flex items-center gap-12">
                <Link href="/">
                    <Image src={logo} alt="Logo" />
                </Link>
            </div>

            <div className="flex items-center gap-6">
                <div className="cursor-pointer">
                    <Image src={crown} alt="Subscription" />
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                    <Image src={user} alt="User" />
                    <FaAngleDown className="text-[#707275]" />
                </div>
            </div>
        </div>
    );
};

export default NewHeader;
