"use client";

import React, { useState } from "react";
import { BiSolidLock } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { MdDone } from "react-icons/md";
import {
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiErrorWarningLine,
} from "react-icons/ri";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const YourScore = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const data = {
    labels: ["Formatting", "Clarity", "Grammar", "Relevance", "Conciseness"],
    datasets: [
      {
        label: "Score",
        data: [25, 16, 18, 8, 9],
        backgroundColor: [
          "#1d8864",
          "#fecc6a",
          "#ff5f76",
          "#9d8add",
          "#1097fb",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "60%", // To create donut effect
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const sectionsData = [
    {
      id: "Formatting",
      title: "Formatting",
      score: "25/30",
      scoreColor: "text-green-600 bg-green-200/20",
      bulletPoints: [
        {
          icon: <RiErrorWarningLine size={17} color="#e2a962" />,
          text: "ATS Parse Rate",
        },
        {
          icon: <IoMdClose size={17} color="red" />,
          text: "File Format & Size",
        },
        { icon: <MdDone size={17} color="#2dc08d" />, text: "Resume Length" },
        {
          icon: <BiSolidLock size={17} color="black" />,
          text: "Long Bullet Points",
        },
      ],
    },
    {
      id: "Clarity",
      title: "Clarity",
      score: "16/20",
      scoreColor: "text-yellow-600 bg-[#fecc6a]/20",
      bulletPoints: [
        { icon: <MdDone size={17} color="#2dc08d" />, text: "Conciseness" },
        { icon: <MdDone size={17} color="#2dc08d" />, text: "Impactful" },
      ],
    },
    {
      id: "Grammar",
      title: "Grammar and Spelling",
      score: "18/20",
      scoreColor: "text-[#ff5f76] bg-[#ff5f76]/20",
      bulletPoints: [
        {
          icon: <RiErrorWarningLine size={17} color="#e2a962" />,
          text: "Capitalization",
        },
      ],
    },
    {
      id: "Relevance",
      title: "Relevance of Content",
      score: "18/20",
      scoreColor: "text-[#9d8add] bg-[#9d8add]/20",
      bulletPoints: [
        {
          icon: <MdDone size={17} color="#2dc08d" />,
          text: "Other Activities",
        },
      ],
    },
    {
      id: "Conciseness",
      title: "Conciseness & Impact",
      score: "08/10",
      scoreColor: "text-[#1097fb] bg-[#1097fb]/20",
      bulletPoints: [
        {
          icon: <RiErrorWarningLine size={17} color="#e2a962" />,
          text: "Project Descriptions",
        },
        { icon: <MdDone size={17} color="green" />, text: "Achievements" },
      ],
    },
  ];

  return (
    <>
      <div className="w-full h-full xl:w-1/4 border-2 border-white bg-indigo-200/40 rounded-xl p-4 mt-[110px] xl:mt-0 static xl:sticky overflow-y-auto top-11 z-0">
        <h2 className="text-center text-lg font-semibold mb-4">Your Score</h2>
        {/* Pie Chart */}
        <div className="flex justify-center mb-6">
          <div className="w-40 h-40">
            <Pie data={data} options={options} />
          </div>
        </div>
        <div className="space-y-4 text-[16px]">
          {sectionsData.map((section) => (
            <div key={section.id} className="border-b pb-2">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection(section.id)}
              >
                <div className="font-normal">{section.title}</div>
                <div className="font-medium flex items-center justify-center gap-2">
                  <span
                    className={`${section.scoreColor} text-[14px] px-[8px] rounded-xl`}
                  >
                    {section.score}
                  </span>
                  {openSection === section.id ? (
                    <RiArrowDropUpLine size={25} color="gray" />
                  ) : (
                    <RiArrowDropDownLine size={25} color="gray" />
                  )}
                </div>
              </div>

              {openSection === section.id && (
                <ul className="mt-2 space-y-1 text-gray-500 text-[14px]">
                  {section.bulletPoints.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-start gap-2"
                    >
                      {bullet.icon} {bullet.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default YourScore;
