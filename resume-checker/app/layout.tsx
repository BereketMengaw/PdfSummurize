import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header.js";
import Footer from "@/components/common/Footer.js";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const fontsans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ResumeChecker",
  description:
    "Check AI-powered Resume Checker SaaS analyzes and optimizes resumes for job applications. Get ATS-friendly resumes, keyword suggestions, and job-matching insights instantly.The Competency Of Resume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`${fontsans.variable} font-sans antialiased`}>
          <Header />
          <div className="relative flex min-h-screen">
            <main className="flex-1"> {children}</main>
          </div>
          <Footer />
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
