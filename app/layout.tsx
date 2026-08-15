import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Mohamed Fawas — Full-Stack Developer & Systems Builder",
  description:
    "Portfolio of Mohamed Fawas, a Software Engineering undergraduate and full-stack developer who designs and ships real-time, production-grade systems.",
  keywords: [
    "Mohamed Fawas",
    "Full-Stack Developer",
    "Software Engineer",
    "React",
    "Node.js",
    "ASP.NET Core",
    "Portfolio",
  ],
  icons: {
    icon: "/assets/images/logo/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Original template stylesheets, loaded in the same order as the source design */}
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/swiper-bundle.css" />
        <link rel="stylesheet" href="/assets/css/magnific-popup.css" />
        <link rel="stylesheet" href="/assets/css/aos.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
      </head>
      <body className="tw-magic-cursor">
        {children}

        {/* Original template scripts, loaded in the same order as the source design */}
        <Script src="/assets/js/jquery-3.7.1.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/phosphor-icon.js" strategy="afterInteractive" />
        <Script src="/assets/js/boostrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/aos.js" strategy="afterInteractive" />
        <Script src="/assets/js/magnific-popup.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.marquee.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/purecounter.js" strategy="afterInteractive" />
        <Script src="/assets/js/swiper-bundle.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/gsap/gsap.js" strategy="afterInteractive" />
        <Script src="/assets/js/gsap/gsap-scroll-to-plugin.js" strategy="afterInteractive" />
        <Script src="/assets/js/gsap/gsap-scroll-smoother.js" strategy="afterInteractive" />
        <Script src="/assets/js/gsap/gsap-scroll-trigger.js" strategy="afterInteractive" />
        <Script src="/assets/js/gsap/gsap-split-text.js" strategy="afterInteractive" />
        <Script src="/assets/js/gsap/chroma.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/slider-active.js" strategy="afterInteractive" />
        <Script src="/assets/js/custom-gsap.js" strategy="afterInteractive" />
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
        <Script src="/assets/js/tw-cursor.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
