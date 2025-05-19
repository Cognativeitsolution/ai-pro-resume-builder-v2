import localFont from "next/font/local";

const primary = localFont({
  src: [
    {
      path: "../../fonts/AnekLatin-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../fonts/AnekLatin-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/AnekLatin-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/AnekLatin-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../fonts/AnekLatin-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-primary",
  display: "swap",
});

export { primary };
