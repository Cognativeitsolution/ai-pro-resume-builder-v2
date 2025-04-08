import React from "react";
import MainBanner from "@/components/Banner/mainBanner";
import {
  BannerData,
} from "./data";

export default function Page() {
  return (
    <>
      <MainBanner {...BannerData} />
    </>
  );
}
