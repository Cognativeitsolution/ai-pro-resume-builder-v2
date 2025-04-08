"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./bannerBoxSlider.module.css";


type propsType = {
    BannerBoxImages?: any;
};

export default function BannerBoxSlider(props: propsType) {
    const { BannerBoxImages } = props

    const [cImage, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % BannerBoxImages.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div
            className={`w-full lg:w-[500px] h-[400px] lg:h-[600px] relative top-[20px] ${styles.BannerBox}`}
        >
            {BannerBoxImages.map((img: any, idx: any) => (
                <Image
                    key={idx}
                    src={img}
                    className={`${idx === cImage ? styles.active : styles.inActive
                        } w-full h-[350px]`}
                    alt={`image${idx + 1}`}
                />
            ))}
        </div>
    );
}
