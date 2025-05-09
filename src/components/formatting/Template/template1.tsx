"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
// Import all the reusable section components
import AllSkills from "../all-sections/sections-details/AllSkills";
import AllCertificates from "../all-sections/sections-details/AllCertificates";
import AllEducations from "../all-sections/sections-details/AllEducations";
import AllExperiences from "../all-sections/sections-details/AllExperiences";
import AllProjects from "../all-sections/sections-details/AllProjects";
import Image from "next/image";
import placeHolderImg from "media/assets/reusme_placeholder_image.webp"

type CurrentState = {
    fontSize: string;
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

const Template1 = (props: ResumePreviewProps) => {
    const addedSections = useSelector((state: any) => state.addSection.addedSections);
    const { spellCheck, grammarCheck } = useSelector((state: any) => state.ImproveText);
    const { fontFamily, fontSize, color } = useSelector((state: any) => state.font)

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
                return <AllSkills textValue={highlightWords(section.name)} data={section} />;
            case "Certificate":
                return <AllCertificates textValue={highlightWords(section.name)} data={section} />;
            case "Education":
                return <AllEducations textValue={highlightWords(section.name)} data={section} />;
            case "Experience":
                return <AllExperiences textValue={highlightWords(section.name)} data={section} />;
            case "Projects":
                return <AllProjects textValue={highlightWords(section.name)} data={section} />;
            default:
                return <p>{highlightWords(section?.content || "")}</p>;
        }
    };

    // Font Logic

    const getFontSize = (base: number, scale: 'small' | 'medium' | 'large') => {
        const scaleFactor = scale === 'small' ? 0.85 : scale === 'large' ? 1.08 : 1;
        return `${base * scaleFactor}px`;
    };

    const nameFontSize = getFontSize(40, fontSize); // base is 40px
    const descFontSize = getFontSize(18, fontSize); // base is 18px

    return (
        <div className=" h-screen border border-gray-300 grid grid-cols-12">
            <div className="col-span-8 p-6">
                {/* Header Left Start*/}
                <div className="flex flex-col">
                    <input placeholder="Name" className="outline-none font-semibold" style={{ fontSize: nameFontSize, fontFamily }} />
                    <input placeholder="Designation" className="outline-none text-base font-semibold" style={{ fontSize: descFontSize, fontFamily }} />
                </div>
                {/* Header Left End*/}
                {addedSections?.length > 0 ? (
                    addedSections.map((section: any, index: number) => (
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
            <div className={`col-span-4`} style={{ background: color }}>
                <div className="flex flex-col items-center gap-2 p-3">
                    <div className="">
                        <Image src={placeHolderImg} alt="profile Image" width={160} height={160} className="rounded-full" />
                    </div>
                    <div className="">
                        <input placeholder="Name" className="w-full text-white placeholder-white bg-transparent" />
                        <input placeholder="Designation" className="w-full text-white placeholder-white bg-transparent" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Template1;
