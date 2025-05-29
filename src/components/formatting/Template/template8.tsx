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
import { sectionEditMode } from "@/redux/slices/addSectionSlice";
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

const Template8 = ({ currentState, updateState }: ResumePreviewProps) => {
    const dispatch = useDispatch();
    const { addedSections, sectionBgColor, editMode } = useSelector((state: any) => state.addSection);
    console.log(addedSections, "addedSections===========>")

    const { spellCheck, grammarCheck } = useSelector((state: any) => state.ImproveText);
    const [incorrectWords, setIncorrectWords] = useState<string[]>([]);
    const [grammarErrors, setGrammarErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [secName, setSecName] = useState('');
    const [templateBgColor, setTemplateBgColor] = useState<any>('');
    const [editable, setEditable] = useState<boolean>(false);
    const [headerEditable, setHeaderEditable] = useState<boolean>(false);
    const containerHeaderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

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
                return <AllSoftSkills data={section} textColor="#000" textAltColor="#000" templateColor="#000" pillBg="transparent" isPillStyle={true} headerPosition="-top-[43px] right-[0px]" />;
            case "Technical Skills":
                return <AllTechnicalSkills data={section} textColor="#000" textAltColor="#000" templateColor="#000" pillBg="transparent" isPillStyle={true}  headerPosition="-top-[43px] right-[0px]" />;
            case "Certificate":
                return <AllCertificates data={section} textAltColor={currentState?.color} fontSize={scaleFont(16, currentState.fontSize)} fontFamily={currentState.fontFamily} />;
            case "Education":
                return <AllEducations data={section} textAltColor={currentState?.color} fontSize={scaleFont(16, currentState.fontSize)} fontFamily={currentState.fontFamily} />;
            case "Experience":
                return <AllExperiences data={section} textAltColor={currentState?.color} fontSize={scaleFont(16, currentState.fontSize)} fontFamily={currentState.fontFamily} />;
            case "Projects":
                return <AllProjects data={section} textAltColor={currentState?.color} />;
            case "Awards":
                return <AllAwards data={section} textColor="#000" textAltColor={currentState.color} templateColor={currentState.color} fontSize={scaleFont(16, currentState.fontSize)} fontFamily={currentState.fontFamily} iconSize={scaleFont(13, currentState.fontSize)} />;
            case "References":
                return <AllReferences data={section} textColor="#000" templateColor={currentState.color} textAltColor={currentState.color} />;
            case "Languages":
                return <AllLanguages data={section} textColor="#000" textAltColor={currentState.color} templateColor="#3358c5" fontSize={scaleFont(16, currentState.fontSize)} fontFamily={currentState.fontFamily}  headerPosition="-top-[43px] right-[0px]" />;
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
    const bottomSideSections = ["Technical Skills", "Soft Skills", "Languages"];
    const bottomSections = addedSections?.filter((section: any) => bottomSideSections.includes(section?.name));
    const midSections = addedSections?.filter((section: any) => !bottomSideSections.includes(section?.name));

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

    const handleEditableSection = () => {
        setEditable(true);
        dispatch(sectionEditMode(true));
    };
    const handleEditableSectionHeader = () => {
        setHeaderEditable(true);
        dispatch(sectionEditMode(true));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setEditable(false);
                dispatch(sectionEditMode(false));
            }
            if (containerHeaderRef.current && !containerHeaderRef.current.contains(event.target as Node)) {
                setHeaderEditable(false)
                dispatch(sectionEditMode(false));
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [editable]);


    // rearrange
    useEffect(() => {
        dispatch(setList(bottomSideSections));

        dispatch(setColumn(false));
    }, [addedSections]);

    return (
        <div className="w-a4 h-a4 relative"
            id="resume-content"
            style={{
                padding: `${currentState.padding || 0}px`,
                backgroundColor: editMode ? templateBgColor : undefined,
                transition: "background-color 0.3s ease-in-out"
            }}
        >
            <div className="grid grid-cols-12 h-full shadow-xl pb-0 relative">
                <div className="absolute left-0 top-[225px] w-full h-12 z-0" style={{
                    background: currentState?.color,
                }}></div>
                <div className="col-span-12 relative p-[30px] ">

                    <div className="flex gap-3 ">
                        <div className="w-9/12 flex flex-col items-start text-start ">
                            <input
                                placeholder="Name"
                                className="outline-none bg-transparent font-semibold text-black placeholder:text-black "
                                style={{
                                    fontSize: scaleFont(30, currentState.fontSize),
                                    fontFamily: currentState.fontFamily,
                                }}
                            />
                            <input
                                placeholder="Designation"
                                className="placeholder:text-[18px] bg-transparent focus:outline-none focus:ring-0 focus:border-0 placeholder:text-black "
                                style={{
                                    fontSize: scaleFont(18, currentState.fontSize),
                                    fontFamily: currentState.fontFamily,
                                    color: currentState?.color,
                                }}
                            />
                            {midSections?.length > 0 &&
                                midSections.map((section: any, index: number) => (
                                    section.name === 'Summary' &&
                                    <div key={index} className="pt-[12px] relative">
                                        <div className="">{renderSection(section)}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="w-3/12 border">
                            <Image unoptimized src={placeHolderImg} alt="profile Image" className="" />
                        </div>
                    </div>
                    {/* Header */}
                    <div
                        className={`flex flex-col relative  mt-4`}>
                        {/* <div className="absolute left-0 top-0 w-full h-12 z-0" style={{
                            background: currentState?.color,
                        }}></div> */}

                        <div className="w-full gap-2 py-3  flex justify-between items-center z-10 " >

                            {["Phone", "Email", "Address"].map((placeholder, idx) => (
                                <div key={idx} className="flex items-center justify-center gap-2 text-black ">
                                    <IconDropdown icons={FaIcons} iconColor="white" />
                                    <input
                                        type="text"
                                        placeholder={`please add your ${placeholder} here`}
                                        className="min-w-[180px] text-[14px] placeholder:text-[14px] text-white placeholder-white outline-none focus:bg-transparent bg-transparent"
                                        style={{
                                            fontSize: scaleFont(14, currentState.fontSize),
                                            fontFamily: currentState.fontFamily,
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        {midSections?.length > 0 &&
                            midSections.map((section: any, index: number) => (
                                section?.name === "Summary" ? null :
                                    <div key={index} className="pt-[12px] relative">
                                        <div className="border-b " style={{
                                            fontSize: scaleFont(24, currentState.fontSize),
                                        }} >
                                            {section?.name == "Custom Section" ?
                                                <div ref={containerRef} className={`flex items-center gap-2 pt-2 ${editable && 'bg-white'}`} onClick={handleEditableSection}>
                                                    <input
                                                        onChange={(e) => HandleChangeSectionName(e.target.value)}
                                                        type="text" className="text-[18px] font-semibold "
                                                        style={{
                                                            fontSize: scaleFont(18, currentState.fontSize),
                                                        }}
                                                        value={secName}
                                                    />
                                                </div>
                                                :
                                                <div ref={containerRef} className={`flex items-center gap-2 pt-2 ${editable && 'bg-white'}`} onClick={handleEditableSection}>
                                                    <h2 className="text-[18px] font-semibold text-gray-950"
                                                        style={{
                                                            fontSize: scaleFont(18, currentState.fontSize),
                                                        }}
                                                    >
                                                        {highlightWords(
                                                            section?.name === "Custom Section" && section?.newSecName
                                                                ? section.newSecName
                                                                : section?.name
                                                        )}
                                                    </h2>
                                                </div>
                                            }
                                        </div>
                                        <div className="">{renderSection(section)}</div>
                                    </div>
                            ))
                        }

                        {bottomSections?.length > 0 ? (
                            bottomSections.map((section: any, index: number) => (
                                <div key={index} className="pt-[12px] relative">
                                    <div className="border-b flex items-center gap-2 ">
                                        {section?.name == "Custom Section" ?
                                            <div ref={containerRef} className={`flex items-center gap-2 pt-2 ${editable && 'bg-white'}`} onClick={handleEditableSection}>
                                                <input
                                                    onChange={(e) => HandleChangeSectionName(e.target.value)}
                                                    type="text" className="text-[18px] font-semibold"
                                                    style={{
                                                        fontSize: scaleFont(18, currentState.fontSize),
                                                    }}
                                                    value={secName}
                                                />
                                            </div>
                                            :
                                            <div ref={containerRef} className={`flex items-center gap-2 pt-2 ${editable && 'bg-white'}`} onClick={handleEditableSection}>
                                                <h2 className="text-[18px] font-semibold"
                                                    style={{
                                                        fontSize: scaleFont(18, currentState.fontSize),
                                                    }}>
                                                    {highlightWords(
                                                        section?.name === "Custom Section" && section?.newSecName
                                                            ? section.newSecName
                                                            : section?.name
                                                    )}
                                                </h2>
                                            </div>
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
        </div >
    );
};

export default Template8;
