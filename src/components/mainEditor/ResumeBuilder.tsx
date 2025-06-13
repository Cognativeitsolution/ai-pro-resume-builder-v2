"use client";
// ============
import React, { useEffect, useRef, useState } from "react";
// ============
import { useDispatch, useSelector } from "react-redux";
import { setColumn, setList } from "@/redux/slices/rearrangeSlice";
import { addUserHeader, disableTemplateIcons, disableTemplateProfile, sectionEditMode, sectionShowIcons, sectionShowProfile } from "@/redux/slices/addSectionSlice";
// ============
import { BookUser, LucideGraduationCap, Mail, Phone } from "lucide-react";
import { FaSchool } from "react-icons/fa";
import { GrUserExpert } from "react-icons/gr";
import { GrProjects } from "react-icons/gr";
import { GiSkills } from "react-icons/gi";
import { PiCertificateBold } from "react-icons/pi";
import { LiaAwardSolid, LiaLanguageSolid } from "react-icons/lia";
import { HiMiniLanguage } from "react-icons/hi2";
import { VscReferences } from "react-icons/vsc";
import { MdOutlineSummarize } from "react-icons/md";
import { BsSignIntersectionSide } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { FaAward } from "react-icons/fa6";
import { IoDocumentText, IoPeople } from "react-icons/io5";
import { RiContactsBook3Fill } from "react-icons/ri";
// ============
import ResumePage from "./ResumePage";
import Watermark from "@/components/common/watermark/watermark";
import AllAwards from "../formatting/all-sections/sections-details/AllAwards";
import AllSummary from "../formatting/all-sections/sections-details/AllSummary";
import AllProjects from "../formatting/all-sections/sections-details/AllProjects";
import AllLanguages from "../formatting/all-sections/sections-details/AllLanguages";
import AllSoftSkills from "../formatting/all-sections/sections-details/AllSoftSkills";
import AllEducations from "../formatting/all-sections/sections-details/AllEducations";
import AllReferences from "../formatting/all-sections/sections-details/AllReferences";
import AllExperiences from "../formatting/all-sections/sections-details/AllExperiences";
import AllCertificates from "../formatting/all-sections/sections-details/AllCertificates";
import AllCustomSection from "../formatting/all-sections/sections-details/AllCustomSections";
import AllTechnicalSkills from "../formatting/all-sections/sections-details/AllTechnicalSkills";
// ============
import TemplateProfileImg from "@/components/profileImg/TemplateProfileImg";

// ===========
type CurrentState = {
    fontSize: any;
    fontFamily: string;
    fontWeight: string;
    color: string;
    margin: number;
    padding: number;
    text: any;
};
// ===========
type ResumePreviewProps = {
    currentState: CurrentState;
    scaleFont: any;
    incorrectTextChange?: any;
    correctTextChange?: any;
}
// ===========
type ResumeSectionData = {
    type: string;
    entries: string[];
};

