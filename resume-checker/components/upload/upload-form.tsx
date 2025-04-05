"use client";

import UploadFormInput from "@/components/upload/upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner"; // ✅ FIXED

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
  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      toast.success("Your file has been uploaded successfully.");
    },
    onUploadError: () => {
      toast.error("There was an error uploading your file.");
    },
    onUploadBegin: ({ file }) => {
      toast("Uploading your file...");
    },
  });

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
