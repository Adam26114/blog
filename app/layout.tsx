import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { createContext, useEffect, useState } from "react";
import { lookInSesssion } from "@/common/session";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Blog Post",
    description: "The Best Blog App",
};

export const UserContent = createContext({});

type UserAuthData = {
    access_Token: string | null;
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [userAuth, setUserAuth] = useState<UserAuthData>({
        access_Token: null,
    });

    useEffect(() => {
        let userInSession = lookInSesssion("user");

        userInSession
            ? setUserAuth(JSON.parse(userInSession))
            : setUserAuth({ access_Token: null });
    }, []);

    return (
        <UserContent.Provider value={{ userAuth, setUserAuth }}>
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
                            <div className="">{children}</div>
                            <Footer />
                        </div>
                        <Toaster />
                    </ThemeProvider>
                </body>
            </html>
        </UserContent.Provider>
    );
}
