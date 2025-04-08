"use client";

import Image from "next/image";
import React, { useState } from "react";
import img1 from "media/assets/testImages/ads.jpg";

type Ad = {
  id?: number;
  slug?: string;
  is_script?: number;
  ad_url?: any;
  ad_script?: string;
  image?: any;
};

const Ads = () => {
  const [ads, setAds] = useState<Ad[]>([
    {
      id: 1,
      slug: "career-top",
      is_script: 0,
      ad_url: "https://example.com",
      image: img1,
      ad_script: "This is a sample ad script for career-top!",
    },
  ]);

  //   useEffect(() => {
  //     ApiService.getAllAdsWeb(user?.token)
  //       .then((response) => {
  //         setAds(response.data.data.ads);
  //         console.log(response.data.data.ads);
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);
  console.log(ads);

  return (
    <>
      <div className="my-4">
        {ads
          .filter((ad) => ad.slug === "career-top")
          .map((ad) => (
            <div key={ad.id} className="mb-5">
              {ad.is_script === 0 ? (
                <a href={ad.ad_url} target="_blank" rel="noopener noreferrer">
                  <Image
                    className="w-[100px] h-[100px]"
                    src={ad.image || "/placeholder.png"}
                    alt={`Ad ${ad.id}`}
                    width={800}
                    height={400}
                    layout="responsive"
                  />
                </a>
              ) : (
                <div className="p-4 bg-gray-100">
                  <p className="text-xl font-semibold mb-2">{ad.ad_script}</p>
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default Ads;
