import React from "react";
import styles from "./FlipCard.module.css";
import Image from "next/image";

type flipCard = {
  icon: any;
  title: string;
  text: string;
};

const FlipCard = (props: flipCard) => {
  const { icon, title, text } = props;
  return (
    <>
      <div className={`${styles.flipCard} h-64 bg-white w-full`}>
        <div className={`${styles.flipCardInner} h-full`}>
          <div
            className={`${styles.flipCardFront} flex flex-col justify-center items-center p-4 h-full`}
          >
            <div className="flex flex-col justify-center items-center">
              <div className="h-16 flex justify-center items-center mb-4">
                <Image
                  src={icon}
                  alt="Icon"
                  width={60}
                  height={63}
                  className="block"
                />
              </div>
              <h1 className="text-[#0072b1] drop-shadow-lg font-lexend font-bold text-2xl text-center mt-4 h-20">
                {title}
              </h1>
            </div>
          </div>
          <div
            className={`${styles.flipCardBack} p-4 bg-primaryBlue flex justify-center items-center h-full`}
          >
            <p className="text-md font-lexend font-bold text-white text-center">
              {text}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlipCard;
