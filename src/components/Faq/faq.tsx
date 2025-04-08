"use client";

import React, { useState, useEffect } from "react";
// import axios from "axios";
import { usePathname } from "next/navigation";
import { H3 } from "@/components/typography";

interface Faq {
  question: string;
  answer: string;
  page: string;
}

const dummyFaqs: Faq[] = [
  {
    question: "What is Next.js?",
    answer: "Next.js is a React framework for production.",
    page: "Home",
  },
  {
    question: "How to install Next.js?",
    answer: "You can install it using 'npx create-next-app@latest'.",
    page: "Home",
  },
  {
    question: "What is a Resume Template?",
    answer: "A resume template is a pre-designed layout for resumes.",
    page: "Resume Template",
  },
  {
    question: "How to use a Resume Template?",
    answer: "You can customize a resume template according to your details.",
    page: "Resume Template",
  },
  {
    question: "What is Next.js?",
    answer: "Next.js is a React framework for production.",
    page: "Services",
  },
  {
    question: "How to install Next.js?",
    answer: "You can install it using 'npx create-next-app@latest'.",
    page: "Services",
  },
  {
    question: "What is Next.js?",
    answer: "Next.js is a React framework for production.",
    page: "Pricing",
  },
  {
    question: "How to install Next.js?",
    answer: "You can install it using 'npx create-next-app@latest'.",
    page: "Pricing",
  },
  {
    question: "What is Next.js?",
    answer: "Next.js is a React framework for production.",
    page: "Resume Template",
  },
  {
    question: "How to install Next.js?",
    answer: "You can install it using 'npx create-next-app@latest'.",
    page: "Resume Template",
  },
  {
    question: "What is Next.js?",
    answer: "Next.js is a React framework for production.",
    page: "Cover Template",
  },
  {
    question: "How to install Next.js?",
    answer: "You can install it using 'npx create-next-app@latest'.",
    page: "Cover Template",
  },
  {
    question: "How to install Next.js?",
    answer: "You can install it using 'npx create-next-app@latest'.",
    page: "Resume Example",
  },
  {
    question: "What is Next.js?",
    answer: "Next.js is a React framework for production.",
    page: "Resume Example",
  },
  {
    question: "How to install Next.js?",
    answer: "You can install it using 'npx create-next-app@latest'.",
    page: "Resume Example",
  },
  {
    question: "How to install Next.js?",
    answer: "You can install it using 'npx create-next-app@latest'.",
    page: "Cover Example",
  },
  {
    question: "What is Next.js?",
    answer: "Next.js is a React framework for production.",
    page: "Cover Example",
  },
  {
    question: "How to install Next.js?",
    answer: "You can install it using 'npx create-next-app@latest'.",
    page: "Cover Example",
  },
];

export default function OurFaqs() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleChange = (panel: number) => {
    setExpanded(expanded === panel ? null : panel);
  };

  let currentPage = "";
  switch (pathname) {
    case "/":
      currentPage = "Home";
      break;
    case "/resume-templates":
      currentPage = "Resume Template";
      break;
    case "/resume-examples":
      currentPage = "Resume Example";
      break;
    case "/cover-templates":
      currentPage = "Cover Template";
      break;
    case "/cover-examples":
      currentPage = "Cover Example";
      break;
    case "/services":
      currentPage = "Services";
      break;
    case "/packages":
      currentPage = "Pricing";
      break;
    case "/ats-checker":
      currentPage = "Ats";
      break;
    default:
      currentPage = "";
  }

  useEffect(() => {
    const filteredFaqs = dummyFaqs.filter((faq) => faq.page === currentPage);
    setFaqs(filteredFaqs);
  }, [currentPage]);

  //   const handleKeyUp = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setSearchTerm(event.target.value);
  //   };

  //   useEffect(() => {
  //     axios
  //       .get<{ data: Faq[] }>(`${process.env.NEXT_PUBLIC_BASE_URL}/our-faqs`)
  //       .then((response: any) => {
  //         const filteredFaqs = response.data.data.filter(
  //           (faq: any) => faq.page === currentPage
  //         );
  //         setFaqs(filteredFaqs);
  //       })
  //       .catch((error: any) => {
  //         console.error(error);
  //       });
  //   }, [currentPage]);

  return (
    <>
      {faqs.length > 0 && (
        <section className="w-full bg-white mt-2 py-4 px-4 sm:px-20 justify-between items-center align-middle rounded-tr-[150px] relative">
          <div className="flex sm:gap-2 justify-center items-center">
            <H3 className="text-primaryBlue">
              FREQUENTLY <span className="text-primaryGreen">ASKED </span>{" "}
              QUESTIONS
            </H3>
          </div>

          <div className="accordion-group w-[90%] lg:w-[75%] 2xl:w-[60%] mx-auto">
            {faqs
              .filter((faq) =>
                faq.question.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((faq, i) => (
                <div
                  className="accordion py-6 border-b border-solid border-gray-200"
                  key={i}
                >
                  <button
                    onClick={() => handleChange(i)}
                    className={`accordion-toggle group inline-flex items-center justify-between font-normal leading-8 w-full transition duration-500 text-lg md:text-xl font-Lexend ${expanded === i ? "text-[#0072b180]" : "text-[#0072b1]"
                      }`}
                  >
                    <h5 className="text-left pr-3 w-[90%]">{faq.question}</h5>
                    <svg
                      className={`transition duration-500  ${expanded === i
                          ? "rotate-180 text-[#0072b180]"
                          : "text-[#0072b1]"
                        }`}
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                  {expanded === i && (
                    <div className="accordion-content w-full px-0 overflow-hidden pr-4 pt-3">
                      <div
                        className="py-2 px-1 text-black text-sm md:text-md font-Lexend faq_editor"
                        dangerouslySetInnerHTML={{
                          __html: faq?.answer,
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </section>
      )}
    </>
  );
}
