"use client";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import { H1 } from '@/components/typography'
import AppButton from '@/components/common/button/CustomButton'
import AppInputField from '@/components/common/inpufield/CustomInputField'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { UpdatePassword } from '@/redux/slices/authSlice';
import Cookies from "js-cookie";
import CustomAlert from "@/components/common/customAlerts/CustomAlert";

export default function page() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const [showC_Password, setC_ShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState<string>();
  const [showSuccessMessage, setShowSuccessMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleTogglePasswordVisibilityC = () => {
    setC_ShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleResetPassword = async (data: any) => {
    setLoading(true);
    setShowAlert(false);
    const userEmail = Cookies.get("userEmail");
    const getUserEmail = userEmail ? JSON.parse(userEmail) : "";
    const reseTPassData = {
      ...data,
      email: getUserEmail.replace(/^"|"$/g, "").trim(),
    };
    await dispatch(UpdatePassword(reseTPassData))
      .then((response) => {
        setLoading(false);
        if (response.payload.statusCode == 200) {
          setShowAlert(true);
          setShowSuccessMessage(response.payload.message);
          setTimeout(() => {
            router.push("/");
          }, 500);
        } else {
          setShowAlert(true);
          setShowErrorMessage(response.payload.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "err");
        setShowAlert(true);
        setShowErrorMessage("Something wents wrong.");
      });
  };
  return (
    <>
      <div className="w-full md:w-[550px] m-auto min-h-[800px] text-center font-Lexend flex flex-col justify-center">
        {showAlert && (showErrorMessage || showSuccessMessage) && (
          <CustomAlert
            messages={showErrorMessage || showSuccessMessage}
            type={showErrorMessage ? "error" : "success"}
          />
        )}

        <H1 className="text-black mb-5">Reset Password</H1>
        <div>
          <form onSubmit={handleSubmit(handleResetPassword)}>
            {/* Verify Code */}
            <div className="flex flex-col">
              <Controller
                name="verify_code"
                control={control}
                defaultValue=""
                rules={{ required: "Code is required" }}
                render={({ field }) => (
                  <AppInputField
                    {...field}
                    label="Verify Code"
                    type="text"
                    className="w-full"
                    error={!!errors.verify_code}
                    errorMessage={errors.verify_code?.message}
                    aria-invalid={errors.verify_code ? "true" : "false"}
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
                  name="password_confirmation"
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
                      error={!!errors.password_confirmation}
                      errorMessage={errors.password_confirmation?.message}
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

            <AppButton
              title="Submit"
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
                  ? "bg-primaryGreen/40 cursor-not-allowed"
                  : "bg-primaryCran hover:bg-slate-800  cursor-pointer "
                } uppercase w-full mt-4 px-8 py-2 rounded-md text-white text-xl flex items-center 
                             justify-center font-bold ease-in transition-all mb-4 sm:mb-0`}
            />

            <div className="flex justify-between items-center m-4">
              <p className="text-sm text-primaryGray">
                Didn't get the code{" "}
                <span className="color_4">
                  <Link href="/forget-password" className="text-primaryBlue">
                    Resend
                  </Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
