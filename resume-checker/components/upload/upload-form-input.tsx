"use client";

import { Button } from "@/components/ui/button";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function UploadFormInput({ onSubmit }: UploadFormInputProps) {
  return (
    <form
      className="flex flex-col gap-6 mt-6 p-1 bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow-lg max-w-md mx-auto"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-2 mt-6">
        <label htmlFor="pdfUpload" className="text-white font-medium text-lg">
          Choose a PDF file:
        </label>
        <input
          type="file"
          accept="application/pdf"
          required
          id="pdfUpload"
          name="file"
          className="p-2 rounded-lg border-2 border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <Button className="mt-4 py-2 bg-green-700 text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg w-full">
        Upload Your PDF
      </Button>
    </form>
  );
}
