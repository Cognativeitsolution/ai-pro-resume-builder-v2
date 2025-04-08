import React, { useEffect, useState } from "react";
import PosterBanner from "./PosterBanner";
import arrow_design_7 from "media/assets/arrow_design_7.webp";
import about_img_1 from "media/assets/about_img_1.webp";

const ServicesSection = () => {
  const [services, setServices] = useState<any[]>([]);

  const dummyServices = [
    {
      id: 1,
      image: about_img_1,
      name: "Professional Resume Writing",
      description: "<p>Get a professional resume that stands out.</p>",
      other_heading: "Additional Details",
      other_description:
        "<p>Includes cover letter and LinkedIn profile optimization.</p>",
      discount: 10,
      price: 100,
      discounted_price: 90,
      status: true,
    },
    {
      id: 2,
      image: about_img_1,
      name: "LinkedIn Profile Optimization",
      description:
        "<p>Enhance your LinkedIn profile for better job opportunities.</p>",
      other_heading: "More Information",
      other_description:
        "<p>We will rewrite and optimize your profile summary and experiences.</p>",
      discount: 15,
      price: 80,
      discounted_price: 68,
      status: true,
    },
    {
      id: 3,
      image: about_img_1,
      name: "Cover Letter Writing",
      description:
        "<p>Get a customized cover letter that highlights your strengths.</p>",
      other_heading: "Service Details",
      other_description:
        "<p>Includes multiple revisions and industry-specific tailoring.</p>",
      discount: 5,
      price: 50,
      discounted_price: 47.5,
      status: true,
    },
  ];

  useEffect(() => {
    setServices(dummyServices);
  }, []);

  return (
    <>
      <section className="w-full py-5 px-0 sm:px-10 2xl:px-10 flex flex-wrap flex-col justify-between align-middle">
        {services.map((service, idx) => {
          if (!service.status) return;
          return (
            <PosterBanner
              id={service.id}
              arrowImage={arrow_design_7}
              posterImage={service.image}
              cardHeading={service.name}
              cardDescription={service.description}
              otherHeading={service.other_heading}
              otherDescription={service.other_description}
              discount={service.discount}
              buttonText={"CONTACT A RESUME WRITING"}
              buttonLink={"#"}
              price={service.price}
              discounted_price={service.discounted_price}
              dir={idx % 2 === 0 ? "ltr" : "rtl"}
              cart={{
                services: [],
              }}
              addToCart={function (type: string, item: any): void {
                throw new Error("Function not implemented.");
              }}
              removeFromCart={function (type: string, id: number): void {
                throw new Error("Function not implemented.");
              }}
              userIntrestedInService={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          );
        })}
      </section>
    </>
  );
};

export default ServicesSection;
