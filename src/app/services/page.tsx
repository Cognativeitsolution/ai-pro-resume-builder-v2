"use client";

import React from "react";
import { ServiceBannerData, ServiceContentData } from "./data";
import Ads from "@/components/ads/Ads";
import OurFaqs from "@/components/Faq/faq";
import MainBanner from "@/components/Banner/mainBanner";
import ServiceContent from "@/components/services/ServiceContent";
import ServicesSection from "@/components/services/ServicesSection";

export default function Page() {
  return (
    <>
      <MainBanner {...ServiceBannerData} />
      <Ads />
      <ServicesSection />
      <ServiceContent section={ServiceContentData} />
      <OurFaqs />
    </>
  );
}
