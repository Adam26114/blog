"use client";
import React, { useEffect, useState } from "react";

import { ThemeToggler } from "../ThemeToggler";
import { IoSearchSharp } from "react-icons/io5";
import { LuFileEdit } from "react-icons/lu";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    function hundleClick() {
        setIsOpen(!isOpen);
    }

    return (
        <header className="navbar flex items-center justify-between h-[80px] bg-white dark:bg-black">
            <div className="flex items-center gap-3">
                <Link
                    href="/"
                    className=" font-bold text-3xl flex items-center gap-2 "
                >
                    {/* Ti Lar
                    <div className="w-5 h-5 relative">
                        <Image src="/logo.svg" fill alt="Logo" />
                    </div> */}
                    <svg
                        version="1.0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="512px"
                        height="512px"
                        viewBox="0 0 512 512"
                        preserveAspectRatio="xMidYMid meet"
                        className="w-5 h-5 md:w-10 md:h-10"
                    >
                        <g fill="#000000">
                            <path d="M16.5 510.9 c-12 -2.7 -19.4 -18.1 -14 -28.9 0.9 -1.9 22.6 -24.5 48.2 -50.1 l46.6 -46.7 5.7 6.7 c7 8.1 21.7 22.1 23.3 22.1 1.9 0 -91.4 93 -95.3 94.9 -4.6 2.4 -9.6 3.1 -14.5 2z" />
                            <path d="M209 446.9 c-26 -3 -49.3 -11.5 -71.9 -26.3 l-9.3 -6.1 68.8 -68.2 68.9 -68.2 85.8 -0.1 85.9 0 -3.1 5.4 c-19.7 34.9 -57.6 85 -85.7 113 -36.7 36.7 -90.1 56.1 -139.4 50.5z" />
                            <path d="M92 375.4 c-40.8 -60.3 -36.1 -140.4 11.6 -197.5 9.6 -11.5 34.1 -33.9 55.6 -50.9 l10.3 -8.2 0.3 95.8 0.2 95.9 -36.4 36.4 -36.4 36.4 -5.2 -7.9z" />
                            <path d="M214 177.5 l0 -90 16.3 -9.7 c53.9 -32.1 100.9 -52.7 160.3 -70.3 26.5 -7.9 40 -8.8 58.5 -4 38.9 10.1 66.3 50.2 61.8 90.2 -2.6 23 -22.5 81.5 -42.2 123.8 l-7.4 16 -75.9 0.3 -75.8 0.2 35.6 -35.7 c19.5 -19.7 36.3 -37.3 37.2 -39 4.5 -8.9 2.8 -18.5 -4.4 -25.4 -6 -5.9 -12.3 -7.7 -20.2 -5.9 -5.2 1.2 -6.2 2.1 -74.5 70.4 l-69.3 69.1 0 -90z" />
                        </g>
                        <g fill="#ffffff"></g>
                    </svg>
                </Link>

                <div
                    className={`absolute w-full left-0 top-full mt-0.5 border-b border-gray-100 py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto ${
                        isOpen ? "block" : "hidden md:block"
                    }`}
                >
                    <Input
                        type="text"
                        placeholder="Search"
                        className="  w-full md:w-auto h-full bg-gray-100 border-gray-200 rounded-full  md:pl-12 py-3"
                    />
                    <IoSearchSharp className="absolute right-[10%] md:left-5 top-[50%] translate-y-[-50%] text-gray-500" />
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
                <Button
                    size="icon"
                    className="rounded-full flex md:hidden"
                    onClick={hundleClick}
                    variant="secondary"
                >
                    <IoSearchSharp className="text-lg" />
                </Button>
                <ThemeToggler />
                <Link href="/write" className="hidden md:block ">
                    <Button className=" rounded-full gap-1" variant="ghost">
                        <LuFileEdit />
                        Write
                    </Button>
                </Link>

                <Link href="/signin">
                    <Button className=" rounded-full">Sign In</Button>
                </Link>

                <Link href="/signup" className="hidden md:block">
                    <Button className=" rounded-full" variant="secondary">
                        Sign Up
                    </Button>
                </Link>
            </div>
        </header>
    );
};

export default Navbar;
