import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";
import ConditionalLayout from "./Layout/conditionalLayout";
import ReduxProvider from "@/redux/Provider";
import "suneditor/dist/css/suneditor.min.css";
import { Suspense } from "react";

// Meta Data
const lexend = Lexend({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Title & Descriptions
  title: "",
  description: "",
  // Canonical
  alternates: { canonical: 'https://ai-pro-resume-next.vercel.app/' },
  // OG Metas
  openGraph: {
    title: "",
    description: "",
    url: 'https://ai-pro-resume-next.vercel.app/',
    siteName: 'Ai Pro Resume',
    locale: 'en_US',
    type: 'website',
  },
  //===== No-Index =====
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: false,
      'max-snippet': -1,
      'max-video-preview': -1,
      'max-image-preview': 'large',
    },
  }
}
export default function RootLayout({ children }: any) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={lexend.className}>
        <ReduxProvider>
          <Suspense>
            <ConditionalLayout>
              <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_google_app_id ?? ""}>
                {children}
              </GoogleOAuthProvider>
            </ConditionalLayout>
          </Suspense>
        </ReduxProvider>
      </body>
    </html>
  );
} 
