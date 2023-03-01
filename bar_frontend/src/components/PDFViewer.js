import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

export default function PDFViewer({
  url
}) {

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  console.log('workerjs: ', `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`)

  const onDocumentLoadSuccess = (pdfProps) => console.log('pdfProps: ', pdfProps)
  
  return (
    <>
      <div className="pdf-viewer">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
        >
        </Document>
      </div>
    </>
  );
}
