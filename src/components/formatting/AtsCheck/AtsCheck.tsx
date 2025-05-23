"use client";
// ===========
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// ===========
import UploadImg from "media/assets/upload-file.webp";

const AtsCheck = () => {
  const [fileData, setFileData] = useState<{ name: string; file: File | null }>(
    {
      name: "",
      file: null,
    }
  );

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFileData({
        name: file.name,
        file: file,
      });
      setLoading(true);
      setTimeout(() => {
        router.push("/ats-score");
      }, 200);
    } else {
      setFileData({
        name: "",
        file: null,
      });
    }
  };

  return (
    <>
      <div className="mt-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-5 pt-28">
            <p className="text-[20px] font-semibold text-[#707275]">Uploading Resume</p>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3">
            <h3 className="text-[24px] font-semibold"> ATS Check Content</h3>
            <p className="text-[16px] text-center mb-5">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem
              veritatis cum sint quia ullam ratione repellendus rerum eligendi
              distinctio voluptatum, quam molestiae explicabo at quasi atque neque
              vel odio laudantium, laboriosam, veniam saepe enim. Nostrum, eligendi
              velit, rerum soluta omnis magni, provident nulla ab obcaecati porro
              reiciendis quibusdam dolorum at.
            </p>

            <label
              htmlFor="uploadFile1"
              className=" border-[1.2px] border-dashed border-[#7d16c4] font-semibold text-base rounded-3xl w-full h-52 flex flex-col items-center justify-center cursor-pointer">
              <div className="bg-white/85 backdrop-blur-sm p-3 rounded-full mb-3">
                <Image src={UploadImg} alt="upload" width={40} height={40} />
              </div>
              <h5 className="font-semibold text-[18px] text-zinc-950">
                Upload Resume
              </h5>
              <input
                type="file"
                id="uploadFile1"
                accept=".doc,.docx,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <p className="text-[15px] font-medium text-slate-400 ">
                {fileData.name ? `${fileData.name}` : "pdf, doc, docx"}
              </p>
            </label>
          </div>
        )}
      </div>
    </>
  );
};

export default AtsCheck;
