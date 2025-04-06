"use server";

import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export async function fetchAndExtractPdfText(fileUrl: string): Promise<string> {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch PDF: ${response.status} ${response.statusText}`
      );
    }

    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const loader = new PDFLoader(new Blob([arrayBuffer])); // Pass the blob directly if supported
    const docs = await loader.load();

    return docs.map((doc) => doc.pageContent).join("\n");
  } catch (error) {
    console.error("Error fetching or extracting PDF:", error);
    return "";
  }
}
