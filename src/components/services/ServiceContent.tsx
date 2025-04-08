import React from "react";

type PropsType = {
  section?: any[];
};

export default function ServiceContent({ section }: PropsType) {
  return (
    <div className="mb-6">
      <div className="px-4 container lg:px-10 my-10">
        {section?.map((item: any, idx: number) => (
          <div key={idx} className="mb-6">
            <h3 className="text-[#0072b1] font-Lexend font-bold text-xl md:text-2xl px-0 mb-3">
              {item.title}
            </h3>
            {item.description && (
              <p className="font-Lexend text-base mb-2">{item.description}</p>
            )}
            {item.steps && (
              <ul className="font-Lexend text-base">
                {item.steps.map((step: string, index: number) => (
                  <li key={index} className="mb-1 list-disc list-inside">
                    {step}
                  </li>
                ))}
              </ul>
            )}
            {item.para && (
              <p className="font-Lexend text-base mb-2">{item.para}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