export default function ResumeBuilder({ currentState, scaleFont, incorrectTextChange, correctTextChange }: ResumePreviewProps) {

    const dispatch = useDispatch();
    const { addedSections, sectionBgColor, editMode, showProfile, showIcons } = useSelector((state: any) => state.addSection);
    const [secName, setSecName] = useState("");
    const [templateBgColor, setTemplateBgColor] = useState<any>("");
    const [editable, setEditable] = useState<boolean>(false);
    const [headerEditable, setHeaderEditable] = useState<boolean>(false);
    const containerHeaderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [headerData, setHeaderData] = useState({ name: "", designation: "" });
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [measured, setMeasured] = useState(false);
    // ===========
    const HandleChangeSectionName = (data: any) => {
        console.log(data);
        setSecName(data);
    };
    // ========== Render Sections
    const renderSection = (section: any) => {
        switch (section?.name) {
            case "Summary":
                return <AllSummary data={section}
                    fontSize={scaleFont(16, currentState.fontSize)}
                    fontFamily={currentState.fontFamily}
                    textColor=""
                />;
            case "Soft Skills":
                return (
                    <AllSoftSkills
                        data={section}
                        textColor="#fff"
                        textAltColor="#000"
                        templateColor="#fff"
                        editableAltBG="bg-gray-900/80"
                        isPillStyle={true}
                        headerPosition="-top-[30px] -right-[50px]"
                        isVerticleHeader={true}
                        isDot={false}

                    />
                );
            case "Technical Skills":
                return (
                    <AllTechnicalSkills
                        data={section}
                        textColor="#fff"
                        textAltColor="#000"
                        templateColor="#fff"
                        editableAltBG="bg-gray-900/80"
                        isPillStyle={true}
                        headerPosition="-top-[30px] -right-[50px]"
                        isVerticleHeader={true}
                        isDot={false}

                    />
                );
            case "Certificate":
                return <AllCertificates data={section}
                    fontSize={scaleFont(16, currentState.fontSize)}
                    fontFamily={currentState.fontFamily}
                />;
            case "Education":
                return (
                    <AllEducations
                        data={section}
                        textColor=""
                        textAltColor=""
                        templateColor=""
                        fontSize={scaleFont(16, currentState.fontSize)}
                        fontFamily={currentState.fontFamily}

                    />
                );
            case "Experience":
                return (
                    <AllExperiences
                        data={section}
                        textColor=""
                        textAltColor=""
                        templateColor=""
                        fontSize={scaleFont(16, currentState.fontSize)}
                        fontFamily={currentState.fontFamily}

                    />
                );
            case "Projects":
                return (
                    <AllProjects
                        data={section}
                        textColor=""
                        textAltColor=""
                        templateColor=""

                        fontSize={scaleFont(16, currentState.fontSize)}
                        fontFamily={currentState.fontFamily}
                    />
                );
            case "Awards":
                return (
                    <AllAwards
                        data={section}
                        textColor="#000"
                        textAltColor={currentState.color}
                        templateColor={currentState.color}
                        fontSize={scaleFont(16, currentState.fontSize)}
                        iconSize={scaleFont(13, currentState.fontSize)}
                        fontFamily={currentState.fontFamily}

                    />
                );
            case "References":
                return (
                    <AllReferences
                        data={section}
                        textColor=""
                        templateColor={currentState.color}
                        textAltColor={currentState.color}
                        fontSize={scaleFont(16, currentState.fontSize)}
                        fontFamily={currentState.fontFamily}
                    />
                );
            case "Languages":
                return (
                    <AllLanguages
                        data={section}
                        textColor="#fff"
                        templateColor="#3358c5"
                        editableAltBG="bg-gray-900/80"
                        fontSize={scaleFont(16, currentState.fontSize)}
                        fontFamily={currentState.fontFamily}
                        headerPosition="-top-[30px] -right-[50px]"
                        isVerticleHeader={true}
                        isDot={false}

                    />
                );
            case "Custom Section":
                return (
                    <AllCustomSection
                        secNewNames={secName}
                        data={section}
                        textColor=""
                        templateColor="#fff"
                        fontSize={scaleFont(16, currentState.fontSize)}
                        fontFamily={currentState.fontFamily}
                        iconSize={scaleFont(22, currentState.fontSize)}

                    />
                );
            default:
                return <p>{("")}</p>;
        }
    };
    // ===========
    const rightSideSections = ["Technical Skills", "Soft Skills", "Languages"];
    const leftSections = addedSections?.filter(
        (section: any) => !rightSideSections.includes(section?.name)
    );
    // ===========
    const rightSections = addedSections?.filter((section: any) =>
        rightSideSections.includes(section?.name)
    );
    // ===========
    const handleEditableSection = () => {
        setEditable(true);
        dispatch(sectionEditMode(true));
    };
    // ===========
    const handleEditableSectionHeader = () => {
        setHeaderEditable(true);
        dispatch(sectionEditMode(true));
    };
    // ===========
    const handleChangeHeader = (
        e: React.ChangeEvent<HTMLInputElement>,
        key: "name" | "designation"
    ) => {
        const value = e.target.value;
        setHeaderData((prev) => ({ ...prev, [key]: value }));
    };
    // ===========
    const sectionHeaderIcons: any = {
        FaExperience: <IoMdMail />,
        FaEducation: <LucideGraduationCap />,
        FaAwards: <FaAward />,
        FaCertificates: <FaAward />,
        FaReferences: <IoPeople />,
        FaSoftSkills: <GiSkills />,
        FaTechnicalSkills: <GiSkills />,
        FaLanguages: <LiaLanguageSolid />,
        FaSummary: <IoDocumentText />,
        FaProject: <GrProjects />,
        FaCustomSection: <BsSignIntersectionSide />,
    };
    // ===========
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setEditable(false);
                dispatch(sectionEditMode(false));
            }
            if (
                containerHeaderRef.current &&
                !containerHeaderRef.current.contains(event.target as Node)
            ) {
                setHeaderEditable(false);
                dispatch(sectionEditMode(false));
                dispatch(
                    addUserHeader({
                        sectionId: 1,
                        detail: headerData,
                    })
                );
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [editable, headerData]);
    //=========== rearrange
    useEffect(() => {
        dispatch(setList(rightSideSections));
        dispatch(setColumn(true));
    }, [addedSections]);
    // =========== Measure section heights
    useEffect(() => {
        dispatch(disableTemplateIcons(false))
        dispatch(disableTemplateProfile(false))
    }, []);
    // ===========
    useEffect(() => {
        setSecName("Custom Section");
    }, []);
    // ===========
    useEffect(() => {
        setTemplateBgColor(sectionBgColor);
    }, [editMode, sectionBgColor]);
    // ===========
    const [pages, setPages] = useState<any[][]>([]);
    useEffect(() => {
        paginateSections();
    }, [addedSections]);
    // ===========
    const paginateSections = () => {
        const tempPages = [];
        let currentPage: any[] = [];
        let currentHeight = 0;
        const PAGE_LIMIT = 1150;

        const tempDiv = document.createElement("div");
        tempDiv.style.width = "210mm";
        tempDiv.style.position = "absolute";
        tempDiv.style.visibility = "hidden";
        tempDiv.style.padding = "0";
        tempDiv.style.margin = "0";
        tempDiv.style.boxSizing = "border-box";
        document.body.appendChild(tempDiv);

        addedSections.forEach((section: { name: any; fields: any[]; }) => {
            let sectionHeight = 0;

            // Measure section name
            tempDiv.innerHTML = `<div class="p-2 text-base font-semibold">${section.name}</div>`;
            sectionHeight += tempDiv.offsetHeight + 80; // Add buffer for section name

            // Check if the section has fields and measure their height
            if (section.fields && Array.isArray(section.fields)) {
                section.fields.forEach((field) => {
                    tempDiv.innerHTML = `<div class="p-2">${field.content || ''}</div>`; // Adjust for the actual field structure
                    sectionHeight += tempDiv.offsetHeight + 10; // Add buffer for each field's height
                });
            }

            // Check if the section exceeds the page height limit
            if (currentHeight + sectionHeight > PAGE_LIMIT) {
                tempPages.push(currentPage);
                currentPage = [];
                currentHeight = 0;
            }

            currentPage.push(section);
            currentHeight += sectionHeight;
        });

        if (currentPage.length > 0) {
            tempPages.push(currentPage);
        }

        document.body.removeChild(tempDiv);
        setPages(tempPages); // Update pages with the new pagination
    };


    return (
        <div className="flex flex-col items-center gap-6">
            {pages.map((sectionGroup, pageIndex) => (
                <ResumePage key={pageIndex}>
                    <div className={`relative grid grid-cols-12 shadow-xl ${editMode ? "bg-transparent" : "bg-white"}`}>
                        {/*===== Left Column =====*/}
                        <div className="col-span-8" style={{ padding: "30px", paddingRight: "40px" }} >
                            {/*===== Header =====*/}
                            <div
                                ref={containerHeaderRef}
                                className={`flex flex-col ${headerEditable && "bg-white"}`}
                                onClick={handleEditableSectionHeader}
                            >
                                <input
                                    name="name"
                                    placeholder="Name"
                                    value={headerData.name}
                                    onChange={(e) => handleChangeHeader(e, "name")}
                                    className="outline-none bg-transparent font-semibold text-zinc-900"
                                    style={{
                                        fontSize: scaleFont(30, currentState.fontSize),
                                        fontFamily: currentState.fontFamily,
                                    }}
                                />
                                <input
                                    name="designation"
                                    value={headerData.designation}
                                    placeholder="Designation"
                                    onChange={(e) => handleChangeHeader(e, "designation")}
                                    className="w-full rounded bg-transparent placeholder:text-lg focus:outline-none focus:ring-0 focus:border-0"
                                    style={{
                                        fontSize: scaleFont(18, currentState.fontSize),
                                        fontFamily: currentState.fontFamily,
                                        color: currentState.color,
                                    }}
                                />
                            </div>

                            {/*===== Left Sections =====*/}
                            {sectionGroup
                                .filter((section) => !rightSideSections.includes(section.name))
                                .map((section, index) => (
                                    <div key={index} className="pt-4 relative">
                                        {renderSection(section)}
                                    </div>
                                ))
                            }
                            {/*===== WaterMark =====*/}
                            <Watermark />
                        </div>

                        {/*===== Right Column =====*/}
                        <div className="col-span-4 px-2 z-10" style={{ backgroundColor: currentState.color, minHeight: "297mm" }} >
                            {/*===== Profile Image =====*/}
                            <div className="p-3 py-12">
                                {showProfile && <TemplateProfileImg />
                                }
                                {/*===== Contact Info =====*/}
                                <div className="flex flex-col gap-2">
                                    <div
                                        className="text-start text-white flex items-center gap-2"
                                        style={{
                                            fontSize: scaleFont(24, currentState.fontSize),
                                            fontFamily: currentState.fontFamily,
                                        }}
                                    >
                                        {showIcons && <span><RiContactsBook3Fill /></span>}
                                        <span className="text-xl">Contact Info</span>
                                    </div>
                                    <hr className="-mt-1" />
                                    {[
                                        { name: "Phone", icon: <Phone size={16} /> },
                                        { name: "Email", icon: <Mail size={16} /> },
                                    ].map((placeholder, idx) => (
                                        <div key={idx} className="flex items-center gap-2  text-white">
                                            <div className="self-center  ">{placeholder.icon}</div>
                                            <input
                                                placeholder={placeholder.name}
                                                className="w-full  placeholder:opacity-70 text-sm placeholder-white outline-none   focus:bg-transparent bg-transparent"
                                            />
                                        </div>
                                    ))}
                                    <div className="flex items-start gap-2 text-white">
                                        <BookUser
                                            size={16}
                                            className=" self-center "
                                        />
                                        <input
                                            placeholder="Address"
                                            className="w-full placeholder:opacity-70 text-sm placeholder-white outline-none focus:bg-transparent bg-transparent"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/*===== Right Sections =====*/}
                            {sectionGroup
                                .filter((section) => rightSideSections.includes(section.name))
                                .map((section, index) => (
                                    <div key={index} className="pt-4">
                                        {renderSection(section)}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </ResumePage>
            ))}
        </div>
    );
}
