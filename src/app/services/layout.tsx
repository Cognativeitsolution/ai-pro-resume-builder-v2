// Meta Data
export const metadata = {
    // Title & Descriptions
    title: "",
    description: "",
    // Canonical
    alternates: { canonical: 'https://ai-pro-resume-next.vercel.app/' },
    // OG Metas
    openGraph: {
        title: '',
        description: '',
        url: 'https://ai-pro-resume-next.vercel.app/',
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