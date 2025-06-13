"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { NewFooter, NewHeader } from "@/components";
import { PopupProvider } from "../configs/store/Popup";

const ConditionalLayout = ({ children }: any) => {
  const pathname = usePathname();

  const [popup, setPopup] = useState(false);
  const [imagePopup, setImagePopup] = useState(false);

  const togglePopup = (e: any) => {
    setPopup(!e)
  }

  const toggleImagePopup = (value?: boolean) => {
    setImagePopup(prev => value !== undefined ? value : !prev);
  };

  return (
    <PopupProvider value={{ popup, togglePopup, imagePopup, toggleImagePopup }}>
      <>
        {pathname === "/create-resume" || pathname === "/onboarding" || pathname === "/auth/login" || pathname === "/auth/register" || pathname === "/auth/forget-password" || pathname === "/auth/reset-password" || pathname === "/auth/verify-user"  ? null : <NewHeader />}
        {children}
        {pathname === "/onboarding" || pathname === "/auth/login" || pathname === "/auth/register" || pathname === "/auth/forget-password" || pathname === "/auth/reset-password"  || pathname === "/auth/verify-user" ? null : <NewFooter />}
      </>
    </PopupProvider>
  );
};

export default ConditionalLayout;
