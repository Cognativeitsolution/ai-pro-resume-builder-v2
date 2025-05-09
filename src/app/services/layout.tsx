// Meta Data
export const metadata = {
    // Title & Descriptions
    title: "AI Pro Resume Builder",
    description: "AI Pro Resume Builder",
    // Canonical
    alternates: { canonical: 'https://ai-pro-resume-builder-v2.vercel.app/' },
    // OG Metas
    openGraph: {
        title: '',
        description: '',
        url: 'https://ai-pro-resume-builder-v2.vercel.app/',
        siteName: 'InFinity Animation',
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
    return (children);
}