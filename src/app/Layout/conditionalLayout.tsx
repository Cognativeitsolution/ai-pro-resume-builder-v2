"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { NewFooter, NewHeader } from "@/components";
import { PopupProvider } from "../configs/store/Popup";

const ConditionalLayout = ({ children }: any) => {
  const pathname = usePathname();

  const [popup, setPopup] = useState(false);
  const [imagePopup, setImagePopup] = useState(false);

  const togglePopup = (value?: boolean) => {
    setPopup(prev => value !== undefined ? value : !prev);
  };

  const toggleImagePopup = (value?: boolean) => {
    setImagePopup(prev => value !== undefined ? value : !prev);
  };

  return (
    <PopupProvider value={{ popup, togglePopup, imagePopup, toggleImagePopup }}>
      <>
        {pathname === "/create-resume" || pathname === "/onboarding" ? null : <NewHeader />}
        {children}
        {pathname === "/onboarding" ? null : <NewFooter />}
      </>
    </PopupProvider>
  );
};

export default ConditionalLayout;
