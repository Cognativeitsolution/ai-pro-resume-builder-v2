"use client";
//=============
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileImage } from '@/redux/slices/profileImageSlice';
//===== Images =====
import * as FaIcons from 'react-icons/fa';
import placeHolderImg from "media/assets/reusme_placeholder_image.webp";
//===== Section Components =====
import AllSummary from "../all-sections/sections-details/AllSummary";
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
import { setColumn, setList } from "@/redux/slices/rearrangeSlice";

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

const Template10 = ({ currentState, updateState }: ResumePreviewProps) => {
    const dispatch = useDispatch();
    const { addedSections, sectionBgColor, editMode } = useSelector((state: any) => state.addSection);
    console.log(addedSections, "addedSections===========>")

    const { spellCheck, grammarCheck } = useSelector((state: any) => state.ImproveText);
    const [incorrectWords, setIncorrectWords] = useState<string[]>([]);
    const [grammarErrors, setGrammarErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [secName, setSecName] = useState('');
    const [templateBgColor, setTemplateBgColor] = useState<any>('');

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

    useEffect(() => {
        setSecName('Custom Section')
    }, [])

    const HandleChangeSectionName = (data: any) => {
        console.log(data);
        setSecName(data)

    }
    const fullText = getAllText();

    // ===================
    useEffect(() => {
        setTemplateBgColor(sectionBgColor)
    }, [editMode, sectionBgColor])

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

    // ========== Render Sections
    const renderSection = (section: any) => {
        switch (section?.name) {
            case "Summary":
                return <AllSummary data={section} />;
            case "Soft Skills":
                return <AllSoftSkills data={section} textColor="" textAltColor="#000" templateColor="#000" />;
            case "Technical Skills":
                return <AllTechnicalSkills data={section} textColor="" textAltColor="#000" templateColor="#000" />;
            case "Certificate":
                return <AllCertificates data={section} textAltColor="#F54A00" fontSize={scaleFont(16, currentState.fontSize)} fontFamily={currentState.fontFamily} />;
            case "Education":
                return <AllEducations data={section} textAltColor="#F54A00" fontSize={scaleFont(16, currentState.fontSize)} fontFamily={currentState.fontFamily} />;
            case "Experience":
                return <AllExperiences data={section} textAltColor="#F54A00" fontSize={scaleFont(16, currentState.fontSize)} fontFamily={currentState.fontFamily} />;
            case "Projects":
                return <AllProjects data={section} textAltColor="#F54A00" />;
            case "Awards":
                return <AllAwards data={section} textColor="#000" textAltColor={currentState.color} templateColor={currentState.color} fontSize={scaleFont(16, currentState.fontSize)} fontFamily={currentState.fontFamily} iconSize={scaleFont(13, currentState.fontSize)} />;
            case "References":
                return <AllReferences data={section} textColor="#000" templateColor={currentState.color} textAltColor={currentState.color} />;
            case "Languages":
                return <AllLanguages data={section} textColor="#000" textAltColor={currentState.color} templateColor="#3358c5" fontSize={scaleFont(16, currentState.fontSize)} fontFamily={currentState.fontFamily} />;
            case "Custom Section":
                return <AllCustomSection secNewNames={secName} data={section} textColor="#000" templateColor="#fff" fontSize={scaleFont(16, currentState.fontSize)} fontFamily={currentState.fontFamily} iconSize={scaleFont(22, currentState.fontSize)} />;
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
    const rightSideSections = ["Summary", "Certificate", "Education", "Experience", "Projects", "Awards", "References", "Custom Section"];
    const rightSections = addedSections?.filter((section: any) => rightSideSections.includes(section?.name));
    const leftSections = addedSections?.filter((section: any) => !rightSideSections.includes(section?.name));

    //============= upload image
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageSrc = useSelector((state: RootState) => state.profileImage.image);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    dispatch(setProfileImage(reader.result));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // rearrange
    useEffect(() => {
        // const allSectionNames = addedSections.map((s: any) => s?.name);
        dispatch(setList(rightSideSections));

        dispatch(setColumn(true));
    }, [addedSections]);

    return (
        <div className="w-a4 h-a4 "
            style={{
                padding: `${currentState.padding || 0}px`,
                backgroundColor: editMode ? templateBgColor : undefined,
                transition: 'background-color 0.9s ease-in-out',
            }}
        >
            <div className="grid grid-cols-12 gap-4 p-6">
                <div className="col-span-12 relative">
                    <div className="absolute right-0 top-0 h-full w-[35%] z-0" style={{ backgroundColor: currentState.color }} />
                    {/* Header Left Start*/}
                    <div className="grid grid-cols-12 gap-2 p-3" style={{ backgroundColor: currentState.color }}>
                        <div className="col-span-4">
                            <Image src={placeHolderImg} alt="profile Image" width={160} height={160} className="rounded-full mx-auto" />
                        </div>
                        <div className="col-span-8 ">
                            <input
                                placeholder="Name"
                                className="outline-none bg-transparent font-semibold text-white placeholder:text-white"
                                style={{
                                    fontSize: scaleFont(30, currentState.fontSize),
                                    fontFamily: currentState.fontFamily,
                                }}
                            />
                            <input
                                placeholder="Designation"
                                className="w-full rounded placeholder:text-[18px] bg-transparent focus:outline-none focus:ring-0 focus:border-0 text-white placeholder:text-white"
                                style={{
                                    fontSize: scaleFont(18, currentState.fontSize),
                                    fontFamily: currentState.fontFamily,
                                    color: currentState.color,
                                }}
                            />
                            <div className="flex flex-col gap-1">
                                <div className="flex gap-2">
                                    <div className="border rounded-full flex justify-center items-center bg-white h-6 w-6 text-orange-600">
                                        <IconDropdown icons={FaIcons} />
                                    </div>
                                    <div className="">
                                        <input
                                            placeholder="Phone"
                                            className="w-full rounded placeholder:text-[16px] bg-transparent focus:outline-none focus:ring-0 focus:border-0 text-white placeholder:text-white"
                                            style={{
                                                fontSize: scaleFont(16, currentState.fontSize),
                                                fontFamily: currentState.fontFamily,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="border rounded-full flex justify-center items-center bg-white h-6 w-6 text-orange-600">
                                        <IconDropdown icons={FaIcons} />
                                    </div>
                                    <div className="">
                                        <input
                                            placeholder="Email"
                                            className="w-full rounded placeholder:text-[16px] bg-transparent focus:outline-none focus:ring-0 focus:border-0 text-white placeholder:text-white"
                                            style={{
                                                fontSize: scaleFont(16, currentState.fontSize),
                                                fontFamily: currentState.fontFamily,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="border rounded-full flex justify-center items-center bg-white h-6 w-6 text-orange-600">
                                        <IconDropdown icons={FaIcons} />
                                    </div>
                                    <div className="">
                                        <input
                                            placeholder="Location"
                                            className="w-full rounded placeholder:text-[16px] bg-transparent focus:outline-none focus:ring-0 focus:border-0 text-white placeholder:text-white"
                                            style={{
                                                fontSize: scaleFont(16, currentState.fontSize),
                                                fontFamily: currentState.fontFamily,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-4">
                    {/*====== left Sections ======*/}
                    <div className="">
                        {leftSections?.length > 0 &&
                            leftSections.map((section: any, index: number) => (
                                <div key={index} className="pt-4 relative">
                                    <div className="border-b text-white">
                                        {section?.name == "Custom Section" ?
                                            <input
                                                onChange={(e) => HandleChangeSectionName(e.target.value)}
                                                type="text" className="text-[18px] font-semibold mb-1 "
                                                style={{
                                                    color: currentState.color
                                                }}
                                                value={secName}
                                            />
                                            :
                                            <h2 className="text-[18px] font-semibold mb-1 text-gray-950"
                                            >
                                                {highlightWords(
                                                    section?.name === "Custom Section" && section?.newSecName
                                                        ? section.newSecName
                                                        : section?.name
                                                )}
                                            </h2>
                                        }
                                    </div>
                                    <div className="">{renderSection(section)}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="col-span-8 ">
                    {/*====== Left Sections ======*/}
                    {rightSections?.length > 0 ? (
                        rightSections.map((section: any, index: number) => (
                            <div key={index} className="pt-4 relative">
                                <div className="border-b ">
                                    {section?.name == "Custom Section" ?
                                        <input
                                            onChange={(e) => HandleChangeSectionName(e.target.value)}
                                            type="text" className="text-[18px] font-semibold mb-1"
                                            value={secName}
                                        />
                                        :
                                        <h2 className="text-[18px] font-semibold mb-1">
                                            {highlightWords(
                                                section?.name === "Custom Section" && section?.newSecName
                                                    ? section.newSecName
                                                    : section?.name
                                            )}
                                        </h2>
                                    }
                                </div>
                                <div className="">{renderSection(section)}</div>
                            </div>
                        ))
                    ) : (
                        <p>No sections added yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Template10;
