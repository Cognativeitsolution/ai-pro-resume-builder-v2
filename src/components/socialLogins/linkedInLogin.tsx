'use client'
import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import LinkedInLogo from 'media/assets/link.webp';
import AppButton from '../common/button/CustomButton';
import { clearSessionAndStorages, handleSetToken, handleSetUser } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';

const LinkedInLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const response_type = "code";
  const clientId = process.env.NEXT_PUBLIC_linkedIn_app_id;
  const redirectUri = "https://aiproresume.com/login";
  const scope = "openid profile email";
  const state = "foobar";

  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      console.log(code, "code");

      exchangeCodeForToken(code);
    }
  }, [code]);

  const handleLinkedInLogin = () => {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=${response_type}&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=${state}&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl;
  };

  const exchangeCodeForToken = async (authCode: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_old_Base_URL}/login/social-response`,
        {
          code: authCode,
          redirect_uri: redirectUri,
        }
      );
      console.log("LinkedIn Login Successresponseresponse:", response);

      if (response?.data?.data) {
        const userData = response.data.data;

        dispatch(clearSessionAndStorages());
        dispatch(handleSetUser(userData));
        dispatch(handleSetToken(userData?.token));
        router.push("/");
        console.log("LinkedIn Login Success:", userData);
      }
    } catch (error: any) {
      console.error("LinkedIn login error:", error);
    }
  };

  return (
    <AppButton
      title="Sign-in with LinkedIn"
      onClick={handleLinkedInLogin}
      className="w-[100%] border border-solid text-gray-400 border-slate-300 px-2 py-2 rounded-md hover:bg-slate-800 hover:text-white ease-in transition-all flex justify-center items-center"
      childClassName="sm:tracking-widest relative"
      leftIcon={
        <Image
          src={LinkedInLogo}
          alt="LinkedIn Logo"
          width={25}
          height={25}
          className="mr-2"
        />
      }
    />
  );
};

export default LinkedInLogin;
