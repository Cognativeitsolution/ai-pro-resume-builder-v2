"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setProfileImage } from "@/redux/slices/profileImageSlice";
import * as FaIcons from "react-icons/fa";
import placeHolderImg from "media/assets/reusme_placeholder_image.webp";
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

type CurrentState = {
    fontSize: any;
    fontFamily: string;
    fontWeight: string;
    color: string;
    margin: number;
    padding: number;
    text: any;
};

type ResumePreviewProps = {
    currentState: CurrentState;
    updateState: (newState: CurrentState) => void;
};

const Template1 = ({ currentState, updateState }: ResumePreviewProps) => {
    const dispatch = useDispatch();
    const { addedSections, sectionBgColor, editMode } = useSelector(
        (state: any) => state.addSection
    );

    const { spellCheck, grammarCheck } = useSelector(
        (state: any) => state.ImproveText
    );
    const [incorrectWords, setIncorrectWords] = useState<string[]>([]);
    const [grammarErrors, setGrammarErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [secName, setSecName] = useState("");
    const [templateBgColor, setTemplateBgColor] = useState<any>("");
    const [editable, setEditable] = useState<boolean>(false);
    const [headerEditable, setHeaderEditable] = useState<boolean>(false);
    const containerHeaderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    //============= all sections
    const getAllText = () => {
        return addedSections
            ?.map((section: any) => {
                if (typeof section?.content === "string") return section.content;
                if (Array.isArray(section?.content)) {
                    return section.content
                        .map((item: any) => Object.values(item).join(" "))
                        .join(" ");
                }
                return "";
            })
            .join("\n");
    };

    useEffect(() => {
        setSecName("Custom Section");
    }, []);

    const HandleChangeSectionName = (data: any) => {
        console.log(data);
        setSecName(data);
    };
    const fullText = getAllText();

    // ===================
    useEffect(() => {
        setTemplateBgColor(sectionBgColor);
    }, [editMode, sectionBgColor]);

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
                    spellingMistakes =
                        spellResponse.data?.data?.map(
                            (item: any) => item?.misspelledWord
                        ) || [];
                }

                if (grammarCheck) {
                    const grammarResponse = await axios.post(
                        "https://ai.grmcheck.aiproresume.com/api/v1/grammar-correction",
                        { text: fullText },
                        { headers: { "Content-Type": "application/json" } }
                    );
                    grammarMistakes =
                        grammarResponse.data?.data?.map((item: any) => item?.wrongWords) ||
                        [];
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
                return (
                    <AllSoftSkills
                        data={section}
                        textColor="#fff"
                        textAltColor="#000"
                        templateColor="#fff"
                        editableAltBG="bg-gray-900/80"
                        isPillStyle={true} />
                );
            case "Technical Skills":
                return (
                    <AllTechnicalSkills
                        data={section}
                        textColor="#fff"
                        textAltColor="#000"
                        templateColor="#fff"
                        editableAltBG="bg-gray-900/80"
                        isPillStyle={true} />
                );
            case "Certificate":
                return <AllCertificates data={section} />;
            case "Education":
                return (
                    <AllEducations
                        data={section}
                        textColor=""
                        textAltColor=""
                        templateColor=""
                    />
                );
            case "Experience":
                return (
                    <AllExperiences
                        data={section}
                        textColor=""
                        textAltColor=""
                        templateColor=""
                    />
                );
            case "Projects":
                return (
                    <AllProjects
                        data={section}
                        textColor=""
                        textAltColor=""
                        templateColor=""
                    />
                );
            case "Awards":
                return (
                    <AllAwards
                        data={section}
                        textColor="#000"
                        textAltColor={currentState.color}
                        templateColor={currentState.color}
                    />
                );
            case "References":
                return (
                    <AllReferences
                        data={section}
                        textColor="#000"
                        templateColor={currentState.color}
                        textAltColor={currentState.color}
                    />
                );
            case "Languages":
                return (
                    <AllLanguages
                        data={section}
                        textColor="#fff"
                        templateColor="#3358c5"
                        editableAltBG="bg-gray-900/80"
                    />
                );
            case "Custom Section":
                return (
                    <AllCustomSection
                        secNewNames={secName}
                        data={section}
                        textColor="#000"
                        templateColor="#fff"
                    />
                );
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
    const rightSideSections = ["Technical Skills", "Soft Skills", "Languages"];
    const leftSections = addedSections?.filter(
        (section: any) => !rightSideSections.includes(section?.name)
    );
    const rightSections = addedSections?.filter((section: any) =>
        rightSideSections.includes(section?.name)
    );

    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageSrc = useSelector((state: RootState) => state.profileImage.image);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
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
    return (
        <div
            className="w-a4 h-a4 relative"
            id="resume-content"
            style={{
                padding: `${currentState.padding || 0}px`,
                backgroundColor: editMode ? templateBgColor : undefined,
                transition: "background-color 0.3s ease-in-out"
            }}
        >
            <div className="grid grid-cols-12 h-full shadow-xl pb-0">
                {/* Left Column */}
                <div className="col-span-8 p-[30px] pr-8">
                    {/* Header */}
                    <div ref={containerHeaderRef}
                        className={`flex flex-col ${headerEditable && 'bg-white'}`}
                        onClick={handleEditableSectionHeader}>
                        <input
                            placeholder="Name"
                            className="outline-none bg-transparent font-semibold text-zinc-900"
                            style={{
                                fontSize: scaleFont(30, currentState.fontSize),
                                fontFamily: currentState.fontFamily
                            }}
                        />
                        <input
                            placeholder="Designation"
                            className="w-full rounded bg-transparent placeholder:text-[18px] focus:outline-none focus:ring-0 focus:border-0"
                            style={{
                                fontSize: scaleFont(18, currentState.fontSize),
                                fontFamily: currentState.fontFamily,
                                color: currentState.color
                            }}
                        />
                    </div>

                    {/* Left Sections */}
                    {leftSections?.length > 0 ? (
                        leftSections.map((section: any, index: number) => (
                            <div key={index} className="pt-4 relative">
                                <div className="border-b">
                                    {section?.name === "Custom Section" ? (
                                        <div ref={containerRef} className={`flex flex-col pt-2 ${editable && 'bg-white'}`} onClick={handleEditableSection}>
                                            <input
                                                type="text"
                                                className="text-[18px] bg-transparent focus:outline-none font-semibold mb-1"
                                                style={{ color: currentState.color }}
                                                value={secName}
                                                onChange={(e) => HandleChangeSectionName(e.target.value)}
                                            />
                                        </div>
                                    ) : (
                                        <h2 className="text-[18px] font-semibold mb-1" style={{ color: currentState.color }}>
                                            {highlightWords(section?.newSecName || section?.name)}
                                        </h2>
                                    )}
                                </div>
                                <div className="">{renderSection(section)}</div>
                            </div>
                        ))
                    ) : (
                        <p>No sections added yet.</p>
                    )}

                    {loading && (
                        <p className="text-gray-500 mt-4">
                            Checking for spelling/grammar errors...
                        </p>
                    )}
                </div>

                {/* Right Column */}
                <div
                    className="col-span-4 px-[10px] h-a4 -mr-[30px] z-10"
                    style={{ backgroundColor: currentState.color }}
                >
                    {/* Profile Image */}
                    <div className="p-3 py-12">
                        <div className="flex justify-center mb-6 w-[160px] h-[160px] mx-auto rounded-full overflow-hidden cursor-pointer">
                            <Image
                                src={imageSrc || placeHolderImg}
                                alt="Profile"
                                width={160}
                                height={160}
                                className="w-full"
                                onClick={handleImageClick}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-col gap-2">
                            <div
                                className="text-start text-white flex items-center gap-2 pb-1 mb-1"
                                style={{
                                    fontSize: scaleFont(24, currentState.fontSize),
                                    fontFamily: currentState.fontFamily
                                }}
                            >
                                <IconDropdown icons={FaIcons} />
                                <span className="text-[20px]">Contact Info</span>
                            </div>
                            <hr />
                            {["Phone", "Email"].map((placeholder, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-white">
                                    <IconDropdown icons={FaIcons} />
                                    <input
                                        placeholder={placeholder}
                                        className="w-full text-[14px] placeholder:text-[14px] placeholder-white outline-none focus:bg-transparent bg-transparent"
                                    />
                                </div>
                            ))}
                            <div className="flex items-start gap-2 text-white">
                                <IconDropdown icons={FaIcons} />
                                <textarea
                                    placeholder="Address"
                                    className="w-full text-[14px] placeholder:text-[14px] placeholder-white outline-none focus:bg-transparent bg-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Sections */}
                    <div className="p-3">
                        {rightSections?.length > 0 &&
                            rightSections.map((section: any, index: number) => (
                                <div key={index} className="pt-4 relative">
                                    <div className="border-b text-white">
                                        {section?.name === "Custom Section" ? (
                                            <div ref={containerRef} className={`flex flex-col pt-2 ${editable && 'bg-white'}`} onClick={handleEditableSection}>
                                                <input
                                                    type="text"
                                                    className="text-[18px] bg-transparent focus:outline-none font-semibold mb-1"
                                                    style={{ color: currentState.color }}
                                                    value={secName}
                                                    onChange={(e) => HandleChangeSectionName(e.target.value)}
                                                />
                                            </div>
                                        ) : (
                                            <h2 className="text-[18px] font-semibold mb-1">
                                                {highlightWords(section?.newSecName || section?.name)}
                                            </h2>
                                        )}
                                    </div>
                                    <div className="">{renderSection(section)}</div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Template1;
