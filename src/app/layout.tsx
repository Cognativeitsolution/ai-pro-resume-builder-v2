import type { Metadata } from "next";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";
import ConditionalLayout from "./Layout/conditionalLayout";
import ReduxProvider from "@/redux/Provider";
import "suneditor/dist/css/suneditor.min.css";
import { Suspense } from "react";
import { primary } from "./configs/font";


// Meta Data
export const metadata: Metadata = {
  // Title & Descriptions
  title: "AI Pro Resume Builder",
  description: "AI Pro Resume Builder",
  // Canonical
  alternates: { canonical: 'https://ai-pro-resume-builder-v2.vercel.app/' },
  // OG Metas
  openGraph: {
    title: "AI Pro Resume Builder",
    description: "AI Pro Resume Builder",
    url: 'https://ai-pro-resume-builder-v2.vercel.app/',
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
      <body className={`${primary.variable} font-primary bg-[#fafcff]`} cz-shortcut-listen="true">
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
