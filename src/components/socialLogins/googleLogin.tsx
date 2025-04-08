import {
  clearSessionAndStorages,
  handleSetToken,
  handleSetUser,
} from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Image from "next/image";
import { useDispatch } from "react-redux";
import AppButton from "../common/button/CustomButton";
import GoogleLogo from "media/assets/google_logo.webp";
import { useRouter } from "next/navigation";

const GoogleLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const onSuccess = async (res: any) => {
    try {
      const userInfo = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo`,
        {
          headers: { Authorization: `Bearer ${res.access_token}` },
        }
      );
      const article = {
        name: userInfo.data.name,
        email: userInfo.data.email,
        provider: "google",
        provider_id: userInfo.data.sub,
      };
      const response = await axios.post(
        "https://backend.aiproresume.com/public/api/login/social-response",
        article
      );
      dispatch(clearSessionAndStorages());
      dispatch(handleSetUser(response?.data?.data));
      dispatch(handleSetToken(response?.data?.data?.token));
      router.push("/");
    } catch (error: any) {
      console.error("Error during login:", error);
    }
  };

  const onFailure = () => {
    console.log("Login Failed");
  };

  const login = useGoogleLogin({
    onSuccess,
    onError: onFailure,
  });

  return (
    <div className="grid space-y-3">
      <AppButton
        onClick={() => login()}
        title="Sign-up with Google"
        className="w-[100%] border border-solid text-gray-400 border-slate-300 px-2 py-2 rounded-md hover:bg-slate-800 hover:text-white ease-in transition-all flex justify-center items-center"
        childClassName="sm:tracking-widest relative"
        leftIcon={
          <>
            <Image
              src={GoogleLogo}
              alt="My Image"
              width={25}
              height={25}
              className="mr-2"
            />
          </>
        }
      />
    </div>
  );
};

export default GoogleLogin;
