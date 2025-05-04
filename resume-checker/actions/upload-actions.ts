"use server";

import { getDbConnection } from "@/lib/db";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateResult } from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";


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


async function saveResume({file_url, summary_text,file_name}:{

  file_url: string;
  summary_text: string;
  file_name: string;
}) {
  //all the logic for inserting the resumes and upadteing it 

  try{
    const sql= await  getDbConnection();
    await sql `INSERT INTO Resume-checker (user_id, original_file_url, summary_text, status, title, file_name)
VALUES (
   
    ${file_url},
    ${summary_text},
    ${file_name}
  ) 
);

if (!saveResume) {
  return {
    success: false,
    message: "Failed to save resume",
  };
} else {
  return {
    success: true,
    message: "Resume saved successfully",
  };
}

`
  }catch{
      
  }
}


export async function resumeSaverAction({
  file_url,
  summary_text,
  file_name,
}: {
  file_url: string;
  summary_text: string;
  file_name: string;
}) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const saveResumeInit = await saveResume({
     
      file_url,
      summary_text,
      file_name,
    });

    

    return {
      success: true,
      message: "Resume result saved successfully",
    };

  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving PDF summary",
    };
  }
}

