"use client";

import React from "react";
import Image from "next/image";
import { useTypedText } from "../useTypedText";
import AppButton from "../common/button/CustomButton";
import BannerZoomSlider from "./bannerZoomSlider";
import { H1, Lead } from "@/components/typography";
import styles from "./mainBanner.module.css";
import BannerBoxSlider from "./bannerBoxSlider";
import bannerIcon from "media/assets/banner-icons.webp";
interface ButtonProps {
  title?: string;
  mainColor?: string;
  sliderColor?: string;
  mainTextColor?: string;
  hoverTextColor?: string;
  authLink?: string;
  guestLink?: string;
}

type BannerProps = {
  user?: { token?: any };
  title?: string | React.ReactNode;
  subtitle?: any;
  description?: string | React.ReactNode;
  link?: string | React.ReactNode;
  font2?: any;
  button1?: ButtonProps;
  button2?: ButtonProps;
  images?: any;
  image?: any;
  BannerBoxImagesData?: any;
  isGradient?: boolean;
  customerLogoText?: string;
  customerLogo?: any;
};

export default function Banner(props: BannerProps) {
  const {
    title,
    subtitle,
    description,
    link,
    font2,
    button1,
    button2,
    images = [],
    image,
    BannerBoxImagesData,
    isGradient,
    customerLogoText,
    customerLogo,
  } = props;
  const typedText = useTypedText(subtitle);

  return (
    <section className={`container md:px-4 mx-auto relative overflow-hidden`}>
      <div
        className={
          isGradient === false
            ? "hidden"
            : "w-[350px] h-[310px] blur-[70px] bg-gradient-to-br from-primaryBlue to-primaryGreen animate-rotate rounded-[30%_70%_70%_30%/30%_30%_70%_70%] border border-red-500 top-28 right-52 absolute"
        }
      ></div>
      <div className="w-full py-5 my-10 bg-white ">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-left space-y-6">
            {!font2 ? (
              <H1 className={"text-primaryBlack"}>
                <span className="block mb-2">{title}</span>
                <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
                  {typedText}
                </span>
              </H1>
            ) : (
              <H1 innerClass="font-poppins scroll-m-20 font-bold text-xl md:text-3xl tracking-tight lg:text-4xl text-primaryBlue">
                <span className="block mb-2">{title}</span>
              </H1>
            )}

            {description && (
              <Lead className="text-gray-700 ">{description}</Lead>
            )}

            {link && (
              <div className="flex flex-wrap items-center justify-start mt-6">
                <h3 className="text-lg flex items-center">{link}</h3>
              </div>
            )}

            <div className="flex gap-4">
              {button1?.title && (
                <div>
                  <AppButton title={button1?.title} />
                </div>
              )}
              {button2?.title && (
                <div>
                  <AppButton title={button2?.title} />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center">
            {image && (
              <Image
                src={image}
                alt="services_img"
                className="zoom-in-out-box2 md:w-[500px] w-[300px] animate-fadeInUp"
              />
            )}
            {images && <BannerZoomSlider images={images} />}
            {BannerBoxImagesData && (
              <div className="bg-[#01B2AC33] backdrop-blur-xl relative rounded-2xl h-[350px] sm:h-[410px] w-full lg:w-auto">
                <BannerBoxSlider BannerBoxImages={BannerBoxImagesData} />
                <Image
                  src={bannerIcon}
                  alt="icon"
                  className={`absolute md:left-[120px] lg:left-[20px] top-[45px] ${styles.animatedimage}`}
                />
              </div>
            )}
          </div>
        </div>
        <div>
          <p className="font-semibold mt-6">{customerLogoText}</p>
          <div className="flex flex-wrap justify-start items-center pt-4 gap-8">
            {customerLogo?.map((logo: any, idx: any) => (
              <Image src={logo.image} alt={logo.image} className={logo.width} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
