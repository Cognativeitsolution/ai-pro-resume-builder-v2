import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Head from "next/head";
import styles from "./bannerZoomSlider.module.css"

type propsType = {
    images?: any;
}

export default function BannerZoomSlider(props: propsType) {
    const { images = [] } = props
    const [cImage, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change the interval time (in milliseconds) as needed

        return () => clearInterval(intervalId); // Cleanup function
    }, [images.length]);

    return (
        <>
            <Head>
                <link rel="preload" as="image" href={images[0]} />
            </Head>
            <div className={`w-full lg:w-[700px] ${styles.bannerZoomSlider}`}>
                {images.map((img: any, idx: any) => (
                    <Image
                        key={idx}
                        src={img}
                        width={550} // Adjust width accordingly
                        height={400} // Adjust height accordingly
                        className={`${idx === cImage ? styles.active : styles.inActive} skew-y-12`}
                        alt={`image ${idx + 1}`}
                        priority={idx === 0} // Prioritize the first image for better performance
                    />
                ))}
            </div>
        </>
    );
}




