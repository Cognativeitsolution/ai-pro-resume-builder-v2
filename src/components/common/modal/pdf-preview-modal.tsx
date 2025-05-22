import React from "react";

const PdfPreviewModal = ({ pdfUrl, onClose }: { pdfUrl: string; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] h-[90%] p-4 rounded shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-700"
          onClick={onClose}
        >
          ❌
        </button>
        <iframe src={pdfUrl} className="w-full h-full" title="PDF Preview" />
      </div>
    </div>
  );
};

export default PdfPreviewModal;
