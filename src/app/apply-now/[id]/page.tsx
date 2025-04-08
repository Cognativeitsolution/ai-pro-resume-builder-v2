"use client";

import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Controller, useForm } from "react-hook-form";
import { BiLoaderAlt } from "react-icons/bi";
import { MdOutlineSimCardDownload } from "react-icons/md";
import CustomPhoneNumber from "@/components/common/customSelect/CustomPhoneNumber";
import AppInputField from "@/components/common/inpufield/CustomInputField";
import CustomSelect from "@/components/common/customSelect/CustomSelect";
import MainBanner from "@/components/Banner/mainBanner";
import { ApplyNowBannerData } from "./data";

const ApplyNow = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState<any>(false);
  const [isProcessing, setIsProcessing] = useState<any>(false);
  const [captchaError, setCaptchaError] = useState<any>("");
  const [verified, setVerified] = useState<any>(false);

  const [experienceData, setExperienceData] = useState<any>([
    { id: "1", name: "1-2 years" },
    { id: "2", name: "3-5 years" },
    { id: "3", name: "6-10 years" },
    { id: "4", name: "10+ years" },
  ]);

  const [degreeData, setDegreeData] = useState<any>([
    { id: "1", name: "High School Diploma" },
    { id: "2", name: "Associate Degree" },
    { id: "3", name: "Bachelor's Degree" },
    { id: "4", name: "Master's Degree" },
    { id: "5", name: "Ph.D." },
  ]);
  console.log(verified);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const SubmitApplyForm = (data: any) => {
    console.log("Form Submitted:", data);
  };

  const handleCheckCaptcha = (val: string | null) => {
    setVerified(true);
    setCaptchaError("");
  };

  // Reset the reCAPTCHA value after a certain time
  const resetRecaptchaValue = () => {
    setVerified(false);
  };

  // Set a timeout to reset the reCAPTCHA value after 5 minutes (adjust as needed)
  const TIMEOUT_DURATION = 1 * 60 * 1000; // 5 minutes in milliseconds
  let timeoutId: any;

  const handleRecaptchaTimeout = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(resetRecaptchaValue, TIMEOUT_DURATION);
  };

  return (
    <>
      <div className="w-full h-[20%]">
        <MainBanner {...ApplyNowBannerData} />
      </div>

      <section className="w-full bg-[#fff] py-20 px-4 2xl:px-40 flex flex-wrap flex-col justify-between gap-16 align-middle">
        <form onSubmit={handleSubmit(SubmitApplyForm)} action="">
          <div className="bg-[#fff] shadow-[0_0_20px_0px_rgba(0,0,0,0.3)] rounded-lg px-4 py-10 h-auto relative sm:w-full lg:w-[70%] m-auto">
            <h1 className="text-[#00caa5] font_1 text-xl sm:text-3xl mb-10">
              Tell us about yourself.
            </h1>

            {/* Row 1 */}
            <div className="flex sm:gap-4 flex-col sm:flex-row items-center w-full">
              {/* First Name */}
              <Controller
                name="first_name"
                defaultValue=""
                control={control}
                rules={{ required: "first name is required" }}
                render={({ field }) => (
                  <AppInputField
                    {...field}
                    label="First Name"
                    type="text"
                    aria-label={errors.first_name ? "First name error" : ""}
                    className="w-full"
                  />
                )}
              />

              {/* last Name */}
              <Controller
                name="last_name"
                defaultValue=""
                control={control}
                rules={{ required: "last name is required" }}
                render={({ field }) => (
                  <AppInputField
                    {...field}
                    label="Last Name"
                    type="text"
                    aria-label={errors.last_name ? "last name error" : ""}
                    className="w-full"
                  />
                )}
              />
            </div>

            {/* Row 2 */}
            <div className="flex sm:gap-4 flex-col sm:flex-row items-center w-full">
              {/* Email */}
              <Controller
                name="email"
                defaultValue=""
                control={control}
                rules={{ required: "email is required" }}
                render={({ field }) => (
                  <AppInputField
                    {...field}
                    label="Email"
                    type="email"
                    aria-label={errors.email ? "email error" : ""}
                    className="w-full"
                  />
                )}
              />
              {/* phone */}

              <Controller
                name="phone"
                defaultValue=""
                control={control}
                rules={{ required: "phone number is required" }}
                render={({ field }) => (
                  <CustomPhoneNumber field={field} errors={errors} />
                )}
              />
            </div>

            {/* Upload Resume Text */}
            <h1 className="text-[#0072b1] font_1 text-base sm:text-2xl sm:mb-10">
              Upload Resume
            </h1>
            {/* Row 3 */}
            <div className="flex sm:gap-4 flex-col sm:flex-row items-center w-full">
              {/* Resume */}
              <Controller
                name="resume"
                defaultValue=""
                control={control}
                rules={{
                  required: "Resume file is required",
                  validate: (fileList) =>
                    fileList && fileList.length > 0
                      ? fileList[0].size <= 5 * 1024 * 1024 ||
                        "File size should be 5MB or less"
                      : "Resume file is required",
                }}
                render={({ field: { onChange, value } }) => (
                  <div className="py-4 w-full flex flex-col">
                    <label htmlFor="resume" className="border-[#9b9b9b]">
                      FILE CHOSEN
                    </label>
                    <label
                      htmlFor="resume"
                      className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-lg p-2 border-[2px] rounded-md outline-none flex items-center"
                    >
                      <MdOutlineSimCardDownload className="font_3 text-3xl" />
                      <div className="flex-1 flex justify-center items-center">
                        {value && value.length > 0
                          ? value[0].name
                          : "doc, docx, pdf"}
                      </div>
                    </label>
                    <input
                      type="file"
                      id="resume"
                      className="hidden"
                      accept=".doc,.docx,.pdf"
                      onChange={(e) => {
                        const file = e.target.files;
                        if (file && file.length > 0) {
                          onChange(file);
                        }
                      }}
                    />
                    <div>
                      <span className="text-sm text-red-500">
                        {/* {errors.resume?.message} */}
                      </span>
                    </div>
                  </div>
                )}
              />
            </div>

            {/* row 4 */}
            <div className="flex sm:gap-4 flex-col sm:flex-row items-center w-full">
              <Controller
                name="experience"
                defaultValue=""
                control={control}
                rules={{ required: "Experience is required" }}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    label="EXPERIENCE"
                    options={experienceData}
                    className="w-full"
                    error={!!errors.experience}
                    errorMessage={errors?.experience?.message as string}
                  />
                )}
              />

              <Controller
                name="degree"
                defaultValue=""
                control={control}
                rules={{ required: "Degree is required" }}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    label="DEGREE"
                    options={degreeData}
                    className="w-full"
                    error={!!errors.degree}
                    errorMessage={errors?.degree?.message as string}
                  />
                )}
              />
            </div>

            {/* row 5 */}
            <div className="flex sm:gap-4 flex-col sm:flex-row items-center w-full">
              <Controller
                defaultValue=""
                name="major"
                control={control}
                rules={{ required: "Major is required" }}
                render={({ field }) => (
                  <AppInputField
                    {...field}
                    label="Major"
                    type="text"
                    aria-label={errors.major ? "Major error" : ""}
                    className="w-full"
                  />
                )}
              />
            </div>

            {/* row 6 */}
            <div className="flex sm:gap-4 flex-col sm:flex-row items-center w-full">
              <Controller
                defaultValue=""
                name="message"
                control={control}
                rules={{ required: "message is required" }}
                render={({ field }) => (
                  <AppInputField
                    {...field}
                    label="Message"
                    type="textarea"
                    aria-label={errors.message ? "Message error" : ""}
                    className="w-full"
                  />
                )}
              />
            </div>

            {/* row 7 */}
            <Controller
              name="link"
              control={control}
              defaultValue="" // Ensure it starts as a controlled component
              rules={{
                required: "This field is required",
                pattern: {
                  value: /^(https?:\/\/)?([\w\d-]+\.)+[\w]{2,}(\/.*)?$/,
                  message: "Enter a valid URL",
                },
              }}
              render={({ field }) => (
                <div className="py-4">
                  <input
                    {...field}
                    type="text"
                    className="w-full font_3 transition-all duration-300 ease-linear text-[#00caa5] text-base border-b-[1px] border-[#9b9b9b] focus:border-[#00caa5] outline-none placeholder:text-[#0072b1]"
                    placeholder="Websites / Portfolio / LinkedIn"
                  />
                  {errors.anyLink && (
                    <p className="text-red-500 text-xs">
                      {/* {errors.link.message} */}
                    </p>
                  )}
                </div>
              )}
            />

            {/* captcha and button */}
            <div className="py-8 flex flex-row-reverse">
              <div className="w-full flex flex-col sm:flex sm:flex-row items-center justify-center gap-10">
                <div className="flex flex-col items-start mt-4">
                  <span className="text-red-500 text-sm">{captchaError}</span>
                  <ReCAPTCHA
                    sitekey={"6LdRjxslAAAAAIP7BsNtsYgCvPM5RfNXjHGIzveJ"}
                    onChange={(val) => {
                      handleCheckCaptcha(val);
                      handleRecaptchaTimeout();
                    }}
                  />
                </div>
                <button
                  style={{ display: isProcessing ? "none" : "flex" }}
                  id="contact_button"
                  type="submit"
                  className="text-white bg-[#0072b1] hover:bg-[#00caa5] transition-all duration-150 ease-in font_1 text-lg px-8 py-2 rounded-full"
                  disabled={isButtonDisabled}
                >
                  SUBMIT
                </button>
                <button
                  style={{ display: isProcessing ? "flex" : "none" }}
                  className="bg-[#0072b1] text-white hover:bg-[#00caa5] transition-all duration-150 ease-in font_1 text-lg px-8 py-2 rounded-full flex"
                  type="button"
                  disabled
                >
                  <BiLoaderAlt size={28} className="mr-2 animate-spin" />{" "}
                  Processing...
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default ApplyNow;
