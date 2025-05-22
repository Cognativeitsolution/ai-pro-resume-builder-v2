"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { NewFooter, NewHeader } from "@/components";
import { PopupProvider } from "../configs/store/Popup"

const ConditionalLayout = ({ children }: any) => {
  const pathname = usePathname();
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   OldAPI.get("settings-for-website").then((res) => {
  //     console.log(res, "res");
  //     setLoading(false);
  //   });
  // }, []);

  const [popup, setPopup] = useState(false);
  const togglePopup = (e: any) => {
    setPopup(!e)
  }

  return (
    <PopupProvider value={{ popup, togglePopup }}>
      <>
        {pathname === "/create-resume" || pathname === "/onboarding" ? null : <NewHeader />}
        {/* {loading ? <SpinnerLoader /> : children} */}
        {children}
        {pathname === "/onboarding" ? null : <NewFooter />}
      </>
    </PopupProvider>
  );
};

export default ConditionalLayout;
