"use client";

import UploadFormInput from "@/components/upload/upload-form-input";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { useState, useRef } from "react";
import { generateResult } from "@/lib/openai";

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
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // ✅ Added loading state
  const formRef = useRef<HTMLFormElement>(null);

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      if (res && res[0]?.url) {
        setUrl(res[0].url);
        console.log("Upload complete", res[0].url);
      } else {
        console.error("No URL found after upload.");
      }
    },
    onUploadError: () => {
      toast.error("There was an error uploading your file.");
    },
    onUploadBegin: () => {
      toast("Uploading your file...");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // ✅ Start loading

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    const validated = schema.safeParse({ file });

    if (!validated.success) {
      toast.error(
        validated.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
      );
      setLoading(false);
      return;
    }

    try {
      await startUpload([file]);

      if (url) {
        const summary = await fetchAndExtractPdfText(url);

        if (!summary) {
          toast.error("Failed to extract text from PDF.");
          setLoading(false);
          return;
        }

        const result = await generateResult(summary);
        console.log("Generated result:", result);
        const { data = null, message = null } = result || {};

        if (data) {
          toast.success("Resume processed successfully!");
        }

        if (message) {
          toast.error(message);
        }

        formRef.current?.reset();
      }
    } catch (error) {
      console.error("Error processing the file:", error);
      toast.error("An error occurred while processing the file.");
    }

    setLoading(false); // ✅ End loading
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
        <UploadFormInput
          ref={formRef}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}
