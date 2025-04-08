"use client";
import React, { ReactNode } from 'react'

type PropsType = {
    nextArrow?: React.ReactNode | any;
    prevArrow?: React.ReactNode | any;
    appendDots?: any;
    children: ReactNode | any;
};


const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} absolute right-[-30px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
            <span className="text-3xl text-gray-500 hover:text-primaryBlue">➜</span>
        </div>
    );
};


const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} absolute left-[-30px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
            <span className="text-3xl text-gray-500 hover:text-primaryBlue">⬅</span>
        </div>
    );
};


export default function Carousel(props: PropsType) {
    const { nextArrow, prevArrow, appendDots, children } = props

    const settings = {
        dots: appendDots === false ? false : true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: nextArrow === false ? undefined : nextArrow || <NextArrow />,
        prevArrow: prevArrow === false ? undefined : prevArrow || <PrevArrow />,
        appendDots: (dots: any) => (
            <div style={{ bottom: "10px" }}>
                <ul>{dots}</ul>
            </div>
        ),
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };


    return (
        <section className="relative container mx-auto py-4 md:8">
            <div className="w-full bg-white">
                <div className="relative px-8">
                    {/* <Slider {...settings}>
                        {children}
                    </Slider> */}
                </div>
            </div>
            <style jsx>{`
          .slick-dots li button::before {
            display: none; 
          }
          .slick-dots li {
            margin: 0 4px;
            transition: all 0.3s ease;
          }
          .slick-dots li.slick-active div {
            background-color: #1d4ed8; 
            transform: scale(1.3);
          }
        `}</style>
        </section>
    );
}

