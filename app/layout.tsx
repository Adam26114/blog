import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Blog Post",
    description: "The Best Blog App",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="containers">
                        <Navbar />
                        <div className=" ">
                            {children}
                        </div>
                        <Footer />
                    </div>
                <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
