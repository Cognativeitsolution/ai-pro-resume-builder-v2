"use client";

import React, { useState } from "react";
// ==========
import { AutoPlaySlider } from "@/components";
import ReviewCard from "../common/card/ReviewCard";
import { H2, Medium } from "@/components/typography";

type propsType = {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
};

const Reviews = (props: propsType) => {
  const { title, description } = props;
  const [our_reviews, set_our_reviews] = useState<any[]>([
    {
      id: 1,
      userName: "Hamza",
      postedDate: "11-12-13",
      review: "This is an amazing product! Highly recommended.",
      stars: 4,
    },
    {
      id: 2,
      userName: "Ali",
      postedDate: "12-01-14",
      review: "Great experience, will definitely buy again!",
      stars: 5,
    },
    {
      id: 3,
      userName: "Sara",
      postedDate: "15-03-15",
      review: "Good quality but delivery was slow.",
      stars: 3,
    },
    {
      id: 2,
      userName: "Ali",
      postedDate: "12-01-14",
      review: "Great experience, will definitely buy again!",
      stars: 5,
    },
    {
      id: 3,
      userName: "Sara",
      postedDate: "15-03-15",
      review: "Good quality but delivery was slow.",
      stars: 3,
    },
  ]);

  return (
    <>
      <section className="bg-[#eeeef1] pt-6 mt-5 py-10">
        <div className="container m-auto flex flex-col relative">
          <div className="flex flex-col gap-4 lg:grid justify-center text-center">
            <div className="items-center">
              <div className="px-4  py-2 relative">
                <H2 className="text-primaryBlue py-4">{title}</H2>
                <Medium className=" m-auto text-black font-Lexend">
                  {description}
                </Medium>
              </div>
            </div>
          </div>

          <div className="bg-opacity-25 flex flex-col w-full h-fit items-center px-4 mb-10 mt-4 relative">
            <div className="w-full our__reviews">
              <AutoPlaySlider
                options={{ align: "start" }}
                arrowPosition="absolute left-[6%] xl:left-[5%] bottom-[-20%] md:bottom-[-5%] justify-between w-[88%] xl:w-[90%]"
              >
                {our_reviews?.map((rev, idx) => (
                  <div
                    key={idx}
                    className="grow-0 shrink-0 basis-[100%] md:basis-[50%] xl:basis-1/3 pl-5"
                  >
                    <ReviewCard key={idx} review={rev} />
                  </div>
                ))}
              </AutoPlaySlider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Reviews;
