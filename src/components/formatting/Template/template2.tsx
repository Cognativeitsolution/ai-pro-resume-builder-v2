"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
// Import all the reusable section components
import AllCertificates from "../all-sections/sections-details/AllCertificates";
import AllEducations from "../all-sections/sections-details/AllEducations";
import AllExperiences from "../all-sections/sections-details/AllExperiences";
import AllProjects from "../all-sections/sections-details/AllProjects";
import Image from "next/image";
import placeHolderImg from "media/assets/reusme_placeholder_image.webp"
import AllSoftSkills from "../all-sections/sections-details/AllSoftSkills";
import IconDropdown from "../icon-dropdown/IconDropdown";

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

const Template2 = ({ currentState, updateState }: ResumePreviewProps) => {
    const addedSections = useSelector((state: any) => state.addSection.addedSections);

    const { spellCheck, grammarCheck } = useSelector((state: any) => state.ImproveText);
    const [incorrectWords, setIncorrectWords] = useState<string[]>([]);
    const [grammarErrors, setGrammarErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    //all sections
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

    // improve text logic
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

    // Highlight function
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
            case "Skills":
            // return <AllSoftSkills data={section} />;
            case "Certificate":
            // return <AllCertificates data={section} />;
            case "Education":
            // return <AllEducations data={section} />;
            case "Experience":
            // return <AllExperiences data={section} />;
            case "Projects":
            // return <AllProjects data={section} />;
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
    const rightSideSections = ["Technical Skills", "Soft Skills", "Languages", "References"];
    const leftSections = addedSections?.filter((section: any) => !rightSideSections.includes(section?.name));
    const rightSections = addedSections?.filter((section: any) => rightSideSections.includes(section?.name));


    return (
        <div className="w-a4 h-a4 flex relative"
            style={{
                margin: `${currentState.margin || 0}px`,
                padding: `${currentState.padding || 0}px`,
            }}
        >
            <div
                className="absolute right-0 top-0 h-full w-[35%] z-0"
                style={{ backgroundColor: currentState.color }}
            />
            <div className="w-[65%] z-10 p-6">
                {/* Header Left Start*/}
                <div className="flex flex-col">
                    <input
                        placeholder="Name"
                        className="outline-none font-semibold"
                        style={{
                            fontSize: scaleFont(30, currentState.fontSize),
                            fontFamily: currentState.fontFamily,
                        }}
                    />

                    <input
                        placeholder="Designation"
                        className="outline-none font-semibold"
                        style={{
                            fontSize: scaleFont(18, currentState.fontSize),
                            fontFamily: currentState.fontFamily,
                        }}
                    />
                </div>
                {/* Header Left End*/}
                {/* Left Sections */}
                {leftSections?.length > 0 ? (
                    leftSections.map((section: any, index: number) => (
                        <div key={index} className="border-b py-4">
                            <h2 className="text-xl font-semibold mb-2">{highlightWords(section?.name)}</h2>
                            {renderSection(section)}
                        </div>
                    ))
                ) : (
                    <p>No sections added yet.</p>
                )}

                {loading && <p className="text-gray-500 mt-4">Checking for spelling/grammar errors...</p>}
            </div>
            <div className={`w-[35%] z-10`} >
                {/* conact info */}
                <div className="p-3">

                    <div className="flex justify-center mb-2">
                        <Image src={placeHolderImg} alt="profile Image" width={160} height={160} className="rounded-full" />
                    </div>
                    <div className="flex justify-center flex-col gap-1">
                        <div className="border-b text-start text-white flex gap-2" style={{
                            fontSize: scaleFont(24, currentState.fontSize),
                            fontFamily: currentState.fontFamily,
                        }}>
                            {/* <IconDropdown /> */}
                            <span>Contact Info</span>
                        </div>
                        <div className="flex gap-2 text-white">
                            {/* <IconDropdown /> */}
                            <input placeholder="Phone" className="w-full placeholder-white outline-none bg-transparent" />
                        </div>
                        <div className="flex gap-2 text-white">
                            {/* <IconDropdown /> */}
                            <input placeholder="Email" className="w-full placeholder-white outline-none bg-transparent" />
                        </div>
                        <div className="flex gap-2 text-white">
                            {/* <IconDropdown /> */}
                            <input placeholder="Address" className="w-full placeholder-white outline-none bg-transparent" />
                        </div>

                    </div>
                </div>

                {/* Right Sections */}
                <div className="p-3">
                    {rightSections?.length > 0 &&
                        rightSections.map((section: any, index: number) => (
                            <div key={index} className="border-b py-4 text-white">
                                <h2 className="text-xl font-semibold mb-2">{highlightWords(section?.name)}</h2>
                                {renderSection(section)}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Template2;
