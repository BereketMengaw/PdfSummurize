"use client";

import UploadFormInput from "@/components/upload/upload-form-input";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { useState, useRef, useEffect } from "react";
import { generateResult } from "@/lib/openai";
import CheckoutButton from "../checkoutButton";

type ParsedResult = {
  name: string[];
  score: number;
  summary: string;
  positives?: string[];
  negatives?: string[];
  missingItems?: string[];
  recommendations?: string[];
  sectionFeedback?: Record<string, string>;
};

export default function UploadForm() {
  const [uploadedUrl, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [result, setResult] = useState<unknown | null>(null);

  const [viewMode, setViewMode] = useState<"summary" | "resume">("summary");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      if (res && res[0]?.ufsUrl) {
        setUrl(res[0].ufsUrl);
        console.log("Upload complete", res[0].ufsUrl);
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

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const schema = z.object({
      file: z
        .instanceof(File, { message: "Invalid file" })
        .refine((file) => file.size <= 20 * 1024 * 1024, "File must be less than 20MB")
        .refine((file) => file.type === "application/pdf", "Only PDF files allowed"),
    });

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    const validated = schema.safeParse({ file });

    if (!validated.success) {
      toast.error(validated.error.flatten().fieldErrors.file?.[0] ?? "Invalid file");
      setLoading(false);
      return;
    }

    try {
      const res = await startUpload([file]);
      const uploadedUrl = res?.[0]?.ufsUrl;

      if (!uploadedUrl) {
        toast.error("Failed to upload file.");
        setLoading(false);
        return;
      }

      setUrl(uploadedUrl);

      const summary = await fetchAndExtractPdfText(uploadedUrl);
      if (!summary) {
        toast.error("Failed to extract text from PDF.");
        setLoading(false);
        return;
      }

      const result = await generateResult(summary);
      setResult(result);
      formRef.current?.reset();
    } catch (error) {
      console.error("Error processing the file:", error);
      toast.error("An error occurred while processing the file.");
    }

    setLoading(false);
  };

  const parsedResult = (typeof result === "string"
    ? JSON.parse(result)
    : result) as ParsedResult;

  return (
    <div >
    
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
      {parsedResult && uploadedUrl && (
        <div className="mt-4 text-center">
          <p className="text-lg font-medium text-green-800">
            Your resume has been successfully uploaded!
          </p>
          <p className="text-sm text-gray-600">
            Click the button below to unlock your resume evaluation.
          </p>
          <CheckoutButton />
        </div>
      )}
 

      {loading && (
        <div className="mt-4 text-center text-gray-600 animate-pulse">
          <p className="text-lg font-medium">⏳ Please wait, we are analyzing your resume...</p>
        </div>
      )}



    </div>
    
    {parsedResult && uploadedUrl && (
     <div className="w-full mt-10 px-10  ">
    {/* Small screen toggle */}
    {isSmallScreen && (
      <div className="flex justify-center gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded-lg border ${viewMode === "summary" ? "bg-green-200" : "bg-white"}`}
          onClick={() => setViewMode("summary")}
        >
          📋 Summary
        </button>
        <button
          className={`px-4 py-2 rounded-lg border ${viewMode === "resume" ? "bg-green-200" : "bg-white"}`}
          onClick={() => setViewMode("resume")}
        >
          📄 Resume
        </button>
     

        
      </div>
    )}

    {/* Layout */}
    <div className="flex flex-col lg:flex-row gap-6">
      {(viewMode === "summary" || !isSmallScreen) && (
        <div className="w-full lg:w-2/3 bg-white p-6 border border-green-300 rounded-2xl shadow-lg space-y-6">
          <h3 className="text-2xl font-extrabold text-green-800">
            Resume Evaluation Summary for {parsedResult.name}
          </h3>
          <div className="text-gray-700 space-y-4">
            <div>
              <span className="font-semibold text-green-600">📊 Score:</span> {parsedResult.score}/100
            </div>
            <div>
              <span className="font-semibold text-green-600">📝 Summary:</span> {parsedResult.summary}
            </div>
            <div>
              <span className="font-semibold text-green-600">✅ Positives:</span>
              <ul className="list-disc list-inside mt-1">
                {parsedResult.positives?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-semibold text-red-600">❌ Negatives:</span>
              <ul className="list-disc list-inside mt-1 text-red-800">
                {parsedResult.negatives?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-semibold text-yellow-600">🔍 Missing Items:</span>
              <ul className="list-disc list-inside mt-1 text-yellow-800">
                {parsedResult.missingItems?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-semibold text-blue-600">💡 Recommendations:</span>
              <ul className="list-disc list-inside mt-1 text-blue-800">
                {parsedResult.recommendations?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-semibold text-purple-600">📋 Section Feedback:</span>
              <ul className="list-disc list-inside mt-1 text-purple-800">
                {parsedResult.sectionFeedback &&
                  Object.entries(parsedResult.sectionFeedback).map(([key, value], idx) => (
                    <li key={idx}>
                      <strong className="capitalize">{key}:</strong> {value}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {(viewMode === "resume" || !isSmallScreen) && (
        <div className="w-full lg:w-1/2 bg-white border border-gray-300 rounded-2xl shadow-lg overflow-hidden">
          <iframe
            src={uploadedUrl}
            title="Uploaded Resume"
            className="w-full h-[600px]"
          />
        </div>
      )}
    </div>
  </div>
)}
    </div>
  );
}
