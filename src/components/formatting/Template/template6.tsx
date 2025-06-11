"use client";
// ============
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
// ============
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setProfileImage } from "@/redux/slices/profileImageSlice";
import { setColumn, setList } from "@/redux/slices/rearrangeSlice";
import { addUserHeader, disableTemplateIcons, disableTemplateProfile, sectionEditMode, sectionShowIcons, sectionShowProfile } from "@/redux/slices/addSectionSlice";
// ============
import { BookUser, Mail, Phone } from "lucide-react";
// ============
import placeHolderImg from "media/assets/reusme_placeholder_image.webp";
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
import { placeHolderImage } from "@/constant/placeholder-image-base64";
import EditableField from "@/components/editor/editable-field";
import TemplateProfileImg from "@/components/profileImg/TemplateProfileImg";

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
  incorrectTextChange: any;
  enableSpellCorrection: boolean;
  popupRef2: any
};

const Template6 = ({ currentState, scaleFont, incorrectTextChange, enableSpellCorrection, popupRef2 }: ResumePreviewProps) => {
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

      case "Soft Skills":
        return (
          <AllSoftSkills
            data={section}
            textColor=""
            textAltColor="#000"
            templateColor="#000"
            dotPosition="hidden"
            headerPosition="-top-[30px] -left-[50px]"
            isVerticleHeader={true}
            isDot={false}
            highlightText={incorrectTextChange}
          />
        );
      case "Technical Skills":
        return (
          <AllTechnicalSkills
            data={section}
            textColor=""
            textAltColor="#000"
            templateColor="#000"
            dotPosition="hidden"
            headerPosition="-top-[30px] -left-[50px]"
            isVerticleHeader={true}
            isDot={false}
            highlightText={incorrectTextChange}
          />
        );
      case "Certificate":
        return <AllCertificates data={section}
          fontSize={scaleFont(16, currentState.fontSize)}
          fontFamily={currentState.fontFamily}
          headerPosition="top-[30px] -left-[50px]"
          textEditorPosition='top-1 right-0'
          isVerticleHeader={true}
          isDot={false}
          highlightText={incorrectTextChange}
        />;
      case "Education":
        return (
          <AllEducations
            data={section}
            textColor=""
            textAltColor={currentState?.color}
            dateColor="#B1B7C1"
            templateColor=""
            fontSize={scaleFont(16, currentState.fontSize)}
            fontFamily={currentState.fontFamily}
            term2={true}
            headerPosition="top-[20px] -left-[50px]"
            textEditorPosition='top-1 right-0'
            isVerticleHeader={true}
            isDot={false}
            highlightText={incorrectTextChange}
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
            term2={true}
            headerPosition="top-[30px] -left-[50px]"
            textEditorPosition='top-1 right-0'
            isVerticleHeader={true}
            isDot={false}
            highlightText={incorrectTextChange}
            popupRef2={popupRef2}
          />
        );
      case "Summary":
        return <AllSummary
          data={section}
          fontSize={scaleFont(16, currentState.fontSize)}
          fontFamily={currentState.fontFamily}
          highlightText={incorrectTextChange}
          enableSpellCorrection={enableSpellCorrection}
          popupRef2={popupRef2}
        />;
      case "Projects":
        return (
          <AllProjects
            data={section}
            textColor=""
            textAltColor=""
            templateColor=""
            term2={true}
            headerPosition="top-[30px] -left-[50px]"
            textEditorPosition='top-1 right-0'
            isVerticleHeader={true}
            isDot={false}
            highlightText={incorrectTextChange}
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
            headerPosition="top-[30px] -left-[50px]"
            textEditorPosition='top-1 right-0'
            isVerticleHeader={true}
            isDot={false}
            highlightText={incorrectTextChange}
          />
        );
      case "References":
        return (
          <AllReferences
            data={section}
            textColor="#000"
            templateColor={currentState.color}
            textAltColor={currentState.color}
            headerPosition="top-[30px] -left-[50px]"
            textEditorPosition='top-1 right-0'
            isVerticleHeader={true}
            isDot={false}
          />
        );
      case "Languages":
        return (
          <AllLanguages
            data={section}
            textColor="#000"
            templateColor="#3358c5"
            // editableAltBG="bg-gray-900/80"
            fontSize={scaleFont(16, currentState.fontSize)}
            fontFamily={currentState.fontFamily}
            headerPosition="-top-[30px] -left-[50px]"
            isVerticleHeader={true}
            isDot={false}
            highlightText={incorrectTextChange}
          />
        );
      case "Custom Section":
        return (
          <AllCustomSection
            secNewNames={secName}
            data={section}
            textColor="#000"
            templateColor="#fff"
            fontSize={scaleFont(16, currentState.fontSize)}
            fontFamily={currentState.fontFamily}
            iconSize={scaleFont(22, currentState.fontSize)}
            headerPosition="top-[30px] -left-[50px]"
            textEditorPosition='top-1 right-0'
            isVerticleHeader={true}
            isDot={false}
            highlightText={incorrectTextChange}
          />
        );
      default:
        return <p>{incorrectTextChange(section?.content || "")}</p>;
    }
  };

  const rightSideSections = ["Summary", "Certificate", "References", "Awards", "Custom Section"];
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
    value: string,
    key: "name" | "designation"
  ) => {
    setHeaderData((prev) => ({ ...prev, [key]: value }));
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
    dispatch(disableTemplateIcons(true))
    dispatch(sectionShowProfile(true))
    dispatch(disableTemplateProfile(true))
  }, []);

  useEffect(() => {
    setSecName("Custom Section");
  }, []);


  // ===================
  useEffect(() => {
    setTemplateBgColor(sectionBgColor);
  }, [editMode, sectionBgColor]);

  console.log(showProfile, showIcons, "Temp2 showProfile, showIcons");

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

      <div style={{ minHeight: "297mm", width: "210mm" }} className="relative  shadow-xl p-[30px]">
        <div className="grid grid-cols-12">
          {/* Header Left Column */}
          <div className="col-span-8 " style={{ padding: "15px 0px" }}>
            <div
              ref={containerHeaderRef}
              className={`flex flex-col ${headerEditable && "bg-white"}`}
              onClick={handleEditableSectionHeader}
            >
              <EditableField
                html={headerData.name}
                onChange={(value) => handleChangeHeader(value, "name")}
                placeholder="Name"
                style={{
                  fontSize: scaleFont(25, currentState.fontSize),
                  fontFamily: currentState.fontFamily,
                }}
                className="bg-transparent text-black"
              />
              <EditableField
                html={headerData.designation}
                onChange={(value) => handleChangeHeader(value, "designation")}
                placeholder="designation"
                style={{
                  fontSize: scaleFont(18, currentState.fontSize),
                  fontFamily: currentState.fontFamily,
                  color: currentState?.color

                }}
                className="bg-transparent "
              />
              <div className="flex flex-wrap gap-y-2 pt-2" style={{

              }}>
                {[
                  { name: "Phone", icon: <Phone size={16} color={currentState.color} /> },
                  { name: "Email", icon: <Mail size={16} color={currentState.color} /> },
                ].map((placeholder, idx) => (
                  <div key={idx} className="flex items-center gap-2  text-black w-[50%]">
                    <div className="self-center  ">{placeholder.icon}</div>
                    <input
                      placeholder={placeholder.name}
                      className="w-full  placeholder:opacity-70 text-sm placeholder-black outline-none   focus:bg-transparent bg-transparent"
                    />
                  </div>
                ))}
                <div className="flex items-start gap-2 text-black w-full ">
                  <BookUser
                    size={16}
                    className=" self-center "
                    color={currentState.color}
                  />
                  <input
                    placeholder="Address"
                    className="w-full placeholder:opacity-70 text-sm placeholder-black outline-none focus:bg-transparent bg-transparent"
                  />
                </div>
              </div>
            </div>


          </div>

          {/* Header Right Column */}
          <div className="col-span-4 ">
            {/* Profile Image */}
            <div className="px-3  ">

              {showProfile && <TemplateProfileImg
              />}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="col-span-6 ">
            {/* Left Sections */}
            {leftSections?.length > 0 ? (
              leftSections.map((section: any, index: number) => (
                <div key={index} className="pt-4 relative section-to-break">
                  <div className="border-b">
                    {section?.name === "Custom Section" ? (
                      <div
                        ref={containerRef}
                        className={`flex flex-col pt-2 ${editable && "bg-white"}`}
                        onClick={handleEditableSection}
                      >
                        <input
                          type="text"
                          className="text-lg bg-transparent focus:outline-none font-semibold mb-1"
                          // style={{ color: currentState.color }}
                          value={secName}
                          onChange={(e) =>
                            HandleChangeSectionName(e.target.value)
                          }
                        />
                      </div>
                    ) : (
                      <h2
                        className="text-lg font-semibold "
                        dangerouslySetInnerHTML={{
                          __html: incorrectTextChange(section?.newSecName || section?.name),
                        }}
                      />
                    )}
                  </div>
                  <div className="">{renderSection(section)}</div>
                </div>
              ))
            ) : (
              <p>No sections added yet.</p>
            )}
            <Watermark />
          </div>
          {/* Right Column */}
          <div className="col-span-6 ">
            {/* Right Sections */}
            {rightSections?.length > 0 &&
              rightSections.map((section: any, index: number) => (
                <div key={index} className="pt-4 relative section-to-break">
                  <div className="border-b">
                    {section?.name === "Custom Section" ? (
                      <div
                        ref={containerRef}
                        className={`flex flex-col pt-2 ${editable && "bg-white"}`}
                        onClick={handleEditableSection}
                      >
                        <input
                          type="text"
                          className="text-lg bg-transparent focus:outline-none font-semibold mb-1"
                          // style={{ color: currentState.color }}
                          value={secName}
                          onChange={(e) =>
                            HandleChangeSectionName(e.target.value)
                          }
                        />
                      </div>
                    ) : (
                      <h2
                        className="text-lg font-semibold "
                        dangerouslySetInnerHTML={{
                          __html: incorrectTextChange(section?.newSecName || section?.name),
                        }} />
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

export default Template6;
