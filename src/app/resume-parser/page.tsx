"use client";

import YourScore from "@/components/formatting/AtsCheck/YourScore";
import Image from "next/image";
import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import evaluation from "../../../public/assets/evaluation.svg";
import sugges from "../../../public/assets/sugges.svg";
import sugges_2 from "../../../public/assets/sugges_2.svg";

const AtsScore = () => {
  const score = 80;

  const data = {
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: ["#59b036", "#e5e7eb"],
        borderWidth: 0,
        cutout: "70%",
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      tooltip: { enabled: true },
    },
  };

  const suggestions = [
    {
      heading: "Add Keywords",
      icon: sugges,
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
    {
      heading: "Consistent Formatting",
      icon: sugges,
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
    {
      heading: "Measurable Achievements",
      icon: sugges,
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
    {
      heading: "Professional Fonts",
      icon: sugges,
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
    {
      heading: "Content",
      icon: sugges_2,
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
  ];
  return (
    <>
      <section className="py-5 md:py-10 mt-5">
        <div className="container">
          <div className="flex flex-col xl:flex-row gap-6">
            <YourScore />

            {/* Content */}
            <div className="w-full xl:w-3/4">
              <div className="bg-indigo-200/40 backdrop-blur-none border-2 border-white p-4 rounded-2xl w-full">
                {/* heading */}
                <div className="flex items-center gap-2">
                  <Image src={evaluation} alt="evaluation" />
                  <h2 className="text-[20px] font-semibold text-gray-800">
                    ATS SCORE
                  </h2>
                </div>
                <div className="bg-white p-5 rounded-2xl mt-[10px]">
                  <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-5">
                    {/* Left Section */}
                    <div className="flex-1 space-y-4 w-full md:w-1/2">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-snug">
                        We’ll Help You Enhance Your Resume{" "}
                        <br className="hidden lg:block" /> And Impress Hiring
                        Managers
                      </h3>

                      <p className="text-gray-500 text-[15px]">
                        An Applicant Tracking System (ATS) is a tool used by
                        employers and recruiters to efficiently review and
                        filter a large volume of job applications.
                        <br />
                        Having a high parse rate on your resume means the ATS
                        can accurately read and understand your information—such
                        as experience and skills—greatly improving the chances
                        of your resume reaching the recruiter’s desk.
                      </p>
                    </div>

                    {/* Right Section */}
                    <div className="w-full md:w-1/2 flex flex-col items-center justify-center space-y-3">
                      <h4 className="text-sm text-gray-600 font-medium">
                        Overall Professionalism Score:
                      </h4>
                      <div className="relative w-full h-[200px] flex items-end justify-center">
                        <Doughnut data={data} options={options} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center mt-2">
                          <div className="text-[#59b036] text-xl mt-5 font-semibold">
                            Score
                          </div>
                          <div className="text-[#59b036] text-xl font-bold">
                            {score}/100
                          </div>
                        </div>
                      </div>

                      {/* Black Line and Dot */}
                      <div className="relative w-full max-w-[220px]">
                        <div className="border-t border-black"></div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 -top-[5px] w-3 h-3 bg-black rounded-full"></div>
                      </div>

                      {/* Issues Found */}
                      <div className="text-red-400 font-semibold text-[14px] mt-2">
                        08 Issues Found
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 bg-gray-100 p-4 rounded-2xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Suggestions to Improve Your Resume:
                  </h3>

                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-4  ${
                        index === suggestions.length - 1 ? "" : "my-4"
                      } p-4 border rounded-lg bg-white shadow-sm`}
                    >
                      <Image
                        src={suggestion.icon}
                        alt="suggestion-icon"
                        className="w-6 h-6"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {suggestion.heading}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {suggestion.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AtsScore;
