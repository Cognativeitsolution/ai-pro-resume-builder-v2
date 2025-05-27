import React from "react";
import { BannerData } from "./data";
import MainBanner from "@/components/Banner/mainBanner";

export default function Page() {
  return (
    <>
      <MainBanner {...BannerData} />
    </>
  );
}
