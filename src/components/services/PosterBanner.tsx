"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RiDeleteBinLine } from "react-icons/ri";
import pckg_img_bg from "media/assets/pckg_img_bg.webp";
import btn_arrow from "media/assets/btn_arrow.webp";

interface PosterBannerProps {
  id: number;
  posterImage: string;
  cardHeading: string;
  cardDescription: string;
  otherDescription: string;
  price: number;
  arrowImage: any;
  otherHeading: any;
  discount: any;
  buttonText: any;
  buttonLink: any;
  discounted_price: number;
  dir?: "ltr" | "rtl";
  user?: { token?: string };
  cart: { services: { id: number }[] };
  addToCart: (type: string, item: any) => void;
  removeFromCart: (type: string, id: number) => void;
  userIntrestedInService: () => void;
}

const PosterBanner: React.FC<PosterBannerProps> = ({
  id,
  posterImage,
  cardHeading,
  cardDescription,
  otherDescription,
  price,
  discounted_price,
  dir = "ltr",
  user,
  cart,
  addToCart,
  removeFromCart,
  userIntrestedInService,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();

  const toggleServiceDetails = () => setShowDetails(!showDetails);

  return (
    <div className="w-full lg:flex">
      <div className="lg:w-full">
        <div
          className={`sm:py-2 w-full lg:w-full lg:flex items-center justify-center relative px-4 lg:px-0 rounded-3xl lg:rounded-l-3xl ${
            dir === "rtl" ? "flex-row-reverse" : ""
          }`}
        >
          {/* Image Section */}
          <div className="z-10 flex flex-col h-auto sm:h-[400px] relative">
            <Image
              src={pckg_img_bg}
              alt="Background"
              width={550}
              height={400}
              className="w-full sm:w-[550px] relative"
            />
            <Image
              src={posterImage}
              alt="Poster"
              width={350}
              height={400}
              className="z-50 m-auto lg:m-0 w-[280px] sm:w-[350px] absolute animate-fadeInUp left-[15%]"
            />
          </div>

          {/* Content Section */}
          <div className="h-auto sm:h-[400px] px-4 sm:py-3 lg:w-[650px] xl:w-[750px] rounded-lg font-Lexend">
            <h1 className="text-[#0072B1] font_1 text-lg sm:text-2xl">
              {cardHeading}
            </h1>

            <div className="sm:mt-0 mt-6">
              <div
                className="__services__feature m-1 text-justify"
                dir="ltr"
                dangerouslySetInnerHTML={{ __html: cardDescription }}
              ></div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2 py-4 sm:py-2 px-4 relative top-1">
              <div className="flex items-center justify-start gap-4">
                {/* Add/Remove Button */}
                <div className="flex gap-4">
                  {cart.services.find((item) => item.id === id) ? (
                    <button
                      className="bg-gray-300 text-gray-500 p-2 w-[200px] text-center rounded-3xl font_3 text-xs md:text-base flex justify-center items-center mt-3"
                      onClick={() => removeFromCart("service", id)}
                    >
                      Remove From Cart <RiDeleteBinLine className="text-lg" />
                    </button>
                  ) : (
                    <button
                      className="btn-div bg-[#0072b1] text-white flex justify-center items-center p-2 w-[140px] sm:w-[150px] text-center rounded-3xl font_3 text-xs md:text-sm gap-4 cursor-pointer"
                      onClick={() => {
                        if (user?.token) {
                          if (cart.services.length < 1) {
                            userIntrestedInService();
                          }
                          addToCart("service", {
                            id,
                            name: cardHeading,
                            image: posterImage,
                            price,
                            discounted_price,
                            description: otherDescription,
                            file: {},
                          });
                        } else {
                          router.push("/login");
                        }
                      }}
                    >
                      <span>Add to Cart</span>
                      <Image
                        src={btn_arrow}
                        alt="Arrow"
                        width={20}
                        height={20}
                      />
                    </button>
                  )}

                  {/* Checkout Button */}
                  {cart.services.find((item) => item.id === id) && (
                    <Link
                      href="/cart"
                      className="bg-primary-green text-white flex justify-center items-center p-2 w-[150px] text-center rounded-3xl font_3 text-xs md:text-sm gap-4 mt-3 cursor-pointer"
                    >
                      Checkout
                    </Link>
                  )}
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-start gap-3">
                  <span
                    className={`${
                      discounted_price > 0 ? "line-through" : ""
                    } text-black font-semibold text-xs sm:text-lg`}
                  >
                    USD {price}
                  </span>
                  <span className="text-[#01B2AC] font-bold text-xs sm:text-lg">
                    {discounted_price > 0 ? `USD ${discounted_price}` : ""}
                  </span>
                </div>
              </div>

              {/* Show Details */}
              {showDetails && (
                <div
                  dangerouslySetInnerHTML={{ __html: otherDescription }}
                ></div>
              )}
              <button
                onClick={toggleServiceDetails}
                className="text-[#0072b1] flex items-start justify-start"
              >
                {showDetails ? "Hide Detail" : "View Detail"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterBanner;
