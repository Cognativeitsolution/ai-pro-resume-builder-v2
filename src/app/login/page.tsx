"use client";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { H1 } from "@/components/typography";
import AppButton from "@/components/common/button/CustomButton";
import AppInputField from "@/components/common/inpufield/CustomInputField";
import { useRouter } from "next/navigation";
import Ads from "@/components/ads/Ads";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { loginUser } from "@/redux/slices/authSlice";
import Cookies from "js-cookie";
import CustomAlert from "@/components/common/customAlerts/CustomAlert";
import FBLogin from "@/components/socialLogins/facebookLogin";
import LinkedInLogin from "@/components/socialLogins/linkedInLogin";
import GoogleLogin from "@/components/socialLogins/googleLogin";

export default function page() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const [verified, setVerified] = useState<any>(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState<string>();
  const [showSuccessMessage, setShowSuccessMessage] = useState<string>();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  console.log(rememberMe);

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

  const handleCreate = () => {
    router.push("/register");
  };

  const handleLoginSubmit = async (formData: any) => {
    setShowAlert(false);
    if (!verified) {
      setCaptchaError("Please verify the ReCAPTCHA.");
      return;
    }
    const credentials = {
      email: formData?.email,
      password: formData?.password,
    };
    await dispatch(loginUser(credentials))
      .then((response) => {
        if (response.payload?.statusCode == 200) {
          setShowAlert(true);
          setShowSuccessMessage(response.payload.message);
          if (formData.rememberMe) {
            localStorage.setItem(
              "userCredentials",
              JSON.stringify(credentials)
            );
            localStorage.setItem("rememberMie", "true");
          } else {
            localStorage.removeItem("userCredentials");
            localStorage.removeItem("rememberMie");
          }
          setTimeout(() => {
            router.push("/");
          }, 500);
        } else {
          setShowAlert(true);
          setShowErrorMessage(
            response.payload.message ?? "Invalid Credentials."
          );
        }
      })
      .catch((err) => {
        console.log(err);
        setShowAlert(true);
        setShowErrorMessage("Something wents wrong!");
      });
  };
  useEffect(() => {
    const tokenExist = Cookies.get("userToken");
    if (tokenExist) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const savedCredentials = localStorage.getItem("userCredentials");
    const savedRememberMie = localStorage.getItem("rememberMie");
    if (savedCredentials && savedRememberMie) {
      const { email, password } = JSON.parse(savedCredentials);
      setValue("email", email);
      setValue("password", password);
      setValue("rememberMe", true);
    } else {
      setValue("email", "");
      setValue("password", "");
      setValue("rememberMe", false);
    }
  }, []);

  return (
    <>
      <Ads />
      <div className="w-full md:w-[550px] m-auto mt-20 px-4 min-h-[800px] text-center font-Lexend">
        {showAlert && (showErrorMessage || showSuccessMessage) && (
          <CustomAlert
            messages={showErrorMessage || showSuccessMessage}
            type={showErrorMessage ? "error" : "success"}
          />
        )}

        <H1 className="text-primaryBlue mb-5">SIGN IN</H1>

        <div className="text-black text-left my-4 text-lg flex items-start justify-center">
          <IoInformationCircle size={24} className="mt-[2px] text-[red]" />
          <p className="w-[97%] text-center">
            Sign in to AI Pro Resume to securely save and update your resume or
            cover letter information for future use, free of charge. Enjoy free
            downloads at <span className="text-[red]">no hidden costs</span>.
          </p>
        </div>

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

        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <div>
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
                    <FaRegEyeSlash className="text-xl" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between ">
            <div className="text-slate-500">
              <Controller
                name="rememberMe"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="checkbox"
                    {...field}
                    checked={field.value}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      field.onChange(checked);
                      setRememberMe(checked);
                    }}
                    className="autofill:bg-yellow-200"
                  />
                )}
              />{" "}
              Remember me
            </div>

            <div className="text-slate-500">
              <Link href={"/forget-password"}>
                <span className="text-[#0072b1] font-bold hover:text-slate-80">
                  Forgot Password?
                </span>
              </Link>
            </div>
          </div>
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
            title="Sign-in"
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
            className={`${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-primaryBlue hover:bg-slate-800 cursor-pointer "
            } uppercase w-full mt-4 px-8 py-2 rounded-md text-white text-xl flex items-center justify-center font-bold ease-in transition-all mb-4 sm:mb-0`}
          />
        </form>

        <AppButton
          title="Create Account"
          onClick={handleCreate}
          className={` uppercase w-full mt-4 px-8 py-2 rounded-md text-white text-xl flex items-center justify-center font-bold ease-in transition-all mb-4 sm:mb-0 bg-primaryBlue hover:bg-slate-800 cursor-pointer`}
        />
      </div>
    </>
  );
}
