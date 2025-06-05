"use client";
// ============
import React, { useEffect, useRef, useState } from "react";
// ============
import { useDispatch, useSelector } from "react-redux";
import { setColumn, setList } from "@/redux/slices/rearrangeSlice";
import { addUserHeader, hideTemplateIcons, hideTemplateProfile, sectionEditMode, sectionShowIcons, sectionShowProfile } from "@/redux/slices/addSectionSlice";
// ============
import { BookUser, Mail, Phone } from "lucide-react";
// ============
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
import AllCustomSection from "../all-sections/sections-details/AllCustomSections";
import Watermark from "@/components/common/watermark/watermark";
import TemplateProfileImg from "@/components/profileImg/TemplateProfileImg";
import { FaSchool } from "react-icons/fa";
import { GrUserExpert } from "react-icons/gr";
import { GrProjects } from "react-icons/gr";
import { GiSkills } from "react-icons/gi";
import { PiCertificateBold } from "react-icons/pi";
import { LiaAwardSolid } from "react-icons/lia";
import { HiMiniLanguage } from "react-icons/hi2";
import { VscReferences } from "react-icons/vsc";
import { MdOutlineSummarize } from "react-icons/md";
import { BsSignIntersectionSide } from "react-icons/bs";

const A4_HEIGHT_PX = 1122;

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
  scaleFont: any;
  highlightChange: any;
};

