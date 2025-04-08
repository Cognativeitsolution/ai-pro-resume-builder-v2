
import { BiLogoFacebook, BiLogoInstagram, BiLogoLinkedin, BiLogoPinterest } from "react-icons/bi";

export const sections = [
    {
        title: "QUICK LINKS",
        links: [
            { href: "/services", label: "Services" },
            { href: "/packages", label: "Pricing" },
            { href: "/services", label: "Services" },
            { href: "/packages", label: "Pricing" },
            { href: "/packages", label: "Pricing" },
            // { href: user?.token ? "/resume/formatting" : "/login", label: "Create a Resume" },
            // { href: user?.token ? "/create-cover-letter/formatting" : "/login", label: "Create a Cover Letter" },
            // { href: user?.token ? "/dashboard" : "/login", label: "Dashboard" }
        ]
    },
    {
        title: "RESOURCES",
        links: [
            { href: "/resume-templates", label: "Resume Templates" },
            { href: "/resume-examples", label: "Resume Examples" },
            { href: "/cover-letter-templates", label: "Cover Letter Templates" },
            { href: "/cover-letter-examples", label: "Cover Letter Examples" },
            { href: "/import-resume", label: "Resume Parser" },
            // ...show_pages.filter((page) => page.slug.includes("tips-and-tricks"))
            //   .map((page) => ({ href: `/page/${page.slug}`, label: page.title }))
        ]
    },
    {
        title: "LEARN",
        links: [
            { href: "/blog", label: "Career Blogs" },
            { href: "/pages/resume-format", label: "Resume Format" },
            { href: "/pages/cover-letter-format", label: "Cover Letter Format" },
            { href: "/pages/how-to-write-a-resume-with-ai-pro-resume", label: "How to write Resume" },
            { href: "/pages/how-to-write-a-cover-letter", label: "How to write Cover Letter" }
        ]
    },
    {
        title: "SUPPORT",
        links: [
            // ...show_pages.filter((page) => page.slug.includes("about-us"))
            //   .map((page) => ({ href: `/pages/${page.slug}`, label: page.title })),
            { href: "/contact-us", label: "Contact Us" },
            { href: "/careers", label: "Careers" },
            // ...show_pages.filter((page) => page.slug !== "tips-and-tricks" && page.slug !== "about-us")
            //   .map((page) => ({ href: `/pages/${page.slug}`, label: page.title }))
        ]
    }
];
export const socialLinks = [
    // { href: our_settings.facebook_account_link, icon: BiLogoFacebook },
    // { href: our_settings.instagram_account_link, icon: BiLogoInstagram },
    // { href: our_settings.linkedin_account_link, icon: BiLogoLinkedin },
    { href: "https://www.pinterest.ca/aiproresume/", icon: BiLogoFacebook },
    { href: "https://www.pinterest.ca/aiproresume/", icon: BiLogoInstagram },
    { href: "https://www.pinterest.ca/aiproresume/", icon: BiLogoLinkedin },
    { href: "https://www.pinterest.ca/aiproresume/", icon: BiLogoPinterest },
];
