import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
    subsets: ["latin"],
    variable: '--font-sans',
});

export const metadata: Metadata = {
    title: "Call Me By Fire - Fan Hub",
    description: "Official fan hub for Call Me By Fire Vietnam - Follow all 33 artists, events, campaigns, and latest updates",
    keywords: "Call Me By Fire, Vietnam, artists, fan hub, music, entertainment",
    openGraph: {
        title: "Call Me By Fire - Fan Hub",
        description: "Official fan hub for Call Me By Fire Vietnam",
        type: "website",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/favicon.ico" />
        </head>
        <body className={`${inter.variable} font-sans antialiased bg-background text-text`}>
        <Header />
        <main className="min-h-screen">
            {children}
        </main>
        <Footer />
        </body>
        </html>
    );
}