"use server";

import { getDbConnection } from "@/lib/db";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateResult } from "@/lib/openai";

export async function generatePdfSummary(
  uploadResponse: {
    serverData: {
      userId: string;
      file: {
        url: string;
        name: string;
      };
    };
  }[]
) {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  // ... rest of your logic to generate PDF summary using userId, pdfUrl, and fileName
  // For example:
  console.log("User ID:", userId);
  console.log("PDF URL:", pdfUrl);
  console.log("File Name:", fileName);

  if (!pdfUrl) {
    return {
      success: false,
      message: "PDF URL is missing",
      data: null,
    };
  }

  try {
    const PdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log("Extracted PDF text:", PdfText);

    let result;
    try {
      result = await generateResult(PdfText);
      console.log("Generated result:", result);
    } catch (error) {
      console.error("Error generating result:", error);
      return {
        success: false,
        message: "Error generating result",
        data: null,
      };
    }
    if (!result) {
      return {
        success: false,
        message: "Failed to generate result",
        data: null,
      };
    }
    console.log("Generated result:", result);

    if (!result) {
      return {
        success: false,
        message: "Failed to generate result",
        data: null,
      };
    }
    return {};
  } catch (error) {
    console.error("Error fetching PDF:", error);
    return {
      success: false,
      message: "Error fetching PDF",
      data: null,
    };
  }

  // Placeholder for the actual PDF summary generation logic
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate some processing

  return {
    success: true,
    message: "PDF summary generated successfully",
    data: {
      // Your generated summary data here
      summary: "This is a placeholder summary.",
    },
  };
}


export saveResume(){
  //all the logic for inserting the resume 

  try{
    const sql= await  getDbConnection();
    await sql `INSERT INTO users (email, full_name, customer_id, price_id, status)
VALUES ();
`
  }catch{
      
  }
}

export async function resumeSaver() {
  //user loggedin and has a userId
  //save pdfSummary
  //savePdfSummary

  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "user not found",
      };
    }
    savepdf
  } catch (error) {
    return {
      success: false,
      Message:
        error instanceof Error ? error.message : "Error saving pdf summary",
    };
  }
}
