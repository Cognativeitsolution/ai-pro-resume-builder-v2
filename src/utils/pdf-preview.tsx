import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export  const generatePdfPreview = async (
  elementId: string,
  onPdfGenerated: (pdfUrl: string) => void
) => {
  const input = document.getElementById("resume-content");
  if (!input) return;

  const canvas = await html2canvas(input, {
    scale: 2,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

  const pdfBlob = pdf.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);

  onPdfGenerated(pdfUrl); // Pass URL to popup for preview
};