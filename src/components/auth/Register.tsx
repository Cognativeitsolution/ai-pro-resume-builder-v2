"use client";
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import img from 'media/images/giffs/loopcv-animation.gif'
import { H1, H3 } from '../typography'
import GoogleLogin from '@/components/socialLogins/googleLogin'
import FBLogin from '@/components/socialLogins/facebookLogin'
import LinkedInLogin from '@/components/socialLogins/linkedInLogin'
import { Controller, useForm } from "react-hook-form";
import CustomFormInputField from '../customFormInputfield/CustomFormInputField';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { useCountries } from '@/redux/slices/reuseableSlice'
import { useRouter } from 'next/navigation';
import CustomCountrySelect from '../common/customCountrySelect/CustomCountrySelect';
import CustomPhoneNumber from '../common/customSelect/CustomPhoneNumber';
import ReCAPTCHA from 'react-google-recaptcha';
import AppButton from '../common/button/CustomButton';

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState(false);
  const [showC_Password, setC_ShowPassword] = useState(false);
  const [allCountries, setAllCountries] = useState([]);
  const [captchaError, setCaptchaError] = useState("");
  const [verified, setVerified] = useState<any>(false);
  const { loading, errorsList } = useSelector((state: RootState) => state.auth);
  const { countries } = useSelector((state: RootState) => state.reuseable);
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const handleSubmitRegister = (data: any) => {
    console.log(data, "handleSubmitRegister Data");
  }

  const handleClick = () => {
    console.log("Creatimg account");
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleTogglePasswordVisibilityC = () => {
    setC_ShowPassword((prevShowPassword) => !prevShowPassword);
  };

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
  useEffect(() => {
    dispatch(useCountries());
  }, [dispatch]);

  useEffect(() => {
    if (countries && countries.length > 0) {
      setAllCountries(countries);
    }
  }, [countries]);
  console.log(countries, "countries");

  return (
    <div className='w-full h-full py-20 px-56 justify-center bg-indigo-300'>
      <div className='grid grid-cols-12 rounded-sm'>
        <div className="leftContainer col-span-5 bg-white/15 drop-shadow-3xl flex items-center justify-center">
          <div className=''>
            <Image
              alt='img'
              src={img}
            // width={500}
            // height={500}
            />
          </div>
        </div>
        <div className="rightContainer col-span-7 bg-[#333059]">
          <div className='p-10'>
            <H3 className=' mb-5 text-center text-indigo-200'>CREATE ACCOUNT</H3>

            {/* Social Logins */}
            <div className='grid space-y-1 text-white max-w-[400px] mx-auto items-center'>
              <div>
                <GoogleLogin />
              </div>

              <div>
                <LinkedInLogin />
              </div>
              {/* <div>
                <FBLogin />
              </div> */}

              <div>
                <LinkedInLogin />
              </div>
            </div>

            {/* Register Form */}
            <div className='mt-5'>
              <form onSubmit={handleSubmit(handleSubmitRegister)}>

                <div className='grid grid-cols-12 gap-x-5 max-w-[600px] mx-auto'>

                  <div className='col-span-12'>
                    <Controller
                      name='name'
                      control={control}
                      render={({ field }) => (
                        <>
                          <CustomFormInputField
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

                  <div className='col-span-12'>
                    <Controller
                      name='email'
                      control={control}
                      defaultValue=""
                      rules={{ required: "Email is required" }}
                      render={({ field }) => (
                        <CustomFormInputField
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

                  <div className='col-span-6'>
                    <div className="relative w-full">
                      <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Please Enter Your Password" }}
                        render={({ field }) => (
                          <CustomFormInputField
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
                        className="absolute inset-y-0 right-0 pr-3 flex items-center pb-0 text-white"
                      >
                        {showPassword ? (
                          <FaRegEye className="text-xl" />
                        ) : (
                          <FaRegEyeSlash className="text-xl " />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className='col-span-6'>
                    <div className="relative w-full">
                      <Controller
                        name="confirm_password"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Please Enter Your Confirm Password",
                          validate: (value) =>
                            value === getValues('password') || "Passwords do not match"
                        }}
                        render={({ field }) => (
                          <CustomFormInputField
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
                        className="absolute inset-y-0 right-0 pr-3 flex items-center pb-0 text-white"
                      >
                        {showC_Password ? (
                          <FaRegEye className="text-xl " />
                        ) : (
                          <FaRegEyeSlash className="text-xl " />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className='col-span-12'>
                    <Controller
                      name="country_id"
                      control={control}
                      rules={{ required: "Country is Required" }}
                      render={({ field }) => (
                        <CustomCountrySelect
                          {...field}
                          label="Select Country"
                          name="text"
                          className="w-full"
                          countrySelect={true}
                          error={!!errors.country_id}
                          errorMessage={errors?.country_id?.message as string}
                          options={allCountries}
                        />)}
                    />
                  </div>

                  <div className='col-span-12'>
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

                  {/* Referred By */}
                  <div className="col-span-12 my-3">
                    <Controller
                      name='referred_by'
                      control={control}
                      defaultValue="Rimsha012"
                      render={({ field }) => (
                        <CustomFormInputField
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


                  <div className='col-span-12'>
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

                    <AppButton title='Create Account'
                      onClick={handleClick}
                      disabled={loading ? true : false}
                      altColor='#333059'
                      rightIcon={loading && (
                        <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                      )}
                      className={`${loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-300 hover:bg-indigo-400 cursor-pointer'} 
                      uppercase w-full mt-5 px-8 py-2 rounded-md text-xl flex items-center justify-center font-bold ease-in transition-all mb-4 sm:mb-0`}
                    />
                    <div className="flex justify-center items-center text-center mt-2">
                      <p className="text-slate-300">
                        Already have an account?{" "}
                        <a
                          href={"/login"}
                          className="text-blue-400 font-bold hover:text-slate-500"
                        >
                          LOGIN
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register