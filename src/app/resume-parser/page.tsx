import YourScore from "@/components/formatting/AtsCheck/YourScore";
import React from "react";

const AtsScore = () => {
  return (
    <>
      <section className="py-5 md:py-10 mt-5 md:mt-0 xl:mt-[120px]">
        <div className="container">
          <div className="flex flex-col xl:flex-row gap-6">
            <YourScore />

            {/* Content */}
            <div className="w-full xl:w-3/4">hello</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AtsScore;
