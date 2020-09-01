import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { SizeMe } from "react-sizeme";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFDialog({ open, handleClose, id }) {
  const pdf = `./docs/${id}.pdf`;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">PDF de documento {id}</DialogTitle>
      <DialogContent>
        <SizeMe>
          {({ size }) => (
            <Document file={pdf}>
              <Page pageNumber={1} width={size.width ? size.width : 1} />
            </Document>
          )}
        </SizeMe>
      </DialogContent>
    </Dialog>
  );
}
