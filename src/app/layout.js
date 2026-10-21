import { Inter, JetBrains_Mono } from "next/font/google";
import { BRAND, HERO } from "@/data/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata = {
  title: `${BRAND.name} | ${HERO.title.join(" ")}`,
  description: "Full Stack Developer with 1 year of experience building fast, modern web apps with React, Next.js and Node.js.",
};

export const viewport = {
  themeColor: "#030304",
  colorScheme: "dark",
  viewportFit: "cover",
};

/** Applies the saved theme before first paint, so a light-theme visitor never sees a dark flash. */
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
