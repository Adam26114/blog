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
        <header className="navbar flex items-center justify-between h-[80px]">
            <div className="flex items-center gap-3">
                <Link
                    href="/"
                    className=" font-bold text-3xl flex items-center gap-2 "
                >
                    Ti Lar
                    <div className="w-5 h-5 relative">
                        <Image src="/logo.svg" fill alt="Logo" />
                    </div>
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
