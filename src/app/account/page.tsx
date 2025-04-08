"use client";
import React, { useEffect, useRef, useState } from "react";
import { PiPencilBold } from "react-icons/pi";
import profileImg from "media/assets/reusme_placeholder_image.webp";
import Image from "next/image";
import { FaPencil } from "react-icons/fa6";
import Link from "next/link";
import { HiClipboardCheck, HiOutlineMail } from "react-icons/hi";
import UserReferral from "@/components/userReferral/UserReferral";
import { FiPhone } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import SunEditor from "suneditor-react";
import AppButton from "@/components/common/button/CustomButton";
import {
  userAwards,
  userCertificates,
  userEducation,
  userExperiences,
  userLanguages,
  userProfile,
  userReferences,
  userSoftSkills,
  userTechnicalSkills,
} from "@/redux/slices/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AiIcon } from "@/constant/icon";
import CustomSelect from "@/components/common/customSelect/CustomSelect";
import { Controller, useForm } from "react-hook-form";
import MultiInputField from "@/components/common/multiInputField/MultiInputField";
import ProfileSection from "@/components/profile/profileSection/profileSection";

export default function Account() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    profile,
    education,
    awards,
    certificates,
    experiences,
    languages,
    references,
  } = useSelector((state: RootState) => state.profile);
  const { token } = useSelector((state: RootState) => state.auth);
  const [modelbox, setModelbox] = useState<boolean>(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const modalRef = useRef<any>(null);

  const handleUserImageChange = (e: any) => {
    // const file = e.target.files[0];
    // if (file) {
    //   setImageToCrop(URL.createObjectURL(file)); // Show image in the crop modal
    //   setCropModalVisible(true);
    // }
  };

  useEffect(() => {
    if (token) {
      dispatch(userProfile());
      dispatch(userExperiences());
      dispatch(userEducation());
      dispatch(userTechnicalSkills());
      dispatch(userSoftSkills());
      dispatch(userCertificates());
      dispatch(userAwards());
      dispatch(userReferences());
      dispatch(userLanguages());
    } else {
      return;
    }
  }, [dispatch]);

  const userDetails = [
    { label: "Name", value: profile?.name ?? "--" },
    { label: "Job Position", value: profile?.job_position ?? "--" },
    { label: "Years of Experience", value: profile?.experiences_count ?? "--" },
    { label: "Mobile Number", value: profile?.mobile_number ?? "--" },
    { label: "Contact Number", value: profile?.contact ?? "--" },
    {
      label: "Website / Linkedin URL",
      value: profile?.website ?? "https://siraj.hassni.me",
    },
    { label: "Country", value: profile?.country?.name ?? "--" },
    { label: "State", value: profile?.country?.state ?? "--" },
    { label: "City", value: profile?.country?.city ?? "--" },
    { label: "Street Address", value: profile?.address ?? "--" },
    { label: "Postal Code", value: profile?.postal_code ?? "--" },
  ];

  const sections = [
    {
      title: "Summary",
      content: profile?.details?.summary ?? "--",
    },
    {
      title: "Technical Skills",
      items: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "Node.js"],
    },
    {
      title: "Soft Skills",
      items: ["Communication", "Problem Solving", "Teamwork", "Adaptability"],
    },
    {
      title: "Email",
      content: profile?.email ?? "--",
      isEdit: false,
    },
    {
      title: "Password",
      content: "*******",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: any | never) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModelbox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const tokenExist = Cookies.get("userToken");
    if (!tokenExist) {
      router.push("/login");
    }
  }, []);

  const { control } = useForm();

  const [optionsData, setOptionsData] = useState<any>([
    { id: "1", name: "1-2 years" },
    { id: "2", name: "3-5 years" },
    { id: "3", name: "6-10 years" },
    { id: "4", name: "10+ years" },
  ]);

  const data = {
    body: "React,,Node.js,,MongoDB,,Next.js,,Tailwind CSS,,TypeScript",
  };

  return (
    <>
      <section className="relative container md:px-4 mx-auto">
        <div className="lg:grid lg:grid-cols-[25%,48%,25%] xl:grid-cols-[25%,55%,20%] my-4">
          <div className="">
            <div>
              {/* if userimageUpdated */}
              <div className="relative w-36 h-36 m-auto rounded-full">
                <Image
                  src={profileImg}
                  alt="Profile"
                  className="w-36 h-36 rounded-full m-auto"
                />
                <div
                  className="absolute bottom-0.5 right-1.5 cursor-pointer"
                  // onClick={() =>
                  //   document.getElementById("user_profile_image").click()
                  // }
                >
                  <PiPencilBold className="bg-white rounded-full text-3xl p-1 hover:bg-primaryBlue hover:text-white" />
                </div>
              </div>
              {/* else */}
              {/* <div className="relative w-40 h-40 m-auto rounded-full">
                    <img
                      src={updatedUserImage}
                      alt="Profile"
                      className="w-40 h-40 rounded-full m-auto"
                    />
                    <div
                      className="absolute bottom-0.5 right-1.5 cursor-pointer"
                      onClick={() =>
                        document.getElementById("user_profile_image").click()
                      }
                    >
                      <PiPencilBold className="bg-white rounded-full text-3xl p-1 hover:bg-primaryBlue hover:text-white" />
                    </div>
                  </div> */}
              <input
                type="file"
                onChange={handleUserImageChange}
                className="hidden"
                accept=".png,.jpg,.jpeg"
                id="user_profile_image"
              />

              <h2 className="text-primaryBlue text-2xl font-bold font-Lexend text-center mt-8 capitalize">
                {profile?.name ?? "--"}
              </h2>
              <div className="font-Lexend text-sm text-center text-secondaryGray  ">
                Customer ID :{" "}
                <span>
                  <b className="text-primaryBlue">{profile?.id ?? "--"}</b>
                </span>
              </div>

              {/* {cropModalVisible && (
                  <CropImageModal
                    image={imageToCrop}
                    onCrop={handleCrop}
                    onClose={() => setCropModalVisible(false)}
                  />
                )} */}

              <p className="text-[#343434] text-lg font-Lexend font-bold text-center mt-4">
                Your Job Title
              </p>
              <div className="divide-y-[0.5px]">
                {sections.map((section: any, index: any) => (
                  <div key={index} className="py-4 mx-4 font-Lexend">
                    <div className="flex justify-between items-center text-[#A7A7A7] mb-2">
                      {section.title}:
                      <FaPencil
                        className={`text-[#A7A7A7] hover:text-[#1877F2] cursor-pointer ${
                          section.isEdit === false ? "hidden" : "block"
                        }`}
                        onClick={() => {
                          setModelbox(true);
                          setSelectedSection(section?.title);
                        }}
                      />
                    </div>
                    <div>
                      {section?.items ? (
                        <div className="text-[#343434] flex justify-start gap-2 flex-wrap text-sm">
                          {section.items.map((item: any, idx: any) => (
                            <div key={idx} className="relative group">
                              <p className="bg-[#F5F6FB] border-[#DFE0E2] px-4 py-1 border rounded-full max-w-[180px] truncate cursor-pointer">
                                {item}
                              </p>
                              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap shadow-md">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[#343434] text-sm break-all cursor-pointer">
                          {section.content}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="px-5 xl:px-16  divide-y-[0.5px]">
            <div className="py-4 ">
              <div className="font-Lexend text-[#0072b1] text-lg font-bold mb-2">
                Basic Details:
              </div>
              <div className="flex flex-wrap items-center justify-between">
                {userDetails.map((detail, index) => (
                  <div key={index} className="mb-4 w-[50%] sm:w-[30%]">
                    <label className="font-Lexend text-[#A7A7A7]">
                      {detail.label}
                    </label>
                    <p className="text-[#343434] text-sm">{detail.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <ProfileSection
              sectionName="experiences"
              sectionType={experiences}
            />
            <ProfileSection sectionName="education" sectionType={education} />
            <ProfileSection
              sectionName="certificates"
              sectionType={certificates}
            />
            <ProfileSection sectionName="awards" sectionType={awards} />
            <ProfileSection sectionName="languages" sectionType={languages} />
            <ProfileSection sectionName="references" sectionType={references} />
          </div>
          <div className="mt-4  px-5 xl:px-0">
            <>
              <p className="font-Lexend text-4xl font-bold text-[#1877F2]">
                {70}%
              </p>
              <p className="font-Lexend text-md  text-[#343434]  mt-4">
                Complete Your Profile
              </p>
              <div className="w-full bg-[#DFE0E2] mt-2 rounded-full">
                <p
                  style={{ width: 70 + "%" }}
                  className=" bg-[#1877F2] h-1 rounded-full"
                ></p>
              </div>

              <div className="font-Lexend text-md text-center text-[#A7A7A7]  mt-10">
                <div className="mb-2">Download Your Resume</div>

                <button
                  // onClick={downloadCV}
                  className="bg-[#1877F2] hover:bg-[#343434] font-Lexend text-sm text-center text-white rounded-full px-4 py-1"
                >
                  Download CV
                </button>
              </div>

              <div className="font-Lexend text-md text-center text-[#A7A7A7]  mt-10">
                <div className="mb-2">Parse Your Resume</div>
                <Link
                  href={"/import-resume"}
                  className="bg-[#1877F2] hover:bg-[#343434] font-Lexend text-sm text-center text-white rounded-full px-4 py-1"
                >
                  Import CV
                </Link>
              </div>
            </>

            <p className="font-Lexend text-md  text-[#A7A7A7]  mt-8">
              Referral Link
            </p>
            <div className="text-[#343434] text-sm font-Lexend  mt-2">
              <div>
                <span className="text-muted flex flex-wrap justify-between items-center">
                  <div
                    className=" font-Lexend text-md  text-[#343434] flex items-center "
                    // ref={divRef}
                    style={{ overflowWrap: "anywhere" }}
                  >
                    <span className="max-w-[270px] truncate">
                      https://aiproresume.com/register/cjhzxgcjccgjgcjhcjh
                    </span>

                    <button className="mr_heading btn_copy">
                      <HiClipboardCheck className="shareiconmy" size={20} />
                    </button>
                  </div>
                  <div className="flex justify-center items-center w-full gap-4 mt-4">
                    {/* facebook gogle whatsapp */}
                  </div>
                </span>
              </div>
            </div>

            <UserReferral />

            <div className="mt-10 flex flex-col gap-2">
              <div>
                <h1 className="font-Lexend text-md  text-[#A7A7A7]">
                  Subscription
                </h1>
              </div>
              <div className="flex flex-col gap-2">
                <div className="sm:grid sm:grid-cols-[30%,70%] items-center   w-full">
                  <div>
                    <h1 className="font-Lexend text-sm  text-[#343434]">
                      Package
                    </h1>
                  </div>
                  <div className="pl-4">
                    <span className="font-Lexend text-sm font-bold text-[#343434]">
                      Premium
                    </span>
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-[30%,70%] items-center   w-full">
                  <div>
                    <h1 className="font-Lexend text-sm  text-[#343434]">
                      Registration
                    </h1>
                  </div>
                  <div className="pl-4">
                    <span className="font-Lexend text-sm font-bold  text-[#343434]">
                      January 23, 2025
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-start items-start w-full mt-4">
              <input
                type="checkbox"
                className="text-sm mr-2 mt-[6px]  border-solid border-[#0072b1] text-[#0072b1]"
              />
              <p className="ml-1 font-Lexend text-sm text-[#343434]">
                Do you want to share your resume with companies for global job
                opportunities?
              </p>
            </div>
            <div className="mt-10">
              <div className="pb-6">
                <div className="flex flex-col gap-2">
                  <h1 className="font-Lexend text-md  text-[#A7A7A7]">
                    NEED HELP OR WANT TO CHANGE YOUR SUBSCRIPTION ?
                  </h1>
                  <span className="font-Lexend text-sm font-bold text-[#343434] flex items-center">
                    <FiPhone className="mr-4" /> +1 (438) 883-8289
                  </span>
                  <Link
                    href=""
                    className="font-Lexend text-sm font-bold text-[#343434] hover:text-[#1877F2] flex items-center"
                  >
                    <HiOutlineMail className="mr-4" />{" "}
                    marketing.cognitiveit@gmail.com
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {modelbox && (
        <div className="bg-[rgba(0,0,0,0.5)] flex justify-center items-center fixed top-0 left-0 w-full h-full z-[9999]">
          <div
            className="bg-white w-[95%] lg:w-[50%] 2xl:w-[60%] font-Lexend flex flex-col rounded-lg border-[0.9px] shadow-lg border-primaryBlue/60"
            ref={modalRef}
          >
            <div className="flex w-full px-8 py-5 justify-between border-b border-primaryBlue/60">
              {selectedSection} <CgClose onClick={() => setModelbox(false)} />
            </div>
            {/* <div className="p-6">
              {sections?.find((section) => section?.title === selectedSection)?.content ||
                sections
                  .find((section) => section?.title === selectedSection)
                  ?.items?.map((item, index) => <p key={index}>{item}</p>)}
            </div> */}

            {selectedSection === "Summary" && (
              <div className="flex w-full px-8 py-5 justify-between">
                <div className="w-full">
                  <div className="relative">
                    <SunEditor
                      setOptions={{
                        height: "500px",
                        placeholder: "Enter the job description here...",
                        buttonList: [
                          ["bold", "underline", "italic", "strike"],
                          ["list"],
                        ],
                        maxCharCount: 1000,
                        resizeEnable: false,
                      }}
                      defaultValue={sections[0].content}
                    />
                    <div
                      className="absolute top-2 right-2 z-20 flex items-center gap-2 bg-primaryGreen px-2 py-1.5 rounded-md !m-0 cursor-pointer"
                      // onClick={() => setAiModal(true)}
                    >
                      <AiIcon />
                    </div>
                  </div>
                  <div className="w-full flex justify-end mb-2 mt-4">
                    <AppButton
                      title="Save"
                      width="w-[130px]"
                      border="rounded-sm"
                      padding="py-1 px-6"
                    />
                  </div>
                </div>
              </div>
            )}
            {selectedSection === "Technical Skills" && (
              <div className="flex w-full px-8 py-5 justify-between">
                <div className="w-full">
                  <div className="grid grid-cols-[50%,50%]  gap-4 divide-x-2 min-h-[220px]">
                    <div className="px-5 ">
                      <form>
                        <Controller
                          name="Job_Title"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <CustomSelect
                              {...field}
                              options={optionsData}
                              label="Job Title"
                              className="w-full"
                            />
                          )}
                        />
                      </form>
                    </div>
                    <div className="px-8 ">
                      <form className="">
                        <Controller
                          name="Job_Title"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <MultiInputField
                              {...field}
                              control={control}
                              name="Search Here"
                              placeholder="search here..."
                              type="text"
                              rules={{ required: "Full Name is required" }}
                            />
                          )}
                        />

                        <div className="text-[#343434] flex justify-start gap-2 flex-wrap text-sm">
                          {data
                            ? data?.body?.split(",,").map((part, index) => (
                                <p
                                  className="bg-[#F5F6FB] border-[#DFE0E2] px-4 py-1 border rounded-full"
                                  key={index}
                                >
                                  {part.trim()}
                                </p> // Wrapping each part with a <p> tag
                              ))
                            : "No Skills Found"}
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="w-full flex justify-end mb-2 mt-4">
                    <AppButton
                      title="Save"
                      width="w-[130px]"
                      border="rounded-sm"
                      padding="py-1 px-6"
                    />
                  </div>
                </div>
              </div>
            )}
            {selectedSection === "Soft Skills" && (
              <div className="flex w-full px-8 py-5 justify-between">
                <div className="w-full">
                  <div className="grid grid-cols-[50%,50%]  gap-4 divide-x-2 min-h-[220px]">
                    <div className="px-5 ">
                      <form>
                        <Controller
                          name="Job_Title"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <CustomSelect
                              {...field}
                              options={optionsData}
                              label="Job Title"
                              className="w-full"
                            />
                          )}
                        />
                      </form>
                    </div>
                    <div className="px-8 ">
                      <form className="">
                        <Controller
                          name="Job_Title"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <MultiInputField
                              {...field}
                              control={control}
                              name="Search Here"
                              placeholder="search here..."
                              type="text"
                              rules={{ required: "Full Name is required" }}
                            />
                          )}
                        />

                        <div className="text-[#343434] flex justify-start gap-2 flex-wrap text-sm">
                          {data
                            ? data?.body?.split(",,").map((part, index) => (
                                <p
                                  className="bg-[#F5F6FB] border-[#DFE0E2] px-4 py-1 border rounded-full"
                                  key={index}
                                >
                                  {part.trim()}
                                </p> // Wrapping each part with a <p> tag
                              ))
                            : "No Skills Found"}
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="w-full flex justify-end mb-2 mt-4">
                    <AppButton
                      title="Save"
                      width="w-[130px]"
                      border="rounded-sm"
                      padding="py-1 px-6"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
