"use client";
//=============
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useSelector } from "react-redux";
import placeHolderImg from "media/assets/reusme_placeholder_image.webp";
//===== Section Components =====
import AllCertificates from "../all-sections/sections-details/AllCertificates";
import AllEducations from "../all-sections/sections-details/AllEducations";
import AllExperiences from "../all-sections/sections-details/AllExperiences";
import AllProjects from "../all-sections/sections-details/AllProjects";
import AllSoftSkills from "../all-sections/sections-details/AllSoftSkills";
import AllLanguages from "../all-sections/sections-details/AllLanguages";
import AllTechnicalSkills from "../all-sections/sections-details/AllTechnicalSkills";
import AllAwards from "../all-sections/sections-details/AllAwards";
import AllReferences from "../all-sections/sections-details/AllReferences";
import IconDropdown from "../icon-dropdown/IconDropdown";
import AllCustomSection from "../all-sections/sections-details/AllCustomSections";
import * as FaIcons from 'react-icons/fa';

type CurrentState = {
    fontSize: any;
    fontFamily: string;
    fontWeight: string;
    color: string;
    margin: number;
    padding: number;
    text: any;
}

type ResumePreviewProps = {
    currentState: CurrentState;
    updateState: (newState: CurrentState) => void;
}

const Template1 = ({ currentState, updateState }: ResumePreviewProps) => {
    const addedSections = useSelector((state: any) => state.addSection.addedSections);
    console.log(addedSections, "addedSections===========>")

    const { spellCheck, grammarCheck } = useSelector((state: any) => state.ImproveText);
    const [incorrectWords, setIncorrectWords] = useState<string[]>([]);
    const [grammarErrors, setGrammarErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    //============= all sections
    const getAllText = () => {
        return addedSections?.map((section: any) => {
            if (typeof section?.content === "string") return section.content;
            if (Array.isArray(section?.content)) {
                return section.content.map((item: any) => Object.values(item).join(" ")).join(" ");
            }
            return "";
        }).join("\n");
    };

    const fullText = getAllText();

    //============= improve text logic
    useEffect(() => {
        const fetchCorrections = async () => {
            if (!spellCheck && !grammarCheck) return;
            setLoading(true);
            try {
                let spellingMistakes: string[] = [];
                let grammarMistakes: string[] = [];

                if (spellCheck) {
                    const spellResponse = await axios.post(
                        "https://ai.spellcheck.aiproresume.com/api/v1/spell-correction",
                        { text: fullText },
                        { headers: { "Content-Type": "application/json" } }
                    );
                    spellingMistakes = spellResponse.data?.data?.map((item: any) => item?.misspelledWord) || [];
                }

                if (grammarCheck) {
                    const grammarResponse = await axios.post(
                        "https://ai.grmcheck.aiproresume.com/api/v1/grammar-correction",
                        { text: fullText },
                        { headers: { "Content-Type": "application/json" } }
                    );
                    grammarMistakes = grammarResponse.data?.data?.map((item: any) => item?.wrongWords) || [];
                }

                setIncorrectWords(spellingMistakes);
                setGrammarErrors(grammarMistakes);
            } catch (err) {
                console.error("Error during API call:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCorrections();
    }, [spellCheck, grammarCheck, fullText]);

    //============= Highlight function
    const highlightWords = (text: string) => {
        return text.split(/\s+/).map((word, index) => {
            const cleaned = word.replace(/[.,!?]/g, "").toLowerCase();
            const isSpellingMistake = spellCheck && incorrectWords.includes(cleaned);
            const isGrammarMistake = grammarCheck && grammarErrors.includes(cleaned);

            return (
                <span
                    key={index}
                    className={`
                        ${isSpellingMistake ? "text-red-500" : ""}
                        ${isGrammarMistake ? "bg-blue-200 underline" : ""}
                    `}
                >
                    {word}{" "}
                </span>
            );
        });
    };

    const renderSection = (section: any) => {
        switch (section?.name) {
            case "Soft_Skills":
                return <AllSoftSkills data={section} color="#000" templateColor="#fff" />;
            case "Technical_Skills":
                return <AllTechnicalSkills data={section} color="#000" templateColor="#fff" />;
            case "Certificate":
                return <AllCertificates data={section} color="#000" templateColor="#fff" />;
            case "Education":
                return <AllEducations data={section} color="#000" templateColor="#fff" />;
            case "Experience":
                return <AllExperiences data={section} color="#000" templateColor="#fff" />;
            case "Projects":
                return <AllProjects data={section} color="#000" templateColor="#fff" />;
            case "Awards":
                return <AllAwards data={section} color="#000" templateColor="#000" />;
            case "References":
                return <AllReferences data={section} color="#000" templateColor="#000" />;
            case "Languages":
                return <AllLanguages data={section} color="#fff" templateColor="#3358c5" />;
            case "Custom_Section":
                return <AllCustomSection data={section} color="#000" templateColor="#fff" />;
            default:
                return <p>{highlightWords(section?.content || "")}</p>;
        }
    };

    const scaleFont = (base: number, size: string) => {
        const scaleMap: Record<string, number> = {
            small: 0.85,
            medium: 1,
            large: 1.2,
        };
        return `${base * (scaleMap[size] || 1)}px`;
    };
    const rightSideSections = ["Technical_Skills", "Soft_Skills", "Languages"];
    const leftSections = addedSections?.filter((section: any) => !rightSideSections.includes(section?.name));
    const rightSections = addedSections?.filter((section: any) => rightSideSections.includes(section?.name));


    return (
        <div className="w-a4 h-a4 flex " style={{ padding: `${currentState.padding || 0}px`, }} >
            {/* <div className="absolute right-0 top-0 h-full w-[35%] z-0" style={{ backgroundColor: currentState.color }} /> */}
            <div className="w-[65%] p-6">
                {/*====== Header Left ======*/}
                <div className="flex flex-col">
                    <input
                        placeholder="Name"
                        className="outline-none focus:bg-transparent font-semibold"
                        style={{
                            fontSize: scaleFont(30, currentState.fontSize),
                            fontFamily: currentState.fontFamily,
                        }}
                    />
                    <input
                        placeholder="Designation"
                        className="outline-none focus:bg-transparent font-semibold"
                        style={{
                            fontSize: scaleFont(18, currentState.fontSize),
                            fontFamily: currentState.fontFamily,
                        }}
                    />
                </div>
                {/*====== Left Sections ======*/}
                {leftSections?.length > 0 ? (
                    leftSections.map((section: any, index: number) => (
                        <div key={index} className="py-4 relative">
                            <div className="border-b text-black">
                                <h2 className="text-xl font-semibold mb-2">{highlightWords(section?.name)}</h2>
                            </div>
                            <div className="mt-2">{renderSection(section)}</div>
                        </div>
                    ))
                ) : (
                    <p>No sections added yet.</p>
                )}

                {loading && <p className="text-gray-500 mt-4">Checking for spelling/grammar errors...</p>}
            </div>
            <div className={`w-[35%] `} style={{ backgroundColor: currentState.color }}>
                {/*====== conact info ======*/}
                <div className="p-3">
                    <div className="flex justify-center mb-2">
                        <Image src={placeHolderImg} alt="profile Image" width={160} height={160} className="rounded-full" />
                    </div>
                    <div className="flex justify-center flex-col gap-1">
                        <div className="border-b text-start text-white flex gap-2" style={{
                            fontSize: scaleFont(24, currentState.fontSize),
                            fontFamily: currentState.fontFamily,
                        }}>
                            <IconDropdown icons={FaIcons} />
                            <span>Contact Info</span>
                        </div>
                        <div className="flex gap-2 text-white">
                            <IconDropdown icons={FaIcons} />
                            <input placeholder="Phone" className="w-full placeholder-white outline-none focus:bg-transparent bg-transparent" />
                        </div>
                        <div className="flex gap-2 text-white">
                            <IconDropdown icons={FaIcons} />
                            <input placeholder="Email" className="w-full placeholder-white outline-none focus:bg-transparent bg-transparent" />
                        </div>
                        <div className="flex gap-2 text-white">
                            <IconDropdown icons={FaIcons} />
                            <textarea placeholder="Address" className="w-full placeholder-white outline-none focus:bg-transparent bg-transparent" />
                        </div>
                    </div>
                </div>

                {/*====== Right Sections ======*/}
                <div className="p-3">
                    {rightSections?.length > 0 &&
                        rightSections.map((section: any, index: number) => (
                            <div key={index} className="py-4 relative">
                                <div className="border-b text-white">
                                    <h2 className="text-xl font-semibold mb-2">{highlightWords(section?.name)}</h2>
                                </div>
                                <div className="mt-2">{renderSection(section)}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Template1;