const Template1 = ({ currentState, scaleFont, highlightChange }: ResumePreviewProps) => {
  const dispatch = useDispatch();
  const { addedSections, sectionBgColor, editMode, showProfile, showIcons } = useSelector(
    (state: any) => state.addSection
  );
  const [secName, setSecName] = useState("");
  const [templateBgColor, setTemplateBgColor] = useState<any>("");
  const [editable, setEditable] = useState<boolean>(false);
  const [headerEditable, setHeaderEditable] = useState<boolean>(false);
  const containerHeaderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [headerData, setHeaderData] = useState({ name: "", designation: "" });
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [measured, setMeasured] = useState(false);
  const [pages, setPages] = useState<any[][]>([]);

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
          highlightText={highlightChange}
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
            highlightText={highlightChange}
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
            highlightText={highlightChange}
          />
        );
      case "Certificate":
        return <AllCertificates data={section}
          fontSize={scaleFont(16, currentState.fontSize)}
          fontFamily={currentState.fontFamily}
          highlightText={highlightChange}
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
            highlightText={highlightChange}
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
            highlightText={highlightChange}
          />
        );
      case "Projects":
        return (
          <AllProjects
            data={section}
            textColor=""
            textAltColor=""
            templateColor=""
            highlightText={highlightChange}
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
            highlightText={highlightChange}
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
            highlightText={highlightChange}
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
            highlightText={highlightChange}
          />
        );
      default:
        return <p>{highlightChange(section?.content || "")}</p>;
    }
  };

  const rightSideSections = ["Technical Skills", "Soft Skills", "Languages"];
  const leftSections = addedSections?.filter(
    (section: any) => !rightSideSections.includes(section?.name)
  );

  const rightSections = addedSections?.filter((section: any) =>
    rightSideSections.includes(section?.name)
  );

  const handleEditableSection = () => {
    setEditable(true);
    dispatch(sectionEditMode(true));
  };

  const handleEditableSectionHeader = () => {
    setHeaderEditable(true);
    dispatch(sectionEditMode(true));
  };

  const handleChangeHeader = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "name" | "designation"
  ) => {
    const value = e.target.value;
    setHeaderData((prev) => ({ ...prev, [key]: value }));
  };
  const sectionHeaderIcons: any = {
    FaEducation: <FaSchool />,
    FaExperience: <GrUserExpert />,
    FaProject: <GrProjects />,
    FaSoftSkills: <GiSkills />,
    FaTechnicalSkills: <GiSkills />,
    FaCertificates: <PiCertificateBold />,
    FaAwards: <LiaAwardSolid />,
    FaLanguages: <HiMiniLanguage />,
    FaReferences: <VscReferences />,
    FaCustomSection: <BsSignIntersectionSide />,
    FaSummary: <MdOutlineSummarize />,
  };
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

  // rearrange
  useEffect(() => {
    dispatch(setList(rightSideSections));
    dispatch(setColumn(true));
  }, [addedSections]);

  // Step 1: Measure section heights
  useEffect(() => {
    if (measured) return;

    const heights = sectionRefs.current.map((el) =>
      el ? el.getBoundingClientRect().height : 0
    );

    const newPages: any[][] = [];
    let currentPage: any[] = [];
    let currentHeight = 0;

    leftSections.forEach((section: any, i: any) => {
      const height = heights[i];
      if (currentHeight + height > A4_HEIGHT_PX && currentPage.length > 0) {
        newPages.push(currentPage);
        currentPage = [section];
        currentHeight = height;
      } else {
        currentPage.push(section);
        currentHeight += height;
      }
    });

    if (currentPage.length > 0) newPages.push(currentPage);

    setPages(newPages);
    setMeasured(true);
  }, [leftSections, measured]);
  console.log(pages)

  useEffect(() => {
    dispatch(hideTemplateIcons(false))
    dispatch(hideTemplateProfile(false))
  }, [showProfile, showIcons]);

  useEffect(() => {
    setSecName("Custom Section");
  }, []);

  // ===================
  useEffect(() => {
    setTemplateBgColor(sectionBgColor);
  }, [editMode, sectionBgColor]);

  return (
    <div
      className="resume-container"
      id="resume-content"
      style={{
        padding: `${currentState.padding || 0}px`,
        backgroundColor: editMode ? templateBgColor : undefined,
        transition: "background-color 0.3s ease-in-out",
      }}
    >

      <div style={{ minHeight: "297mm", width: "235mm" }} className="relative grid grid-cols-12 shadow-xl ">
        {/* Left Column */}
        <div className="col-span-8" style={{ padding: "30px", paddingRight: "40px" }} >
          {/* Header */}
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

          {/* Left Sections */}
          {leftSections?.length > 0 ? (
            leftSections.map((section: any, index: number) => (
              <div key={index} className="pt-4 relative section-to-break">
                <div className="border-b">
                  {section?.name === "Custom Section" ? (
                    <div
                      ref={containerRef}
                      className={`flex flex-col ${editable && "bg-white"}`}
                      onClick={handleEditableSection}
                    >
                      <input
                        type="text"
                        className="text-lg bg-transparent focus:outline-none font-semibold mb-1"
                        style={{ color: currentState.color }}
                        value={secName}
                        onChange={(e) =>
                          HandleChangeSectionName(e.target.value)
                        }
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      {showIcons ? sectionHeaderIcons[section.icon] ?? "No Icon" : ""}
                      <h2
                        className="text-lg font-semibold "
                        style={{ color: currentState.color }}
                        dangerouslySetInnerHTML={{
                          __html: highlightChange(section?.newSecName || section?.name),
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="">{renderSection(section)}</div>
              </div>
            ))
          ) : (
            <p>No sections added yet.</p>
          )}
          <Watermark />
          {/* {loading && (
            <p className="text-gray-500 mt-4">
              Checking for spelling/grammar errors...
            </p>
          )} */}
        </div>

        {/* Right Column */}
        <div
          className="col-span-4 px-2  z-10"
          style={{ backgroundColor: currentState.color, minHeight: "297mm" }}
        >
          {/* Profile Image */}
          <div className="p-3 py-12">
            {showProfile && <TemplateProfileImg
            // bgColor={currentState.color}
            />
            }
            {/* Contact Info */}
            <div className="flex flex-col gap-2">
              <div
                className="text-start text-white flex items-center gap-2"
                style={{
                  fontSize: scaleFont(24, currentState.fontSize),
                  fontFamily: currentState.fontFamily,
                }}
              >
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

          {/* Right Sections */}
          <div className="p-3">
            {rightSections?.length > 0 &&
              rightSections.map((section: any, index: number) => (
                <div key={index} className="pt-4 relative section-to-break">
                  <div className="border-b text-white">
                    {section?.name === "Custom Section" ? (
                      <div
                        ref={containerRef}
                        className={`flex flex-col pt-2 ${editable && "bg-white"
                          }`}
                        onClick={handleEditableSection}
                      >
                        <input
                          type="text"
                          className="text-lg bg-transparent focus:outline-none font-semibold mb-1"
                          style={{ color: currentState.color }}
                          value={secName}
                          onChange={(e) =>
                            HandleChangeSectionName(e.target.value)
                          }
                        />
                      </div>
                    ) : (

                      <div className="flex items-center gap-1">
                        {showIcons ? sectionHeaderIcons[section.icon] ?? "No Icon" : ""}
                        <h2 className="text-lg font-semibold mb-1"
                          dangerouslySetInnerHTML={{
                            __html: highlightChange(section?.newSecName || section?.name),
                          }}
                        />
                      </div>
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
