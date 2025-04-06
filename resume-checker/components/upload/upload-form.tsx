"use client";

import UploadFormInput from "@/components/upload/upload-form-input";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner"; // ✅ FIXED
import { useState, useEffect } from "react";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File must be less than 20MB"
    )
    .refine(
      (file) => file.type === "application/pdf",
      "Only PDF files allowed"
    ),
});

export default function UploadForm() {
  const [url, setUrl] = useState<string | null>(null); // Initialize URL state

  // This stays outside the handleSubmit function
  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      if (res && res[0]?.url) {
        setUrl(res[0].url); // Set the URL when upload is complete
        const urlTwo = res[0].url;
        console.log("Upload complete", urlTwo); // ✅ This will now work
      } else {
        console.error("No URL found after upload.");
      }
    },

    onUploadError: () => {
      toast.error("There was an error uploading your file.");
    },
    onUploadBegin: ({ file }) => {
      toast("Uploading your file...");
    },
  });

  // UseEffect to trigger when `url` is set
  useEffect(() => {
    if (url) {
      const getSummary = async () => {
        const summary = await fetchAndExtractPdfText(url);
        if (!summary) {
          toast.error("Failed to extract text from PDF.");
          return;
        }
        // Here you can handle the summary, e.g., send it to your server or display it
        console.log("Extracted PDF text:", summary);
      };

      getSummary();
    }
  }, [url]); // Trigger when `url` changes

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    const validated = schema.safeParse({ file });

    if (!validated.success) {
      toast.error(
        validated.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
      );
      return;
    }

    // Start the upload process after file validation
    await startUpload([file]);
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-2xl mx-auto py-3">
      <h2 className="text-green-800 text-2xl font-semibold text-center">
        Upload Your Resume
      </h2>
      <p className="text-green-800 text-lg text-center mt-1">
        Upload your resume to have it evaluated and optimized for the best job
        matches.
      </p>
      <div className="w-full bg-white p-2 rounded-lg shadow-lg border border-green-200">
        <UploadFormInput onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
