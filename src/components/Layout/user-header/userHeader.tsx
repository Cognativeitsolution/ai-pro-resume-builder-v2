"use client";
// ============
import React, { useState } from "react";
import Image from "next/image";

import { FaAngleDown } from "react-icons/fa6";
import logo from "media/builderIcons/logo.svg";

import right from "media/builderIcons/right.svg";
import left from "media/builderIcons/left.svg";
import download from "media/builderIcons/download.svg";
import preview from "media/builderIcons/preview.svg";
import crown from "media/builderIcons/crown.svg";
import user from "media/builderIcons/user.svg";
import PdfPreviewModal from "@/components/common/modal/pdf-preview-modal";
import { ArrowDownToLine, FileText, Link, X } from "lucide-react";
import RenameResume from "@/components/formatting/renameResume/RenameResume";
import { FiPlusCircle } from "react-icons/fi";
import { SpinnerLoader } from "@/components";

type HeaderProps = {
  currentState: {
    fontSize: string;
    fontFamily: string;
    color: string;
    text: string;
  };
  handleUndo: () => void;
  handleRedo: () => void;
  history: any[];
  future: any[];
};

const UserHeader = (props: HeaderProps) => {
  const { currentState, handleUndo, handleRedo, history, future } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [resumeTitle, setResumeTitle] = useState("My Resume001");

  const handlePreviewClick = () => {
    setIsDownloadModalOpen(false);
    const element = document.getElementById("resume-content");
    if (element) {
      element.style.backgroundColor = "white";
      setHtmlContent(element.innerHTML);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const downloadPDF = async () => {
    const resumeElement = document.getElementById("resume-content");
    if (!resumeElement) return;
    setLoader(true);
    const html = resumeElement.innerHTML;

    const res = await fetch("/api/download-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html }),
    });

    if (!res.ok) {
      console.error("Failed to generate PDF");
      return;
    }
    if (res.ok) {
      setLoader(false);
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${resumeTitle || "resume"}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const downloadDOCX = async () => {
    const resumeElement = document.getElementById("resume-content");
    if (!resumeElement) return;

    const html = resumeElement.innerHTML;

    const res = await fetch("/api/download-docs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html, title: "My_Resume" }),
    });

    if (!res.ok) {
      alert("Failed to generate DOCX.");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "My_Resume.docx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loader)
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm bg-opacity-80 z-50 gap-12">
        <div className="spinner" />
        <h4 className="mt-12 text-white">Generating...</h4>
      </div>
    );
  return (
    <div className="flex items-center justify-between bg-[#ffffff] py-4 px-5 border-b border-[#CECECE] fixed top-0 left-0 w-full z-40">
      {isDownloadModalOpen && (
        <div
          onClick={() => setIsDownloadModalOpen(false)}
          className="fixed transition-all top-[75px] ease-linear inset-0 h-full w-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 flex items-start justify-end p-1 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white  shadow-2xl mr-[15%] rounded-lg p-6 w-[300px] text-center relative transform transition-all duration-300 ease-out animate-slide-fade"
          >
            {/* <button
              onClick={() => setIsDownloadModalOpen(false)}
              className="absolute top-2 right-2 bg-gray-200 rounded-full p-1"
            >
              <X size={18} />
            </button> */}

            <h2 className="text-lg font-semibold mb-4">Download Resume</h2>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  downloadPDF();
                  setIsDownloadModalOpen(false);
                }}
                className="text-black flex flex-col gap-2 items-center rounded-md"
              >
                <div className="border rounded-full w-12 h-12 flex justify-center items-center hover:bg-black/10 transition-all ease-linear">
                  <ArrowDownToLine />
                </div>
                <h3 className="text-sm">
                  Download <br /> PDF
                </h3>
              </button>

              <button
                onClick={() => {
                  downloadDOCX();
                  setIsDownloadModalOpen(false);
                }}
                className="text-black flex flex-col gap-2 items-center rounded-md"
              >
                <div className="border rounded-full w-12 h-12 flex justify-center items-center hover:bg-black/10 transition-all ease-linear">
                  <FileText />
                </div>
                <h3 className="text-sm">
                  Download <br /> Docx
                </h3>
              </button>

              <button
                onClick={() => {
                  setIsDownloadModalOpen(false);
                }}
                className="text-black flex flex-col gap-2 items-center rounded-md"
              >
                <div className="border rounded-full w-12 h-12 flex justify-center items-center hover:bg-black/10 transition-all ease-linear">
                  <Link />
                </div>
                <h3 className="text-sm">
                  Share <br /> Link
                </h3>
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-x-hidden z-0">
          <div className="relative bg-transparent rounded max-h-[90vh] overflow-auto overflow-x-hidden p-4 hide-scrollbar">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-indigo-200 rounded-full p-2 text-black font-bold text-xl z-50"
            >
              <X />
            </button>

            <div
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              className="text-left"
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-12">
        <div>
          <Image src={logo} alt="Logo" />
        </div>
        <div className="flex items-center gap-6">
          <RenameResume
            initialTitle={resumeTitle}
            onRename={(newTitle) => setResumeTitle(newTitle)}
          />
          <div>
            <FiPlusCircle className="text-[22px] text-[#707275] cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        {/* Undo and Redo buttons */}
        <div className="flex items-center gap-8">
          <button
            className="text-black rounded cursor-pointer"
            onClick={handleUndo}
            disabled={history.length <= 1}
          >
            <Image src={left} alt="Undo" className="w-[25px]" />
          </button>
          <button
            className="text-black rounded cursor-pointer"
            onClick={handleRedo}
            disabled={future.length === 0}
          >
            <Image src={right} alt="Redo" className="w-[25px]" />
          </button>
        </div>

        <div className="flex items-center gap-6">
          {/* Download PDF button */}
          <div
            onClick={() => setIsDownloadModalOpen(true)}
            className="bg-primary rounded-3xl py-2 px-4 cursor-pointer flex items-center gap-2 shadow-md"
          >
            <Image src={download} alt="Download" className="w-[15px]" />
            <span className="text-[14px] text-[#818181]">Download</span>
          </div>
          <button
            onClick={handlePreviewClick}
            className="bg-secondary  rounded-3xl py-2 px-4 cursor-pointer flex items-center gap-2 shadow-md"
          >
            <Image src={preview} alt="Preview" className="w-full" />
            <div className="text-white">Preview</div>
            {pdfUrl && (
              <PdfPreviewModal
                pdfUrl={pdfUrl}
                onClose={() => setPdfUrl(null)}
              />
            )}
          </button>
          <span className="bg-[#D9D9D9] w-[2px] h-[30px]" />
          <div className="cursor-pointer">
            <Image src={crown} alt="Subscription" />
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src={user} alt="User" />
            <FaAngleDown className="text-[#707275]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
