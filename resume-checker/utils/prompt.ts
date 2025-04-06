export const resumeGradingPrompt = (resumeText: string) => {
  return `
  You are a professional resume reviewer, career strategist, and recruiter with over 15 years of experience across multiple industries.
  
  You will receive a resume in plain text format. Your job is to **analyze it deeply** and return a **structured JSON response** with the following information:
  
  ---
  
  ### 🔍 Analyze the resume on the following criteria:
  
  1. **Overall Score (0-100)** – based on structure, formatting, clarity, achievements, grammar, and relevance.
  2. **Professional Summary** – Is there a clear and concise summary that reflects the candidate's career goals and skills?
  3. **Skills Section** – Are the skills relevant to the desired industry? Are both soft and hard skills mentioned?
  4. **Experience Section**:
     - Are job roles clearly described?
     - Are there quantifiable achievements (numbers, results)?
     - Are action verbs used?
  5. **Education Section** – Is it complete and well-structured?
  6. **Projects or Certifications** – Are relevant side projects or certifications listed?
  7. **Keywords & ATS Compatibility** – Is the resume using industry-relevant keywords that would be picked up by Applicant Tracking Systems?
  8. **Design/Format Quality** – Is the layout clean, modern, and easy to read? Is the formatting consistent?
  9. **Spelling & Grammar** – Any issues found?
  10. **Tailoring** – Does the resume feel targeted for a specific role or is it too generic?
  
  ---
  
  ### 🛠 Output Format
  
  Return your result in the following **structured JSON format**:
  
  {
    "score": number, // A number from 0 to 100
    "summary": string, // Short summary of the overall impression
    "positives": [string], // Key strengths in the resume
    "negatives": [string], // Issues or weak points
    "missingItems": [string], // Important things that are not included
    "recommendations": [string], // Suggestions for improvement
    "sectionFeedback": {
      "professionalSummary": string,
      "skills": string,
      "experience": string,
      "education": string,
      "projects": string,
      "design": string,
      "grammar": string,
      "tailoring": string
    }
  }
  
  ---
  
  ### 🧾 Resume Text:
  """
  ${resumeText}
  """
  
  Now analyze the resume and return your response in valid JSON format only.
    `;
};
