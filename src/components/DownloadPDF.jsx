import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const DownloadPDF = ({
  elementId,
  fileName = 'resume.pdf',
  buttonText = 'Download as PDF',
  buttonClassName = 'btn btn-primary',
  scale = 2,
  quality = 0.95
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDownload = async () => {
    setIsProcessing(true);

    try {
      const input = document.getElementById(elementId);

      if (!input) {
        console.error(`Element with ID "${elementId}" not found`);
        return;
      }

      const canvas = await html2canvas(input, {
        scale,
        scrollY: -window.scrollY,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/jpeg', quality);
      const imgWidth = 595.28; // A4 width in pt
      const pageHeight = 841.89; // A4 height in pt
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      const pdf = new jsPDF('p', 'pt', 'a4');

      // First page
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Additional pages
      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className={buttonClassName}
      disabled={isProcessing}
    >
      {isProcessing ? 'Processing...' : buttonText}
    </button>
  );
};

export default DownloadPDF;
