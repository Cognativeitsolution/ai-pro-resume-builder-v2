"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Footer, Header, SpinnerLoader } from "@/components";

const ConditionalLayout = ({ children }: any) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   OldAPI.get("settings-for-website").then((res) => {
  //     console.log(res, "res");
  //     setLoading(false);
  //   });
  // }, []);

  return (
    <>
      <div
        className={`${pathname === "/create-resume/formatting" ? "bg-[#f3f4f6] min-h-[100vh]" : null
          }`}
      >
        {pathname === "/create-resume/formatting" || pathname === "/formatting-new" ? null : <Header />}
        {loading ? <SpinnerLoader /> : children}
        {pathname === "/create-resume/formatting" || pathname === "/formatting-new" ? null : <Footer />}
      </div>
    </>
  );
};

export default ConditionalLayout;
