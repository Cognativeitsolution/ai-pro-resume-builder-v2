'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';

type propsType = {
    img?: any;
    title?: any;
    description?: string;
    className?: any
}

const OnScrollAnimeCard = (props: propsType) => {
    const { img, title, description, className } = props


    return (
        <div className={`p-6 shadow-[0_0_50px_0px_rgba(0,0,0,0.15)] rounded-lg bg-white flex ${className ? className : ''}`}>
            <div className="flex-shrink-0">
                <Image src={img} alt={title} width={60} height={60} className="shadow-[0_0_1px_0px_rgba(0,0,0,0.2)] w-[60px] rounded-lg" />
            </div>
            <div className="ml-4 text-start">
                <h2 className="font-bold text-lg drop-shadow-lg text-primary-black font-Lexend leading-[1.5]">
                    {title}
                </h2>
                <p className="text-slate-800 mt-2 text-sm leading-[1.5] text-left">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default OnScrollAnimeCard;