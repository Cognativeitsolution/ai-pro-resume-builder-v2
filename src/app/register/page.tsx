"use client";
import React, { Suspense, useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { H1 } from '@/components/typography'
import AppButton from '@/components/common/button/CustomButton'
import AppInputField from '@/components/common/inpufield/CustomInputField'
import CustomSelect from '@/components/common/customSelect/CustomSelect'

import { useRouter } from "next/navigation";
import CustomPhoneNumber from "@/components/common/customSelect/CustomPhoneNumber";
import Ads from "@/components/ads/Ads";
import { registerUser } from "@/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import GoogleLogin from "@/components/socialLogins/googleLogin";
import FBLogin from "@/components/socialLogins/facebookLogin";
import LinkedInLogin from "@/components/socialLogins/linkedInLogin";
import { useCountries } from "@/redux/slices/reuseableSlice";

export default function page() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, errorsList } = useSelector((state: RootState) => state.auth);
  const { countries } = useSelector((state: RootState) => state.reuseable);
  const [captchaError, setCaptchaError] = useState("");
  const [verified, setVerified] = useState<any>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showC_Password, setC_ShowPassword] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState([]);
  const [allCountries, setAllCountries] = useState([]);

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const handleCheckCaptcha = () => {
    setVerified(true);
    setCaptchaError("");
  };

  const resetRecaptchaValue = () => {
    setVerified(null);
  };

  const TIMEOUT_DURATION = 1 * 60 * 1000;
  let timeoutId: any;

  const handleRecaptchaTimeout = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(resetRecaptchaValue, TIMEOUT_DURATION);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleTogglePasswordVisibilityC = () => {
    setC_ShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleClick = () => {
    console.log("Creatimg account");
  };
  const handleRegisterSubmit = async (formData: any) => {
    if (!verified) {
      setCaptchaError("Please verify the ReCAPTCHA.");
      return;
    }

    const credentials = {
      name: formData?.name,
      email: formData?.email,
      role: formData?.role,
      password: formData?.password,
      confirm_password: formData?.confirm_password,
      country_id: formData?.country_id,
      contact: formData?.contact,
      referred_by: formData?.referred_by,
    };

    await dispatch(registerUser(credentials))
      .then((response) => {
        console.log(response, "response");
        if (response?.payload?.statusCode == 200) {
          router.push("/login");
        }
      })
      .catch((error) => {
        setShowAlert(true);
        console.error("Registering failed:", error);
      });
  };
  useEffect(() => {
    if (errorsList && typeof errorsList === "object") {
      const flattenedErrors: any = Object.values(errorsList).flat();
      setShowErrorMessage(flattenedErrors);
      setShowAlert(flattenedErrors.length > 0);
    }
  }, [errorsList]);

  useEffect(() => {
    dispatch(useCountries());
  }, [dispatch]);

  useEffect(() => {
    if (countries && countries.length > 0) {
      setAllCountries(countries);
    }
  }, [countries]);
  return (
    <>
      <Ads />
      <div className="w-full md:w-[550px] m-auto mt-20 px-4 min-h-[800px] text-center font-Lexend">
        {showAlert && showErrorMessage.length > 0 && (
          <div
            className="bg-red-100 border-l-4 text-start mb-4 border-red-500 text-red-700 p-4 rounded relative"
            role="alert"
          >
            <strong className="block font-bold mb-2">
              Please address the following errors:
            </strong>
            <ul className="list-disc list-inside">
              {showErrorMessage.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <H1 className="text-primaryBlue mb-5">CREATE ACCOUNT</H1>

        {/* //Social Logins */}
        <div className="grid space-y-3">
          <div>
            <GoogleLogin />
          </div>

          <div>
            <FBLogin />
          </div>

          <div>
            <LinkedInLogin />
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit(handleRegisterSubmit)}>
            {/* Name */}
            <div className="flex flex-col">
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <>
                    <AppInputField
                      label="Name*"
                      type="text"
                      className="w-full"
                      error={!!errors.name}
                      errorMessage={errors.name?.message}
                      aria-invalid={errors.name ? "true" : "false"}
                      {...field}
                    />
                  </>
                )}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <AppInputField
                    label="Email*"
                    type="text"
                    className="w-full"
                    error={!!errors.email}
                    errorMessage={errors.email?.message}
                    aria-label={errors?.email ? "Email error" : ""}
                    {...field}
                  />
                )}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <div className="relative w-full">
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Please Enter Your Password" }}
                  render={({ field }) => (
                    <AppInputField
                      label="Password*"
                      type={showPassword ? "text" : "password"}
                      className="w-full"
                      {...field}
                      error={!!errors.password}
                      errorMessage={errors.password?.message}
                      aria-label={errors?.password ? "Password error" : ""}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={handleTogglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <FaRegEye className="text-xl" />
                  ) : (
                    <FaRegEyeSlash className="text-xl " />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col">
              <div className="relative w-full">
                <Controller
                  name="confirm_password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Please Enter Your Confirm Password",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  }}
                  render={({ field }) => (
                    <AppInputField
                      label="Confirm Password*"
                      type={showPassword ? "text" : "password"}
                      className="w-full"
                      {...field}
                      error={!!errors.confirm_password}
                      errorMessage={errors.confirm_password?.message}
                      aria-label={errors?.password ? "Password error" : ""}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={handleTogglePasswordVisibilityC}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showC_Password ? (
                    <FaRegEye className="text-xl" />
                  ) : (
                    <FaRegEyeSlash className="text-xl " />
                  )}
                </button>
              </div>
            </div>

            {/* Referred By */}
            <div className="flex flex-col">
              <Controller
                name="referred_by"
                control={control}
                defaultValue="Rimsha012"
                render={({ field }) => (
                  <AppInputField
                    {...field}
                    label="Referred By"
                    type="text"
                    className="w-full"
                    readOnly={true}
                    aria-label={errors?.reffered ? "reffered error" : ""}
                  />
                )}
              />
            </div>

            {/* Select Country */}
            <div className="flex flex-col">
              <Controller
                name="country_id"
                control={control}
                rules={{ required: "Country is Required" }}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    label="Select Country"
                    name="text"
                    className="w-full"
                    error={!!errors.country_id}
                    errorMessage={errors?.country_id?.message as string}
                    options={allCountries}
                  />
                )}
              />
            </div>

            {/* Phone Number   */}
            <div className="flex flex-col">
              <Controller
                name="contact"
                control={control}
                rules={{ required: "Phone Number is Required" }}
                render={({ field }) => (
                  <CustomPhoneNumber
                    field={field}
                    error={!!errors.contact}
                    errorMessage={errors.contact?.message}
                  />
                )}
              />
            </div>
            <div>
              <div className="flex flex-col items-start mt-4">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_captcha_sitekey ?? ""}
                  onChange={() => {
                    handleCheckCaptcha();
                    handleRecaptchaTimeout();
                  }}
                />
                <span className="text-red-500 text-sm">{captchaError}</span>
              </div>

              <AppButton
                title="Create Account"
                onClick={handleClick}
                disabled={loading ? true : false}
                rightIcon={
                  loading && (
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-200 animate-spin  fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  )
                }
                className={`${loading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-primaryBlue hover:bg-slate-800 cursor-pointer "
                  } uppercase w-full mt-4 px-8 py-2 rounded-md
                                 text-white text-xl flex items-center justify-center font-bold ease-in transition-all mb-4 sm:mb-0`}
              />
              <div className="w-[60%] text-center mt-4 text-slate-500 inline-block mb-5">
                <p className="text-slate-500">
                  Already an account?{" "}
                  <a
                    href={"/login"}
                    className="text-primaryBlue font-bold hover:text-slate-800"
                  >
                    LOGIN
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
